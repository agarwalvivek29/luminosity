"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Paperclip, SendHorizontal } from "lucide-react";
import { ChatMessage } from "./chat-message";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface Message {
  id: string;
  content: string;
  role: "assistant" | "user";
  timestamp: string;
  topic?: string;
}

interface ChatAreaProps {
  messages: Message[];
  onSendMessage: (content: string) => void;
}

export function ChatArea({ messages, onSendMessage }: ChatAreaProps) {
  const [input, setInput] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      // Check file type and set preview accordingly
      if (selectedFile.type === "application/pdf") {
        setFilePreview("/PDF_file_icon.svg.png"); // Assuming pdf_icon.png is in the public folder
      } else {
        // Create a blob URL for preview
        const previewUrl = URL.createObjectURL(selectedFile);
        setFilePreview(previewUrl);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input);
      setInput("");
    }
  };

  return (
    <div className="flex h-[calc(100vh-60px)] flex-col">
      <div className="flex-1 overflow-y-auto">
        {messages.map((message) => (
          <ChatMessage
            topic={message?.topic}
            key={message.id}
            content={message.content}
            role={message.role}
            timestamp={message.timestamp}
          />
        ))}
      </div>
      <div className="border-t p-4">
        {filePreview && (
          <div className="mb-2 relative h-20 w-20">
            <Image
              src={filePreview}
              alt="File preview"
              fill
              className="object-contain rounded-md"
            />
          </div>
        )}
        <p className="mb-2">{file?.name}</p>
        <form onSubmit={handleSubmit} className="flex gap-4 items-center">
          <Button
            type="button"
            size="icon"
            onClick={() => fileRef.current?.click()}
          >
            <Paperclip className="h-4 w-4" />
          </Button>
          <input
            type="file"
            className="hidden"
            ref={fileRef}
            onChange={handleFileChange}
          />
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Send a message..."
            className="min-h-[60px] max-h-[150px]"
          />
          <Button type="submit" size="icon" disabled={!input.trim()}>
            <SendHorizontal className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
