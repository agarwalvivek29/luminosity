import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Markdown from "react-markdown";
interface ChatMessageProps {
  content: string;
  role: "assistant" | "user";
  timestamp?: string;
  topic?: string;
}

export function ChatMessage({
  content,
  role,
  timestamp,
  topic,
}: ChatMessageProps) {
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
            "rounded-xl px-4 py-2.5 max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl",
            isUser ? "bg-primary text-primary-foreground" : "bg-muted"
          )}
        >
            <Markdown className={"w-full"}>{content}</Markdown>
        </div>
        <div className="flex gap-2">
          {topic && (
            <span className="text-xs text-green-400 border-green-400/20 rounded-lg border p-1">
              {topic}
            </span>
          )}
          {timestamp && (
            <span className="text-xs text-muted-foreground">{timestamp}</span>
          )}
        </div>
      </div>
    </div>
  );
}
