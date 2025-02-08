"use client";

import { useRef, useState, useMemo } from "react";
import Image from "next/image";
import { Paperclip, SendHorizontal } from "lucide-react";
import { ChatMessage } from "./chat-message";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Typing from "./Typing";

const mentionOptions = ['video', 'image', 'code', 'chem', 'vcd', "roadmap"];

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
  isLoading: boolean;
  file: File | null;
  setFile: (file: File) => void;
}

export function ChatArea({ messages,file, setFile, onSendMessage, isLoading }: ChatAreaProps) {
  const [input, setInput] = useState("");
  const [showMentionPopup, setShowMentionPopup] = useState(false);
  const [mentionQuery, setMentionQuery] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const [filePreview, setFilePreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      // Check file type and set preview accordingly
      if (selectedFile.type === "application/pdf") {
        setFilePreview("/PDF_file_icon.svg.png");
      } else {
        const previewUrl = URL.createObjectURL(selectedFile);
        setFilePreview(previewUrl);
      }
    }
  };

  const filteredOptions = useMemo(() => {
    return mentionOptions.filter(option => 
      option.toLowerCase().includes(mentionQuery.toLowerCase())
    );
  }, [mentionQuery]);

  const handleTextareaKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === '@') {
      e.preventDefault(); // Prevent '@' from being typed
      setShowMentionPopup(true);
      setMentionQuery('');
    } else if (e.key === 'Escape') {
      setShowMentionPopup(false);
    } else if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent newline from being added
      handleSubmit(e);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInput(value);

    // Check if there's an ongoing mention query
    if (showMentionPopup) {
      const lastAtIndex = value.lastIndexOf('@');
      if (lastAtIndex !== -1) {
        const queryPart = value.slice(lastAtIndex + 1);
        setMentionQuery(queryPart);
      }
    }
  };

  const handleMentionOptionClick = (option: string) => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      const lastAtIndex = input.lastIndexOf('@');
      
      // Construct the new value by keeping existing text and appending the option
      const newValue = ` ${input.slice(0, lastAtIndex)}@${option} `;
      
      setInput(newValue);
      setShowMentionPopup(false);
      setMentionQuery('');
      
      // Move cursor to the end
      setTimeout(() => {
        textarea.setSelectionRange(newValue.length, newValue.length);
        textarea.focus();
      }, 0);
    }
  };

  const handleSubmit = (e: React.FormEvent | React.KeyboardEvent) => {
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
      {isLoading && <Typing />}
      <div className="border-t p-4 relative">
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
          <div className="relative w-full">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={handleTextChange}
              onKeyDown={handleTextareaKeyDown}
              placeholder="Send a message..."
              className="min-h-[60px] max-h-[150px]"
            />
            {showMentionPopup && (
              <div
                className="absolute z-50 bottom-20 left-0 mt-2 bg-gray-800 
                  border border-gray-700 rounded-md shadow-lg py-2 text-white"
              >
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option) => (
                    <div
                      key={option}
                      onClick={() => handleMentionOptionClick(option)}
                      className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                    >
                      {option}
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-2 text-gray-400">
                    No matching options
                  </div>
                )}
              </div>
            )}
          </div>
          <Button type="submit" size="icon" disabled={!input.trim()}>
            <SendHorizontal className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}