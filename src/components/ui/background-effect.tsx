import { cn } from "@/lib/utils";

export default function BackgroundEffect() {
  return (
    <div
      className={cn(
        "absolute inset-0 z-[-1] size-full",
        "bg-[radial-gradient(#ff000077_1px,transparent_1px)] [background-size:16px_16px]",
        "[mask-image:radial-gradient(ellipse_100%_100%_at_50%_0%,#000_30%,transparent_100%)]",
        "animate-pulse",
      )}
    />
  );
}
