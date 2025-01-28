import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export function H1({ children, className, ...props }: ComponentProps<"h1">) {
  return (
    <h1
      className={cn(
        "text-3xl font-bold sm:text-4xl md:text-5xl",
        "text-pretty",
        className,
      )}
      {...props}
    >
      {children}
    </h1>
  );
}

export function H2({ children, className, ...props }: ComponentProps<"h2">) {
  return (
    <h1
      className={cn(
        "text-2xl font-semibold sm:text-3xl md:text-4xl",
        "text-pretty",
        className,
      )}
      {...props}
    >
      {children}
    </h1>
  );
}

export function H3({ children, className, ...props }: ComponentProps<"h3">) {
  return (
    <h1
      className={cn(
        "text-xl font-semibold sm:text-2xl md:text-3xl",
        "text-pretty",
        className,
      )}
      {...props}
    >
      {children}
    </h1>
  );
}
