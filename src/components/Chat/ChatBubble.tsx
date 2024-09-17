"use client"

import styles from './styles.module.css'
import React from 'react'


export default function ChatBubble({ payload, style, className }: any) {

    return (
        <div
            key={payload.messageId}
            className={className}
        // style={style}
        // styling
        >
            {/* 
                sender id
                message
                timestamp
            */}
            <div>{payload.message}</div>
            <div className={styles.member}>{payload.sender.userId}</div>
        </div>
    )
}