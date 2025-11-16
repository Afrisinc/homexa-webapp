import { Message } from "@/lib/types";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface ChatBubbleProps {
  message: Message;
  className?: string;
}

export function ChatBubble({ message, className }: ChatBubbleProps) {
  const isUser = message.senderType === "user";

  return (
    <div
      className={cn(
        "flex w-full",
        isUser ? "justify-end" : "justify-start",
        className
      )}
    >
      <div
        className={cn(
          "max-w-[80%] space-y-1 rounded-2xl px-4 py-2",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-secondary-foreground"
        )}
      >
        <p className="text-sm leading-relaxed">{message.content}</p>
        <p
          className={cn(
            "text-xs",
            isUser ? "text-primary-foreground/70" : "text-muted-foreground"
          )}
        >
          {format(new Date(message.timestamp), "HH:mm")}
        </p>
      </div>
    </div>
  );
}
