import P from "../P";

export const RightSideBar = () => {
  return (
    <div className="flex flex-col w-1/3 h-full p-2 border-l-[3px] border-border items-center">
      <div className="mt-[20px] flex flex-col gap-[10px] w-full h-full items-center">
        <P className="font-bold">...</P>
      </div>
    </div>
  );
};
