import { cn } from "@/utils";
import { ComponentProps } from "react";

export function FeedbackMessageField({ className, children, ...props }: ComponentProps<"div">) {
  return <div className={cn("text-[10px] text-[#F04438]", className)} {...props}>{children}</div>;
}