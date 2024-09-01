import { LeftSideBar } from "../LeftSideBar/LeftSideBar";
import { RightSideBar } from "../RightSideBar/RightSideBar";

export const View = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-row gap-[2px] h-full">
      <LeftSideBar />
      {children}
      <RightSideBar />
    </div>
  );
};
