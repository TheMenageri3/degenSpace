"use client";
import Image from "next/image";
import P from "../P";
import { useRouter } from "next/navigation";

export const Messages = () => {

    const router = useRouter();

    const handleClick = () => {
        router.push("/Messages");
    };

    return (
        <div
            className="flex flex-row gap-[10px] items-center p-[10px] px-[15px] hover:bg-backgroundHover rounded min-h-[20px] cursor-pointer"
            onClick={handleClick}
        >
            <Image
                src="/messages.svg" alt="messages" height={30} width={30} />
            <P className="font-bold">Messages</P>
        </div>
    );
};