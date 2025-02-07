import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
interface ChatMessageProps {
  content: string;
  role: "assistant" | "user";
  timestamp?: string;
  topic?: string;
}

export function ChatMessage({ content, role, timestamp, topic }: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <div
      className={cn(
        `flex w-full gap-4 p-4`,
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      <Avatar className="h-8 w-8">
        <AvatarImage src={isUser ? "/user-avatar.png" : "/bot-avatar.png"} />
        <AvatarFallback>{isUser ? "U" : "AI"}</AvatarFallback>
      </Avatar>
      <div
        className={cn(
          "flex max-w-[80%] flex-col gap-2",
          isUser ? "items-end" : "items-start"
        )}
      >
        <div
          className={cn(
            "rounded-xl px-4 py-2.5",
            isUser ? "bg-primary text-primary-foreground" : "bg-muted"
          )}
        >
          <p className="text-sm">{content}</p>
        </div>
        <div className="flex gap-2">
        {timestamp && (
          <span className="text-xs text-muted-foreground">{timestamp}</span>
        )}
        {topic && (
          <span className="text-xs text-gray-900 p-1 bg-slate-500 rounded-lg">{topic}</span>
        )}
        </div>
      </div>
    </div>
  );
}
