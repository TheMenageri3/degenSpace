import React from "react";
import { HorizontalLine } from "../UtilComponents/Horizontalline";
import { Button } from "../ui/button";

export type JobData = {
  companyName: string;
  jobTitle: string;
  location: string;
  jobDescription: string;
  skills: string;
  compensation: string;
};

type JobCardProps = {
  job: JobData;
};

export const JobCard = ({ job }: JobCardProps) => {
  return (
    <React.Fragment>
      <div
        key={job.jobTitle}
        className="flex flex-col gap-[10px] w-full items-start p-[10px]"
      >
        <div className="flex flex-row gap-[10px] w-full items-start p-[10px]">
          <div className="flex flex-col gap-[5px]">
            <div className="flex flex-row gap-[5px] items-center">
              <p className="text-[20px] font-bold">{job.companyName}</p>
              <p className="text-[16px] font-bold text-primary/90">
                {job.location}
              </p>
            </div>
            <div>
              <p className="text-[22px] text-primary font-bold">
                {job.jobTitle}
              </p>
            </div>

            <div>
              <p className="text-[18px] font-[500]">{job.jobDescription}</p>
            </div>
            <div>
              <p className="text-[18px] font-[500]">{job.skills}</p>
            </div>
            <div>
              <p className="text-[18px] font-[500]">{job.compensation}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between gap-[10px] w-full p-[10px]">
          <Button>Read More</Button>
          <Button>Apply</Button>
        </div>
      </div>
      <HorizontalLine />
    </React.Fragment>
  );
};
