import { Flick } from "@/components/Flick/Flick";
import H1 from "@/components/H1";
import P from "@/components/P";
import { HorizontalLine } from "@/components/UtilComponents/Horizontalline";

export default function MainContent() {
  return (
    <div className="w-full flex flex-col jjustify-start items-center gap-[10px] border-r-[3px] border-border border-l-[3px]">
      <div className="flex flex-col w-full items-center mt-[50px]">
        <div className="p-[8px] my-[10px]">
          <H1>A social community space for degens on solana</H1>
        </div>
        <HorizontalLine />
        <div className="flex flex-col my-[30px] items-start w-full">
          <div className="p-[10px] w-full items-start">
            <P className="font-bold text-lg">Trending Flicks</P>
          </div>
          <div className="flex flex-col w-full">
            {[1, 2, 3, 4, 5].map((_, i) => (
              <Flick key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
