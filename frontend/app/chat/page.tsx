"use client";

import { useEffect, useState } from "react";
import { ChatHistory } from "@/app/components/chat-history";
import { ChatArea } from "@/app/components/chat-area";
import axios from "axios";
// import cls from "../components/chat-message.module.css";
import Navbar from "@/components/navbar";
import { SendHorizontal } from "lucide-react";

import ContentViewer from "../components/Right";

interface Chat {
  id: string;
  title: string;
  timestamp: string;
}

interface Message {
  id: string;
  content: string;
  role: "assistant" | "user";
  timestamp: string;
  topic?: string;
}

const sampleChats: Chat[] = [
  { id: "1", title: "das", timestamp: "2024-02-06" },
  { id: "2", title: "cxz", timestamp: "2024-02-06" },
  { id: "3", title: "dfds", timestamp: "2024-02-06" },
  { id: "4", title: "ewq", timestamp: "2024-02-06" },
];

const sampleMessages: Message[] = [
  { id: "1", content: "Hello!", timestamp: "2024-02-06", role: "assistant" },
  { id: "2", content: "Hi there!", timestamp: "2024-02-06", role: "user" },
];

export default function ChatPage() {
  const [chats, setChats] = useState<Chat[]>(sampleChats);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(
    sampleChats[0]?.id || null
  );
  const [messages, setMessages] = useState<Message[]>(sampleMessages);

  const fetchData = async () => {
    const response = await axios.get(
      "https://7nbt3c9h-5000.inc1.devtunnels.ms/api/text"
    );
    console.log(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Fetch chats (will implement later)
  // useEffect(() => {
  //   const fetchChats = async () => {
  //     // Placeholder for future fetch logic
  //     // setChats([])
  //     console.log("Fetching chats...");
  //   };
  //   fetchChats();
  // }, []);

  // // Fetch messages when a chat is selected
  // useEffect(() => {
  //   if (!selectedChatId) return;

  //   const fetchMessages = async () => {
  //     // Placeholder for future fetch logic
  //     // setMessages([])
  //     console.log(`Fetching messages for chat ID: ${selectedChatId}`);
  //   };
  //   fetchMessages();
  // }, [selectedChatId]);
  // const [isNewChat, setIsNewChat] = useState(false);

  const handleAddingNewChat = () => {
    const newChat: Chat = {
      id: String(chats.length + 1),
      title: "New Chat",
      timestamp: new Date().toLocaleDateString(),
    };

    setChats((prev) => [...prev, newChat]);
    setSelectedChatId(newChat.id);
    setMessages([]);
    // setIsNewChat(true); // Mark as a new chat
  };

  const handleSendMessage = async(content: string) => {
    // if (isNewChat) setIsNewChat(false); // Switch to normal chat mode when user sends a message

    const { data } = await axios.post('/api/generate', { prompt: content });

    console.log(data);

    const timestamp = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const newMessage: Message = {
      id: String(messages.length + 1),
      content,
      role: "user",
      timestamp,
      topic: data.response,
    };

    setMessages((prev) => [...prev, newMessage]);
  };

  // const handleAddingNewChat = () => {
  //   const newChat: Chat = {
  //     id: String(chats.length + 1),
  //     title: "New Chat",
  //     timestamp: new Date().toLocaleDateString(),
  //   };

  //   setChats((prev) => [...prev, newChat]);
  //   setSelectedChatId(newChat.id);
  //   setMessages([
  //     {
  //       id: "1",
  //       content: "new chat",
  //       role: "assistant",
  //       timestamp: new Date().toLocaleTimeString(),
  //     },
  //   ]);
  // };

  // const handleSendMessage = (content: string) => {
  //   const timestamp = new Date().toLocaleTimeString([], {
  //     hour: "2-digit",
  //     minute: "2-digit",
  //   });

  //   const newMessage: Message = {
  //     id: String(messages.length + 1),
  //     content,
  //     role: "user",
  //     timestamp,
  //   };

  //   setMessages((prev) => [...prev, newMessage]);
  // };

  const handleSelectChat = (id: string) => {
    setSelectedChatId(id);
  };

  const things = [
//     {
//       code: `
// # Sample Code Block

// Here is some JavaScript code:

// \`\`\`javascript
// function greet(name) {
//   return \`Hello, there!\`;
// }
// console.log(greet("Mohit"));
// \`\`\`
// `,
//       image:
//         "https://appsierra-site.s3.ap-south-1.amazonaws.com/menskool_Blog_5174c8ed71.jpg",

//       chem: "C1=CC=CC=C1",
//       desmos: true,
//     },
  ];

  return (
    <>
      <Navbar />
      <div className="flex h-[calc(100vh-60px)] bg-[#0a0a0a]">
        <ChatHistory
          chats={chats}
          onSelect={handleSelectChat}
          selectedId={selectedChatId}
          handleAddingNewChat={handleAddingNewChat}
        />
        <div className="flex-1 flex">
          <div className="flex-1">
            {messages.length === 0 ? (
              <div className="flex h-full items-center justify-center p-4">
                <div className="w-full max-w-3xl space-y-6">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const target = e.target as HTMLFormElement;
                      const input = target.elements.namedItem(
                        "message"
                      ) as HTMLTextAreaElement;
                      if (input.value.trim()) {
                        handleSendMessage(input.value);
                        input.value = "";
                      }
                    }}
                    className="space-y-4"
                  >
                    <div className="flex gap-4 items-end">
                      <textarea
                        name="message"
                        placeholder="How can Claude help you today?"
                        className="min-h-[60px] max-h-[200px] w-full rounded-xl border border-zinc-700 bg-[#1a1a1a] p-4 text-white placeholder:text-zinc-400 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                        rows={1}
                      />
                      <button
                        type="submit"
                        className="rounded-xl bg-violet-600 p-4 text-white hover:bg-violet-500 transition-colors"
                      >
                        <SendHorizontal className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="text-sm text-zinc-400 text-center">
                      Collaborate with DecRel using documents, images, and more
                    </div>
                    <div className="flex flex-wrap gap-4 justify-center">
                      {[
                        "Generate interview questions",
                        "Write a memo",
                        "Summarize meeting notes",
                      ].map((suggestion) => (
                        <button
                          key={suggestion}
                          type="button"
                          className="px-4 py-2 rounded-xl border border-zinc-700 bg-[#1a1a1a] text-white hover:bg-[#2a2a2a] transition-colors text-sm"
                          onClick={(e) => {
                            const form = (
                              e.target as HTMLButtonElement
                            ).closest("form");
                            const input = form?.querySelector("textarea");
                            if (input) {
                              input.value = suggestion;
                            }
                          }}
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              <ChatArea
                messages={messages}
                onSendMessage={handleSendMessage}
                // isNewChat={isNewChat}
              />
            )}
          </div>
          {things && things.length > 0 && (
            <div className="w-[50%]">
              <ContentViewer
                desmos={things[0].desmos}
                chem={things[0].chem}
                code={things[0].code}
                image={things[0].image}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
