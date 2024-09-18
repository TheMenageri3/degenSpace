import { NextRequest, NextResponse } from "next/server";
import bs58 from 'bs58';
import { mockUsers } from "../mockUsers";
import { PublicKey } from "@solana/web3.js";
import nacl from "tweetnacl";
import axios from 'axios';
const application_id = '61865374-9C5D-4F05-958F-1ABC1B1FF1A4'
const api_secret = 'f70f75b41d1e454c3778cb7e00c9b33b5b501bb2'

export async function POST(req: NextRequest) {

    const {
        username,
        userType,
        messageSignature,
        pubkey,
        displayName,
        date,
        expire
    } = await req.json();

    // need to make sure user doesn't exist
    // if (!!mockUsers.find(user => user.username === username)) {return error (User Already Exist)}

    const messageParams = `${username}:${userType}:${date}:${expire}`
    const message = new TextEncoder().encode(messageParams);
    const signature = bs58.decode(messageSignature);
    const publicKey = new PublicKey(pubkey);

    const isValid = nacl.sign.detached.verify(message, signature, publicKey.toBytes())
    if (!isValid) {
        return NextResponse.json({
            status: "error",
            message: "Signature Invalid",
        })
    }

    // NOTE: this doesn't create session token but creates access token
    //       which is not reflected on client yet.
    // const data = await axios.create({
    //     baseURL: `https://api-${application_id}.sendbird.com/v3`,
    //     headers: {
    //         'Content-Type': 'application/json; charset=utf8',
    //         'Api-Token': api_secret,
    //     },
    // }).post(`/users`, {
    //     "user_id": username,
    //     "nickname": displayName,
    //     "profile_url": "",
    //     "issue_access_token": true,
    //     "expires_at": expire,
    // });

    mockUsers.push({
        pubkey: publicKey.toString(),
        displayName,
        username,
        userType,
    })

    return NextResponse.json({
        status: 'success',
        message: "User Added",
        // data: { sendbird: { ...data.data } },
        data: { sendbird: { token: null } },

    })

}

// how to make a request to sendbird api using 