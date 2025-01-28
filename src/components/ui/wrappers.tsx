import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export function SectionWrapper({
  children,
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div className={cn("py-8 md:py-10 lg:py-12", className)} {...props}>
      {children}
    </div>
  );
}

export function ContainerWrapper({
  children,
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "mx-auto size-full max-w-6xl",
        "px-4 sm:px-6 lg:px-8",
        "border-x",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
