import { Children, ComponentProps } from "react";
import { Button, ButtonProps } from "./button";
import { Loader } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props extends ButtonProps {
  isLoading?: boolean;
}

export function LoadingButton({ isLoading, children, ...props }: Props) {
  return (
    <Button {...props} disabled={isLoading} className="loading-button">
      <span className={cn("content", isLoading ? "invisible" : "visible")}>
        {children}
      </span>
      <span
        className={cn(
          "loader animate-spin",
          isLoading ? "visible" : "invisible",
        )}
      >
        <Loader />
      </span>
    </Button>
  );
}
