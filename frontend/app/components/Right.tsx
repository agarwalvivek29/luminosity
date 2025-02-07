"use client";

import React, { useState } from "react";
import { Code, Image, Video } from "lucide-react";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import remarkGfm from "remark-gfm";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
// import DesmosGraph from "./desmos";
import Molecule from "../components/MoleculeStructure/index.jsx";

const ContentViewer = ({
  code,
  image,
  video,
}: {
  code?: string;
  image?: string;
  video?: string;
}) => {
  const [activeTab, setActiveTab] = useState("code");
  const [editingBlock, setEditingBlock] = useState<string | null>(null);
  const [editContent, setEditContent] = useState(code || '');

  const tabs = [
    { id: "code", icon: Code, content: code, available: !!code },
    { id: "image", icon: Image, content: image, available: !!image },
    { id: "video", icon: Video, content: video, available: !!video },
    { id: "desmos", icon: Video, content: code, available: !!code },
    { id: "chem", icon: Video, content: code, available: !!code },
  ].filter((tab) => tab.available);

  return (
    <div className="h-full border rounded-lg bg-slate-950 shadow-sm">
      <div className="flex border-b">
        {tabs.map(({ id, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors
              ${
                activeTab === id
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-600 hover:text-gray-300"
              }`}
          >
            <Icon className="w-4 h-4" />
            <span className="capitalize">{id}</span>
          </button>
        ))}
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
                                const newContent = editContent.replace(codeContent, e.target.value);
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
            <img src={image} alt="Content" className="max-w-full h-auto" />
          </div>
        )}
        {activeTab === "video" && video && (
          <div className="flex justify-center">
            <video controls className="max-w-full">
              <source src={video} />
            </video>
          </div>
        )}
        {/* {activeTab === "desmos" && (
          <div className="flex justify-center">
            <DesmosGraph />
          </div>
        )} */}

        {activeTab === "chem" && (
          <div className="flex justify-center">
            {/* <DesmosGraph /> */}
            <Molecule />
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentViewer;
