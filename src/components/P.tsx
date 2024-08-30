import { cn } from "@/lib/utils/helpers";

export default function P(props: React.HTMLProps<HTMLHeadingElement>) {
  return (
    <p
      {...props}
      className={cn("text-sm  text-primary w-fit", props.className)}
    />
  );
}
