import P from "../P";
import { Wallet } from "./Wallet";

export const LeftSideBar = () => {
  return (
    <div className="w-1/3 h-full p-2 border-r-2 border-border flex flex-col items-center">
      <Wallet />
    </div>
  );
};
