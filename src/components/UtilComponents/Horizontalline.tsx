import { cn } from "@/lib/utils/helpers";

export const HorizontalLine = (props: { className?: string }) => {
  return (
    <div className={cn("w-full h-[3px] bg-border", props.className)}></div>
  );
};
