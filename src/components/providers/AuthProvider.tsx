"use client";
import React, { useEffect, useState } from "react";

import {
    useWallet,
} from "@solana/wallet-adapter-react";

import SBProvider from "@sendbird/uikit-react/SendbirdProvider";

// import { verify } from "@noble/ed25519"; // doesn't work
import nacl from "tweetnacl";
import bs58 from 'bs58';

import { Wallet } from "../LeftSideBar/Wallet";

interface UserInfo {
    displayName: string,
    username: string,
    pubkey: string,
    messageSignature: string,
    // sendBirdToken: string,
    userType: string,
    date: string,
    expire: string,
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const items: { value: string, label: string }[] = [
        { value: 'developer', label: 'Developer' },
        { value: 'company', label: 'Company' },
    ]

    const [isLoading, setIsLoading] = useState(true);
    const [isLogged, setIsLogged] = useState(false);

    const [isFetching, setIsFetching] = useState(false);
    const [isFetched, setIsFetched] = useState(false);

    const [displayName, setDisplayName] = useState('');
    const [username, setUsername] = useState('');
    const [userType, setUserType] = useState<string | null>(null);
    const [accessToken, setAccessToken] = useState<string | undefined>(undefined);

    const { publicKey, signMessage, connected } = useWallet();

    useEffect(() => {
        if (isLoading) {
            setIsLoading(false);
            return;
        }

        if (!connected && isLogged) {
            setIsLogged(false);
            return;
        }

        if (!connected || !publicKey || isLogged) return;


        const userInfo = window.localStorage.getItem('userInfo');
        const sendbird = window.localStorage.getItem('sendbird');
        if (!!userInfo) {

            const date = new Date().getTime();
            const user = JSON.parse(userInfo);
            const accessToken = JSON.parse(sendbird!);

            if (date >= user.expire) {

                // it will aggressively sign... should be more gradule process for the user
                sign(user.username, user.userType, user.displayName)
                    .then(() => {

                        setAccessToken(accessToken.token);
                        setIsLogged(true);
                    });

            } else {

                const messageParams = `${user.username}:${user.userType}:${user.date}:${user.expire}`;
                const message = new TextEncoder().encode(messageParams);
                const signature = bs58.decode(user.messageSignature);

                if (!nacl.sign.detached.verify(message, signature, publicKey.toBytes())) throw new Error('Invalid signed message!');
                setUsername(user.username);
                setAccessToken(accessToken.token);
                setIsLogged(true);
            }

            return
        }


        if (!isFetched && !isFetching) {

            fetch("/api/auth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                // not sure this should be sent via the body
                body: JSON.stringify({ pubkey: publicKey }),
            }).then(async (data) => {

                const body = await data.json();
                if (body.status === "success") {
                    await sign(body.data.username, body.data.userType, body.data.displayName)
                    window.localStorage.setItem("sendbird", JSON.stringify(body.data.sendbird));
                    setAccessToken(body.data.sendbird.token);
                    setIsLogged(true);
                }

                setIsFetched(true);
                setIsFetching(false);
            })

            setIsFetching(true);
            return;
        }

    }, [isLoading, isLogged, isFetched, isFetching, connected, publicKey]);

    const handleInputDisplayName = (evt: any) => {
        setDisplayName(evt.target.value);
    }

    const handleInputUsername = (evt: any) => {
        setUsername(evt.target.value);
    }

    const sign = async (username: string, userType: string, displayName: string) => {
        try {
            if (!publicKey) throw new Error('Wallet not connected!');
            if (!signMessage) throw new Error('Wallet does not support message signing!');

            const date = new Date().getTime();
            const expire = date + (60 * 60 * 24 * 7 * 1000);
            const messageParams = `${username}:${userType}:${date}:${expire}`
            const message = new TextEncoder().encode(messageParams);
            const signature = await signMessage(message);
            const messageSignature = bs58.encode(signature);

            if (!nacl.sign.detached.verify(message, signature, publicKey.toBytes())) throw new Error('Invalid signed message!');

            const userInfo: UserInfo = {
                displayName: displayName,
                username: username,
                pubkey: publicKey.toString(),
                messageSignature: messageSignature.toString(),
                userType: userType,
                date: date.toString(),
                expire: expire.toString(),
            }

            window.localStorage.setItem("userInfo", JSON.stringify(userInfo));

        } catch (error: any) {
            console.log(error)
        }
    }

    const handleSignup = async (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        localStorage.removeItem('userInfo');
        localStorage.removeItem('sendbird');

        if (displayName === '' || username === '' || userType === null || !connected) return;

        const date = new Date().getTime();
        const expire = date + (60 * 60 * 24 * 7 * 1000);
        const messageParams = `${username}:${userType}:${date}:${expire}`
        const message = new TextEncoder().encode(messageParams);
        const signature = await signMessage!(message);
        const messageSignature = bs58.encode(signature);

        const data = await fetch("/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                displayName,
                userType,
                date, expire,
                messageSignature: messageSignature,
                pubkey: publicKey?.toString(),
            }),
        })

        const body = await data.json();
        if (body.status === "success") {
            const userInfo: UserInfo = {
                displayName: displayName,
                username: username,
                pubkey: publicKey!.toString(),
                messageSignature: messageSignature.toString(),
                userType: userType,
                date: date.toString(),
                expire: expire.toString(),
            }

            console.log("SIGN IN", body)
            window.localStorage.setItem("userInfo", JSON.stringify(userInfo));
            window.localStorage.setItem("sendbird", JSON.stringify(body.data.sendbird));

            setAccessToken(body.data.sendbird.token);
            setIsLogged(true);
        }
    }

    return (
        <>
            {isLoading ?
                <div>LOADING...</div>
                : !isLogged ?
                    <div>
                        <Wallet />
                        {isFetched &&
                            <form
                                onSubmit={handleSignup}
                            >
                                <div>
                                    <label>Display Name</label>
                                    <input
                                        onChange={handleInputDisplayName}
                                        value={displayName}
                                    />
                                </div>
                                <div>
                                    <label>username</label>
                                    <input
                                        onChange={handleInputUsername}
                                        value={username}
                                    />
                                </div>
                                {items.map(item => (
                                    <div>
                                        <input
                                            name="userType"
                                            type="radio"
                                            value={item.value}
                                            id={item.value}
                                            checked={userType === item.value}
                                            onChange={e => setUserType(e.target.value)}
                                        /> <label htmlFor={item.value}>{item.label}</label>
                                    </div>
                                ))}

                                <button type="submit"> Signup </button>
                            </form>
                        }
                    </div> :
                    <SBProvider
                        appId={'61865374-9C5D-4F05-958F-1ABC1B1FF1A4'}
                        userId={username}
                        accessToken={accessToken}
                    >
                        {children}
                    </SBProvider>
            }
        </>
    )
}