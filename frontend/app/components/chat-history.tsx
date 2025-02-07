import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus, MessageSquare } from "lucide-react"

interface ChatHistoryProps {
  chats: {
    id: string
    title: string
    timestamp: string
    active?: boolean
  }[]
  onSelect: (id: string) => void
  selectedId: string | null
  handleAddingNewChat: () => void
}

export function ChatHistory({ chats, onSelect,selectedId, handleAddingNewChat }: ChatHistoryProps) {
  return (
    <div className="flex bg-slate-950 h-[calc(100vh-60px)] w-[300px] flex-col border-r">
      <div className="p-4">
        <Button className="w-full justify-start gap-2" onClick={handleAddingNewChat}>
          <Plus size={16} />
          New Chat
        </Button>
      </div>
      <ScrollArea className="flex-1 px-2">
        <div className="space-y-2 p-2">
          {chats.map((chat) => (
            <Button
              key={chat.id}
              variant={selectedId === chat.id ? "secondary" : "ghost"}
              className="w-full justify-start gap-2 truncate"
              onClick={() => onSelect(chat.id)}
            >
              <MessageSquare size={16} />
              <span className="truncate">{chat.title}</span>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

