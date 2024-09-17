"use client"
import styles from './styles.module.css'
import React, { useEffect, useRef, useState } from 'react'

import sendbirdSelectors from "@sendbird/uikit-react/sendbirdSelectors";
import useSendbirdStateContext from "@sendbird/uikit-react/useSendbirdStateContext";


import {
    GroupChannel,
} from "@sendbird/chat/groupChannel"


import {
    UserMessageCreateParams,
    UserMessage,
} from "@sendbird/chat/message";
import ChatBubble from './ChatBubble';


interface ActiveGroupChannelProps {
    activeGroupChannel: { channel: GroupChannel, messages: UserMessage[] },
    handleUdpateGroupChannel: (
        activeGroupChannel: { channel: GroupChannel, messages: UserMessage[] },
        message: UserMessage[]) => void,
}


export default function ChatBox({ activeGroupChannel, handleUdpateGroupChannel }: ActiveGroupChannelProps) {


    //  -- COMPONENT STATE --
    const [val, setVal] = useState('');

    const myRef = useRef<HTMLDivElement>(null);


    //  -- CONTEXT & SELECTORS --
    const globalStore = useSendbirdStateContext();
    const sendUserMessage = sendbirdSelectors.getSendUserMessage(globalStore);


    //  -- HANDLERS --
    const handleSendMessage = (evt: any) => {
        evt.preventDefault();

        const messageParams: UserMessageCreateParams = {
            message: val,
        }

        sendUserMessage(activeGroupChannel.channel, messageParams)
            .onSucceeded((data) => {

                handleUdpateGroupChannel(activeGroupChannel, [data]);
            })
            .onPending((data) => {
                // console.log(data)
            })
            .onFailed((data) => {
                // console.log(data)
            })

        setVal('');
    }

    const handleInput = (event: any) => {
        const newValue = event.target.value;
        setVal(newValue)
    }

    useEffect(() => {
        // Scroll to the top of the element on component mount

        console.log(myRef)
        if (myRef.current) {
            myRef.current.scrollTo({
                top: 0, // Scroll 100 pixels from the top
                behavior: 'instant' // Optional for smooth scrolling
            });
        }
    }, []);


    //  -- RENDER COMPONENT -- 
    return (
        <div
            style={{ width: '100%', margin: '10px' }}
        // ChatBoxComponent
        >

            <div
                ref={myRef}
                className={styles.messageBox}
            >
                {activeGroupChannel.messages
                    // .reverse() seems it doesn't work
                    .map(payload => {
                        return (
                            payload.sender.userId === globalStore.stores.userStore.user.userId ?

                                <ChatBubble
                                    key={payload.messageId}
                                    className={styles.sender}
                                    payload={payload}
                                /> :

                                <ChatBubble
                                    key={payload.messageId}
                                    className={styles.recepient}
                                    payload={payload}
                                />
                        )
                    })}
            </div>

            <form
                onSubmit={handleSendMessage}
            >
                <input
                    onChange={handleInput}
                    value={val}
                />
                <button type="submit"> Send </button>
            </form>
        </div>
    )
}