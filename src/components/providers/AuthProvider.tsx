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
    dashboardName: string,
    username: string,
    pubkey: string,
    messageSignature: string,
    // sendBirdToken: string,
    userType: string,
    date: string,
    expire: string,
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [isLoading, setIsLoading] = useState(true);
    const [isLogged, setIsLogged] = useState(false);
    const [isFetched, setIsFetched] = useState(false);

    const [displayName, setDisplayName] = useState('');
    const [username, setUsername] = useState('');
    const [userType, setUserType] = useState('');

    const { publicKey, signMessage, connected } = useWallet();

    useEffect(() => {
        if (isLoading) setIsLoading(false);
        if (!connected && isLogged) {
            setIsLogged(false);
            return;
        }
        if (!connected || !publicKey || isLogged) return;


        const userInfo = window.localStorage.getItem('userInfo');
        if (!!userInfo) {

            const date = new Date().getTime();
            const user = JSON.parse(userInfo);

            if (date >= user.expire) {
                sign(user.username, user.userType)
                    .then(() => {
                        setIsLogged(true);
                    });

            } else {

                const messageParams = `${user.username}:${user.userType}:${user.date}:${user.expire}`;
                const message = new TextEncoder().encode(messageParams);
                const signature = bs58.decode(user.messageSignature);

                // if (!verify(user.messageSignature, message, publicKey.toBytes())) throw new Error('Invalid signed message!');
                if (!nacl.sign.detached.verify(message, signature, publicKey.toBytes())) throw new Error('Invalid signed message!');
                setUsername(user.username);
                setIsLogged(true);
            }

            return
        }

        if (!isFetched) {
            // fetch user from db
            // if userInfo -> generateMessage && store->userInfo
            setIsFetched(true);
            return;
        }

    }, [isLoading, isLogged, isFetched, connected, publicKey]);

    const handleInputDisplayName = (evt: any) => {
        setDisplayName(evt.target.value);
    }

    const handleInputUsername = (evt: any) => {
        setUsername(evt.target.value);
    }

    const handleInputUserType = (evt: any) => {
        setUserType(evt.target.value)
    }

    const sign = async (username: string, userType: string) => {
        try {
            if (!publicKey) throw new Error('Wallet not connected!');
            if (!signMessage) throw new Error('Wallet does not support message signing!');

            const date = new Date().getTime();
            const expire = date + (60 * 60 * 24 * 7 * 1000);
            const messageParams = `${username}:${userType}:${date}:${expire}`
            const message = new TextEncoder().encode(messageParams);
            const signature = await signMessage(message);
            const messageSignature = bs58.encode(signature);

            // if (!verify(signature, message, publicKey.toBytes(), { zip215: false })) throw new Error('Invalid signed message!');
            if (!nacl.sign.detached.verify(message, signature, publicKey.toBytes())) throw new Error('Invalid signed message!');


            // send to database 
            // -> wait until user is successfully stored 
            // -> then store to localStoreage
            // -> push to home?
            const userInfo: UserInfo = {
                dashboardName: displayName,
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

    const handleSignup = async (evt: any) => {
        evt.preventDefault();

        sign(username, userType).then(() => {
            console.log("HANDLE SIGNUP")
            setIsLogged(true);
        })
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
                                <input
                                    onChange={handleInputDisplayName}
                                    value={displayName}
                                />
                                <input
                                    onChange={handleInputUsername}
                                    value={username}
                                />
                                <input
                                    onChange={handleInputUserType}
                                    value={userType}
                                />
                                <button type="submit"> Signup </button>
                            </form>
                        }
                    </div> :
                    <SBProvider
                        appId={'61865374-9C5D-4F05-958F-1ABC1B1FF1A4'}
                        userId={username}
                    >
                        {children}
                    </SBProvider>
            }
        </>
    )
}