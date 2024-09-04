import { flicks } from "@/components/Flick/dummyData";
import { Flick } from "@/components/Flick/Flick";
import H1 from "@/components/H1";

import { MainContentHeader } from "@/components/MainLayout/MainContentHeader";
import { HorizontalLine } from "@/components/UtilComponents/Horizontalline";

export default function Home() {
  return (
    <div className="flex flex-col h-full w-full gap-[10px] backdrop-blur-sm">
      <div className="my-[10px]">
        <MainContentHeader displaytext="A social community space for degens on solana" />
        <div className="flex flex-col items-start w-full">
          <div className="p-[10px] w-full items-start">
            <H1>Trending Flicks</H1>
          </div>
          <HorizontalLine />
          <div className="flex flex-col w-full">
            {flicks.map((flick) => (
              <Flick key={flick.username} {...flick} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
