import { Message } from "@/lib/types";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface ChatBubbleProps {
  message: Message & { senderType?: "user" | "seller" };
  className?: string;
  userId?: string;
}

export function ChatBubble({ message, className, userId }: ChatBubbleProps) {
  // Determine if message is from user based on senderType (legacy) or userId comparison
  const isUser = message.senderType === "user" || (userId && message.senderId === userId);

  // Format timestamp safely
  const formatTime = () => {
    if (!message.timestamp) return "";
    const date = new Date(message.timestamp);
    if (Number.isNaN(date.getTime())) return "";
    return format(date, "HH:mm");
  };

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
          {formatTime()}
        </p>
      </div>
    </div>
  );
}
