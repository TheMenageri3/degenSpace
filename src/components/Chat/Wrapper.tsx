"use client"
import React, { useEffect, useState } from 'react'
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";

import { Messenger } from "./Messenger"
import ActiveUser from './ActiveUser'

export const MessengerWrapper = () => {

    const { connected } = useWallet();
    const [isUser, setIsUser] = useState(false);
    const router = useRouter();



    useEffect(() => {

        if (!connected) {
            router.push("/");
            return;
        }

        if (!window.localStorage.getItem("userInfo")) return;

        setIsUser(true);
    }, [isUser, connected]);


    return (
        <>
            {isUser ?

                <>
                    {/* ActiveUser is a temporary component used for testing */}
                    <ActiveUser />
                    <Messenger />
                </> :

                <div>No user in local storage</div>
            }

        </>
    )
}