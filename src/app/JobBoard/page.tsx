import { MainContentHeader } from "@/components/MainLayout/MainContentHeader";
import { PostJob } from "@/components/Job/PostJob";

const JobBoard = () => {
  return (
    <div className="flex flex-col gap-[10px] w-full h-full backdrop-blur-sm">
      <div className="my-[10px]">
        <MainContentHeader displaytext="Job Board" />
        <PostJob />
      </div>
    </div>
  );
};

export default JobBoard;
