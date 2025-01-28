import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { ComponentProps } from "react";

interface ExternalLinkProps extends ComponentProps<"a"> {
  showIcon?: boolean;
}

export default function ExternalLink({
  href,
  className,
  children,
  title,
  showIcon,
  ...rest
}: ExternalLinkProps) {
  if (!children) return null;

  return (
    <a
      title={title}
      href={href}
      className={cn("group flex w-fit items-center justify-between", className)}
      rel="noopener noreferrer"
      target="_blank"
      {...rest}
    >
      <span className="group-hover:underline">{children}</span>
      {showIcon && (
        <ArrowUpRight size={14} className="transition group-hover:rotate-45" />
      )}
    </a>
  );
}
