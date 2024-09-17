"use client"

import React, { useEffect, useState } from 'react'

import sendbirdSelectors from "@sendbird/uikit-react/sendbirdSelectors";
import useSendbirdStateContext from "@sendbird/uikit-react/useSendbirdStateContext";

import {
    GroupChannel,
    GroupChannelFilter,
    GroupChannelCollection,
    GroupChannelListOrder,
    GroupChannelHandler,

} from "@sendbird/chat/groupChannel"

import {
    PreviousMessageListQueryParams,
    UserMessage,
} from "@sendbird/chat/message"

import ChatBox from './ChatBox';
import GroupChannelList from './GroupChannelList';

import styles from './styles.module.css'

// [BUG] --> messages get lost when switching channels
export const Messenger = () => {

    //  -- COMPONENT STATE --
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isChannelListener, setIsChannelListener] = useState(false);
    const [channelList, setChannelList] = useState<GroupChannel[]>([]);
    const [activeGroupChannel, setActiveGroupChannel] = useState<{ channel: GroupChannel, messages: UserMessage[] }>();


    //  -- CONTEXT --
    const globalStore = useSendbirdStateContext();


    // USE_EFFECT -> LOAD USER GROUP CHANNELS
    // sometimes channels don't load... but why?
    useEffect(() => {
        if (!(globalStore.stores.userStore.initialized
            && globalStore.stores.sdkStore.initialized))
            return;

        if (!isLoaded) {
            setIsLoading(true);
        } else if (isLoaded && isLoading) {
            setIsLoading(false);
        }

        if (isLoading && !isLoaded) {

            const sb = sendbirdSelectors.getSdk(globalStore);
            const groupChannelFilter = new GroupChannelFilter();
            const groupChannelCollection: GroupChannelCollection = sb.groupChannel.createGroupChannelCollection({
                filter: groupChannelFilter,
                order: GroupChannelListOrder.LATEST_LAST_MESSAGE,
            });

            if (groupChannelCollection.hasMore) {
                groupChannelCollection.loadMore().then((data) => {
                    setChannelList([...data]);
                    setIsLoaded(true);
                });
            }
        }
    }, [isLoaded, isLoading, channelList, globalStore]);

    // USE_EFFECT -> ADD LISTENER onMessageReceived
    useEffect(() => {
        if (activeGroupChannel === undefined)
            return

        const sb = sendbirdSelectors.getSdk(globalStore);
        sb.groupChannel.removeGroupChannelHandler('ON_MESSAGE_RECEIVED');
        sb.groupChannel.addGroupChannelHandler(
            'ON_MESSAGE_RECEIVED',
            new GroupChannelHandler({
                onMessageReceived(channel, message) {

                    if (channel.url === activeGroupChannel?.channel.url) {
                        setActiveGroupChannel({
                            ...activeGroupChannel,
                            messages: [...activeGroupChannel.messages, message as UserMessage]
                        });
                    }

                },
            }));

        return () => {
            const sb = sendbirdSelectors.getSdk(globalStore);
            sb.groupChannel.removeGroupChannelHandler('ON_MESSAGE_RECEIVED');
        }
    }, [activeGroupChannel]);

    // USE_EFFECT -> ADD LISTENER onUserReceivedInvitation
    useEffect(() => {
        if (!(globalStore.stores.userStore.initialized
            && globalStore.stores.sdkStore.initialized))
            return;

        if (channelList === undefined)
            return;

        if (isChannelListener)
            return

        const sb = sendbirdSelectors.getSdk(globalStore);
        sb.groupChannel.addGroupChannelHandler(
            'ON_USER_RECEIVED_INVITATION',
            new GroupChannelHandler({
                onUserReceivedInvitation(channel, inviter, invitees) {
                    setChannelList([channel, ...channelList]);
                    setIsChannelListener(true);
                }
            }));

        return () => {
            const sb = sendbirdSelectors.getSdk(globalStore);
            sb.groupChannel.removeGroupChannelHandler('ON_USER_RECEIVED_INVITATION');
        }
    }, [channelList]);


    //  -- HANDLERS --
    const handleSelectGroupChannel = (evt: any, channel: GroupChannel) => {


        evt.target.parentNode.childNodes
            .forEach((sib: any) => sib.classList.remove(styles.activeGroupChannel));

        evt.target.classList.add(styles.activeGroupChannel);

        const params: PreviousMessageListQueryParams = {
            limit: 20,
            reverse: false,
            // messageTypeFilter: ALL,
            // includeReactions: true,
            // ...
        };

        const query = channel.createPreviousMessageListQuery(params);
        query.load().then(list => {

            if (list.length === 0) {
                setActiveGroupChannel({ channel, messages: [] });
            }
            setActiveGroupChannel({ channel, messages: list as UserMessage[] });

        }).catch(err => {
            console.log(err)
        });
    }

    const handleUdpateGroupChannel = (
        activeGroupChannel: { channel: GroupChannel, messages: UserMessage[] },
        message: UserMessage[]) => {
        setActiveGroupChannel({
            ...activeGroupChannel,
            messages: [...activeGroupChannel.messages, ...message]
        })
    }


    //  -- RENDER COMPONENT -- 
    return (
        <div
            className={styles.messenger}
        >

            {isLoaded
                && <GroupChannelList
                    list={channelList}
                    handleSelectGroupChannel={handleSelectGroupChannel}
                />}

            {activeGroupChannel
                && <ChatBox
                    activeGroupChannel={activeGroupChannel}
                    handleUdpateGroupChannel={handleUdpateGroupChannel}
                />}

        </div>
    );
};