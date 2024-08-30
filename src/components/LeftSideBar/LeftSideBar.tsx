import P from "../P";
import { Wallet } from "./Wallet";

export const LeftSideBar = () => {
  return (
    <div className="w-1/3 h-full p-2 border-r-[3px] border-border flex flex-col items-center">
      <div className="mt-[20px] flex flex-col gap-[10px] w-full">
        <P className="text-lg font-bold">degenSpace</P>
        <Wallet />
      </div>
    </div>
  );
};
