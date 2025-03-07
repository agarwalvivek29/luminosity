"use client";

import { useEffect, useState } from "react";
import { ChatHistory } from "@/app/components/chat-history";
import { ChatArea } from "@/app/components/chat-area";
import axios from "axios";
// import cls from "../components/chat-message.module.css";
import Navbar from "@/components/navbar";
import { SendHorizontal } from "lucide-react";

import ContentViewer from "../components/Right";
import Typing from "../components/Typing";
import { MindMapData } from "@/types/mindmap";

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

interface Thing {
  code?: string;
  image?: string;
  video?: string;
  desmos?: boolean;
  chem?: string;
  vcd?: string;
  mindMap?: any;
}

const sampleChats: Chat[] = [
  { id: "1", title: "dasdas", timestamp: "2024-02-07" },
  // { id: "2", title: "cxz", timestamp: "2024-02-06" },
  // { id: "3", title: "dfds", timestamp: "2024-02-06" },
  // { id: "4", title: "ewq", timestamp: "2024-02-06" },
];

const sampleMessages: Message[] = [
  { id: "1", content: "Hello!", timestamp: "2024-02-07", role: "assistant" },
  {
    id: "2",
    content: "Hey!",
    timestamp: "2024-02-07",
    role: "user",
  },
];

export default function ChatPage() {
  const [chats, setChats] = useState<Chat[]>(sampleChats);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(
    sampleChats[0]?.id || null
  );
  const [file, setFile] = useState<File | null>(null);
  const [messages, setMessages] = useState<Message[]>(sampleMessages);
  const [things, setThings] = useState<Thing | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
    setFile(null);
    setThings(null)
    // setIsNewChat(true); // Mark as a new chat
  };

  // useEffect(()=>{
  //   setThings({video: "https://solace-outputs.s3.ap-south-1.amazonaws.com/innerve/Integration.mp4"});
  // },[])

  const handleSendMessage = async (content: string) => {
    // if (isNewChat) setIsNewChat(false); // Switch to normal chat mode when user sends a message

    if (file) {
      const formData = new FormData();
      formData.append("file", file, file.name);
      const fileType = file.name.split('.').pop()?.toLowerCase();
      if (fileType === "kicad_pcb") {
        // Send to the current backend
        const response = await axios.post("https://splzt74b-8000.inc1.devtunnels.ms/electronics/chipdesign", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
  
        
      const timestamp3 = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      const newMessage3: Message = {
        id: String(messages.length + 1),
        content: response.data.message,
        role: "assistant",
        timestamp: timestamp3,
      };
  
      setThings({
        image: response.data.image,
      })
  
      setMessages((prev) => [...prev, newMessage3]);
  
  
        return;
      } else {
        formData.append("text", content);
        axios.post("https://7nbt3c9h-5000.inc1.devtunnels.ms/api/rag", formData, {
          headers: {
            "Content-Type": "form-data",
          },
        }).then((response) => {
          const timestamp3 = new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });
          const newMessage3: Message = {
            id: String(messages.length + 1),
            content: response.data.result2,
            role: "assistant",
            timestamp: timestamp3,
          };
          setMessages((prev) => [...prev, newMessage3]);
        }).catch((error) => {
          console.error("Error:", error);
        }
        ).finally(() => {
          setIsLoading(false);
        });
        return;
      }
      
    }

    setIsLoading(true);

    const isRoadMap = content.includes("@roadmap");

    if (isRoadMap) {
      let topics: string[] = [];
      let connections: [string, string][] = [];
      axios
        .post("https://splzt74b-8000.inc1.devtunnels.ms/mindmaps", {
          prompt: content,
        })
        .then((response) => {
          const data = JSON.parse(response.data.flowchart);
          console.log("parsed data", data);
          topics = data.topics;
          connections = data.connections;

          // Mock data structure
          const mockData: MindMapData = {
            topics: topics,
            connections: connections,
          };

          console.log("Mock data", mockData);
          setThings({ mindMap: mockData });

          const timestamp = new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });

          const newMessage: Message = {
            id: String(messages.length + 1),
            content:
              response.data.message,
            role: "assistant",
            timestamp,
          };

          setMessages((prev) => [...prev, newMessage]);
        })
        .catch((error) => {
          console.log(error);
        }).finally(() => {
          setIsLoading(false);
        });

    }
    const { data } = await axios.post("/api/generate", { prompt: content });

    console.log("gemini", data);

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

    const isVid = content.includes("@video");
    const isVidNum = isVid ? 1 : 0;
    const isImg = content.includes("@image");
    const isImgNum = isImg ? 1 : 0;
    console.log("making backed request up");


    if (data.response === "math"||data.response === "physics") {
      axios
        .post(`https://7nbt3c9h-5000.inc1.devtunnels.ms/api/math`, {
          text: content,
          vid: isVidNum,
        })
        .then((response) => {
          console.log("hello", response.data);
          if (isVid) {
            console.log("setting video");
            const timestamp2 = new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });
            const newMessage2: Message = {
              id: String(messages.length + 1),
              content: "Hold on while we generate the video for you...",
              role: "assistant",
              timestamp: timestamp2
            };
            setMessages((prev) => [...prev, newMessage2]);
            const intervalId = setInterval(async () => {
              try {
                const res = await fetch(
                  `https://solace-outputs.s3.ap-south-1.amazonaws.com/innerve/${response.data.text.uuid}.mp4`
                );
                // If the fetch returns a valid response (non-null) then clear the interval and set things
                if (res.ok) {
                  clearInterval(intervalId);
                  setThings({
                    video: `https://solace-outputs.s3.ap-south-1.amazonaws.com/innerve/${response.data.text.uuid}.mp4`,
                  });
                  setIsLoading(false);
                }
                // If not, do nothing and the interval will try again
              } catch (error) {
                console.error("Error during fetch:", error);
              }
            }, 10000);
          } else {
            const timestamp2 = new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });
            const newMessage2: Message = {
              id: String(messages.length + 1),
              content: response.data.text,
              role: "assistant",
              timestamp: timestamp2,
            };
            setMessages((prev) => [...prev, newMessage2]);
          }
          console.log("setted things");
        })
        .catch((error) => {
          console.error("Error:", error);
          setIsLoading(false);
        })
    } else if (data.response === "electronics") {
      axios
        .post(`https://splzt74b-8000.inc1.devtunnels.ms/electronics/verilog`, {
          prompt: content,
        })
        .then((response) => {
          console.log("hello inside electronics", response.data);
          const responseText = response.data.message;
          const timestamp2 = new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });
          const newMessage: Message = {
            id: String(messages.length + 1),
            content: responseText,
            role: "assistant",
            timestamp: timestamp2,
          };

          if (response.data?.simulation) {
            console.log("setting video");
            setThings({
              vcd: response.data.simulation,
              image: response.data.rtlview,
            });
          }

          setMessages((prev) => [...prev, newMessage]);
        })
        .catch((error) => {
          console.error("Error:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else if (data.response === "chemistry") {
      if(isImg){
        const timestamp2 = new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
      const newMessage: Message = {
        id: String(messages.length + 1),
        content: "Hold on while we generate the model for you...",
        role: "assistant",
        timestamp: timestamp2
      };

      setMessages((prev) => [...prev, newMessage]);
    }
      axios
        .post(`https://7nbt3c9h-5000.inc1.devtunnels.ms/api/chemistry`, {
          text: content,
          img: isImgNum,
        })
        .then((response) => {
          console.log("hello inside chemistry", response.data?.text?.rd);
          if(response.data?.text?.rd){
          setThings({
            chem: response.data?.text?.rd,
          })
        }else{
          const timestamp2 = new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });
          const newMessage5: Message = {
            id: String(messages.length + 1),
            content: response.data.text,
            role: "assistant",
            timestamp: timestamp2,
          };
          setMessages((prev) => [...prev, newMessage5]);
        }
        })
        .catch((error) => {
          console.error("Error:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else if (data.response === "other") {
       axios.post('/api/other', { prompt: content }).then((response) => {
        const timestamp2 = new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        const newMessage: Message = {
          id: String(messages.length + 1),
          content: response.data.response,
          role: "assistant",
          timestamp: timestamp2,
        };
        setMessages((prev) => [...prev, newMessage]);
      }).catch((error) => {
        console.error("Error:", error);
      }).finally(() => {
        setIsLoading(false);
      });
    }
    console.log("makin backed request down");
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
                        placeholder="How can I help you today?"
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
                isLoading={isLoading}
                file={file}
                setFile={setFile}
              />
            )}
          </div>
          {things && (
            <div className="w-[50%]">
              <ContentViewer
                desmos={things?.desmos}
                chem={things?.chem}
                code={things?.code}
                image={things?.image}
                video={things?.video}
                vcd={things?.vcd}
                mindmap={things?.mindMap}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
