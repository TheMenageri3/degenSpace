import { MainContentHeader } from "@/components/MainLayout/MainContentHeader";
import { PostJob } from "@/components/Job/PostJob";
import { Jobs } from "@/components/Job/Jobs";

const JobBoard = () => {
  return (
    <div className="flex flex-col w-full h-full backdrop-blur-sm">
      <MainContentHeader displaytext="Job Board" />
      <PostJob />
      <Jobs />
    </div>
  );
};

export default JobBoard;
