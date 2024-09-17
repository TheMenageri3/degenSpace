import { MainContentHeader } from "@/components/MainLayout/MainContentHeader";
import { MessengerWrapper } from "@/components/Chat/Wrapper";

const Messages = () => {
    return (
        <div className="flex flex-col gap-[10px] w-full h-full backdrop-blur-sm">
            <div className="my-[10px]">
                <MainContentHeader displaytext="Messages" />
                <MessengerWrapper />
            </div>
        </div>
    );
};

export default Messages;
