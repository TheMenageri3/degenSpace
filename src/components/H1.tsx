import { cn } from "@/lib/utils/helpers";

export default function H1(props: React.HTMLProps<HTMLHeadingElement>) {
  return (
    <h1
      {...props}
      className={cn(
        "text-4xl font-bold text-primary tracking-tighter",
        props.className
      )}
    />
  );
}
