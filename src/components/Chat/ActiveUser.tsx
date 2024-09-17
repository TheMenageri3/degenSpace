"use client"

import React, { useEffect, useState } from 'react'

import sendbirdSelectors from "@sendbird/uikit-react/sendbirdSelectors";
import useSendbirdStateContext from "@sendbird/uikit-react/useSendbirdStateContext";

import {
    ApplicationUserListQueryParams,
    ApplicationUserListQuery,
    User,
} from "@sendbird/chat"

import {
    GroupChannelCreateParams,
} from "@sendbird/chat/groupChannel"


// THIS IS A TEMPORARY COMPONENT FOR TESTING
export default function ActiveUser({ handleLogin }: any) {


    //  -- COMPONENT STATE --
    const [isSelectUser, setIsSelectUser] = useState(false);
    const [userList, setUserList] = useState<User[]>([]);


    //  -- CONTEXT --
    const globalStore = useSendbirdStateContext();
    const sb = sendbirdSelectors.getSdk(globalStore);
    const disconnect = sendbirdSelectors.getDisconnect(globalStore);
    const createGroupChannel = sendbirdSelectors.getCreateGroupChannel(globalStore);


    //  -- HANDLERS --
    const loadUsers = async () => {
        const queryParams: ApplicationUserListQueryParams = {
            limit: 100
        };

        const query: ApplicationUserListQuery = sb.createApplicationUserListQuery(queryParams);

        query.next().then(list => {
            setUserList([...list])
            setIsSelectUser(true)
        })
    }

    const selectUser = async (user: string) => {
        const params: GroupChannelCreateParams = {
            invitedUserIds: [globalStore.stores.userStore.user.userId, user],
            // name: NAME,
            // channelUrl: UNIQUE_CHANNEL_URL,
            isDistinct: true,
            isStrict: true,
        };

        createGroupChannel(params).then(channel => {
            setUserList([])
            setIsSelectUser(false)
        });

    }


    //  -- RENDER COMPONENT -- 
    return (
        <div>

            <ul>

                <li>
                    <button
                        onClick={() =>
                            disconnect()
                                .then((res) => { handleLogin('') })
                                .catch((err) => { console.log(err) })
                        }
                    >
                        Disconnect
                    </button>
                </li>

                <li>
                    <button
                        onClick={() => loadUsers()}
                    >
                        load users
                    </button>
                </li>

            </ul>

            {isSelectUser
                && userList.map(user =>
                    <li key={user.userId}>
                        <button
                            onClick={(evt) => {
                                const input = evt?.target as HTMLElement;
                                selectUser(input.innerText)
                            }}
                        >{user.userId}</button>
                    </li>
                )}

        </div>

    );
}
