import { NextRequest, NextResponse } from "next/server";
import axios from 'axios';

import { mockUsers } from "./mockUsers";
const application_id = '61865374-9C5D-4F05-958F-1ABC1B1FF1A4'
const app_key = 'f70f75b41d1e454c3778cb7e00c9b33b5b501bb2';

export async function POST(req: NextRequest) {

    const body = await req.json();
    const user = mockUsers.find(user => user.pubkey === body.pubkey);

    if (user === undefined) {
        return NextResponse.json({
            status: "error",
            message: "User not found",
            data: { isExist: false }
        })
    }

    // const data = await axios.create({
    //     baseURL: `https://api-${application_id}.sendbird.com/v3`,
    //     headers: {
    //         'Content-Type': 'application/json; charset=utf8',
    //         'Api-Token': app_key,
    //     },
    // }).post(`/users/${user.username}/token`, {});


    return NextResponse.json({
        status: 'success',
        message: "",
        data: {
            isExist: true, ...user,
            // sendbird: { ...data.data },
            sendbird: { token: null },

        }
    })

}