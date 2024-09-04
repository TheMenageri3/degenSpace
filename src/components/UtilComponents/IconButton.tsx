import Image from "next/image";
import P from "../P";

export const IconButton = ({
  iconPath,
  meta,
  onClick,
}: {
  iconPath: string;
  onClick: () => void;
  meta: number;
}) => {
  return (
    <div className="flex hover:bg-backgroundHover p-[10px] rounded-full cursor-pointer flex-row gap-[4px] items-center">
      <Image
        src={iconPath}
        alt="img"
        height={24}
        width={24}
        onClick={onClick}
      />
      <P className="font-bold text-[14px]">{meta}</P>
    </div>
  );
};
