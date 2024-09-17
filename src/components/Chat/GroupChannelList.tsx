import React from 'react'

import useSendbirdStateContext from "@sendbird/uikit-react/useSendbirdStateContext";

import {
    GroupChannel,
} from "@sendbird/chat/groupChannel"

import styles from './styles.module.css'


interface ListProps {
    list: GroupChannel[],
    handleSelectGroupChannel: (evt: any, channel: GroupChannel) => void,
}

export default function GroupChannelList({ list, handleSelectGroupChannel }: ListProps) {

    const globalStore = useSendbirdStateContext();

    return (
        <div
            className={styles.group}
        >
            {list.map(channel => {

                // channel.memberCount
                // need better way to handle group channel view
                const member = channel.members.find(member => member.userId !== globalStore.stores.userStore.user.userId);
                // const payload = `${globalStore.stores.userStore.user.userId} ==> ${member?.userId}`;
                const payload = `${member?.userId}`;

                return (
                    <div
                        className={styles.channel}
                        key={channel.url}
                        onClick={(evt) => handleSelectGroupChannel(evt, channel)}
                    >{payload}</div>
                )
            })}
        </div>
    )
}

