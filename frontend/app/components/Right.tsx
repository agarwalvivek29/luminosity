import React, { useEffect, useState } from "react";
import { ChartLine, Code, Image, Video, Waypoints, Map } from "lucide-react";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import remarkGfm from "remark-gfm";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import Molecule from "../components/MoleculeStructure/index.jsx";
import DesmosGraph from "./DesmosGraph";
import VcdGraph from "./vcd";
import MindMap from "@/app/components/MindMap";

const ContentViewer = ({
  code,
  image,
  video,
  desmos,
  chem,
  vcd,
  mindmap,
}: {
  code?: string;
  image?: string;
  video?: string;
  desmos?: boolean;
  chem?: string;
  vcd?: string;
  mindmap?: any;
}) => {
  const initialTab = code
    ? "code"
    : image
    ? "image"
    : video
    ? "video"
    : desmos
    ? "desmos"
    : chem
    ? "chem"
    : "vcd";
  const [activeTab, setActiveTab] = useState(initialTab);
  const [editingBlock, setEditingBlock] = useState<string | null>(null);
  const [editContent, setEditContent] = useState(code || "");
  const icons = {
    code: Code,
    image: Image,
    video: Video,
    desmos: ChartLine,
    chem: Waypoints,
    vcd: Video,
    mindMap: Map,
  };

  console.log("video", video);

  return (
    <div className="h-full border rounded-lg bg-slate-950 shadow-sm">
      <div className="flex border-b">
        {code && (
          <button
            onClick={() => setActiveTab("code")}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors
              ${
                activeTab === "code"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-600 hover:text-gray-300"
              }`}
          >
            <Code className="w-4 h-4" />
            <span className="capitalize">{"Code"}</span>
          </button>
        )}
        {image && (
          <button
            onClick={() => setActiveTab("image")}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors
              ${
                activeTab === "image"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-600 hover:text-gray-300"
              }`}
          >
            <Image className="w-4 h-4" />
            <span className="capitalize">{"Image"}</span>
          </button>
        )}
        {video && (
          <button
            onClick={() => setActiveTab("video")}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors
              ${
                activeTab === "video"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-600 hover:text-gray-300"
              }`}
          >
            <Video className="w-4 h-4" />
            <span className="capitalize">{"Video"}</span>
          </button>
        )}
        {desmos && (
          <button
            onClick={() => setActiveTab("desmos")}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors
              ${
                activeTab === "desmos"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-600 hover:text-gray-300"
              }`}
          >
            <ChartLine className="w-4 h-4" />
            <span className="capitalize">{"Desmos"}</span>
          </button>
        )}
        {chem && (
          <button
            onClick={() => setActiveTab("chem")}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors
              ${
                activeTab === "chem"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-600 hover:text-gray-300"
              }`}
          >
            <Waypoints className="w-4 h-4" />
            <span className="capitalize">{"Chem"}</span>
          </button>
        )}
        {vcd && (
          <button
            onClick={() => setActiveTab("vcd")}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors
              ${
                activeTab === "vcd"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-600 hover:text-gray-300"
              }`}
          >
            <Waypoints className="w-4 h-4" />
            <span className="capitalize">{"Vcd"}</span>
          </button>
        )}
        {mindmap && (
          <button
            onClick={() => setActiveTab("mindmap")}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors
              ${
                activeTab === "mindmap"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-600 hover:text-gray-300"
              }`}
          >
            <Map className="w-4 h-4" />
            <span className="capitalize">{"mindmap"}</span>
          </button>
        )}
      </div>

      <div className="p-4">
        {activeTab === "code" && (
          <pre className="p-4 rounded-lg overflow-auto">
            <Markdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");
                  const codeContent = String(children).replace(/\n$/, "");
                  const blockId = inline ? null : codeContent.slice(0, 20);

                  if (!inline && match) {
                    return (
                      <div className="relative group">
                        {editingBlock === blockId ? (
                          <div className="relative">
                            <textarea
                              value={codeContent}
                              onChange={(e) => {
                                const newContent = editContent.replace(
                                  codeContent,
                                  e.target.value
                                );
                                setEditContent(newContent);
                              }}
                              className="w-full min-h-[100px] p-4 bg-slate-900 text-gray-200 font-mono text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                              onClick={() => setEditingBlock(null)}
                              className="absolute top-2 right-2 px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                              Done
                            </button>
                          </div>
                        ) : (
                          <div className="relative">
                            <SyntaxHighlighter
                              style={vscDarkPlus}
                              language={match[1]}
                              PreTag="div"
                              {...props}
                            >
                              {codeContent}
                            </SyntaxHighlighter>
                            <button
                              onClick={() => setEditingBlock(blockId)}
                              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition-opacity"
                            >
                              Edit
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  }
                  return (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {editContent}
            </Markdown>
          </pre>
        )}
        {activeTab === "image" && image && (
          <div className="flex justify-center">
            <img
              src={image}
              alt="Content"
              className="max-w-full h-auto bg-white min-w-[600px]"
            />
          </div>
        )}
        {activeTab === "video" && video && (
          <div className="flex justify-center">
            <video controls className="max-w-full rounded-lg">
              <source src={video} />
            </video>
          </div>
        )}
        {activeTab === "desmos" && (
          <div className="flex justify-center">
            <DesmosGraph />
          </div>
        )}
        {activeTab === "chem" && (
          <div className="flex justify-center">
            <Molecule />
          </div>
        )}
        {activeTab === "vcd" && (
          <div className="h-full w-full">
            {/* <DesmosGraph /> */}
            <VcdGraph vcd={vcd} />
          </div>
        )}
        {activeTab === "mindmap" && (
          <div className="h-full w-full">
            <MindMap initialtopic={mindmap}/>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentViewer;
