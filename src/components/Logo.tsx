import Image from "next/image";
import P from "./P";

export const Logo = () => {
  return (
    <div className="flex flex-row gap-[3px] items-center">
      <Image src={"/degen2.webp"} width={80} height={80} alt="logo" />
      <P className="font-bold">degenSpace</P>
    </div>
  );
};
