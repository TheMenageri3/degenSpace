import Image from "next/image";
import P from "../P";

export const Flick = () => {
  return (
    <div className="flex flex-col w-full p-[10px] items-start">
      <div className="flex flex-row gap-[10px] w-full items-start p-[10px]">
        <Image src="/user.svg" alt="img" height={30} width={30} />
        <div className="flex flex-col gap-[5px]">
          <div className="flex flex-row gap-[5px]">
            <P className="text-[15px] font-bold">John Doe</P>
            <P className="text-[12px] font-bold text-primary/90">@johndoe</P>
          </div>
          <div>
            <P className="text-[12px] font-bold text-primary/90">flick data</P>
          </div>
        </div>
      </div>
    </div>
  );
};
