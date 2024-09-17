import { flicks } from "@/components/Flick/dummyData";
import { Flick } from "@/components/Flick/Flick";
import H1 from "@/components/H1";

import { MainContentHeader } from "@/components/MainLayout/MainContentHeader";
import { HorizontalLine } from "@/components/UtilComponents/Horizontalline";

export default function Home() {
  return (
    <div className="flex flex-col h-full w-full gap-[10px] backdrop-blur-sm">
      <div>
        <MainContentHeader displaytext="A social community space for degens on solana" />
        <div className="flex p-[10px] w-full justify-center p-[10px]">
          <H1>Trending Flicks</H1>
        </div>
        <div className="flex flex-col w-full">
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
