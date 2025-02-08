"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import Tree from "react-d3-tree";
import { useMindMap } from "../hooks/useMindMap";
import type { TreeNode } from "../types/mindmap";
import { MindMapData } from "@/types/mindmap";

const CustomNode = ({
  nodeDatum,
  toggleNode,
}: {
  nodeDatum: TreeNode;
  toggleNode: () => void;
}) => (
  <g>
    <circle r={20} fill="#4CAF50" onClick={toggleNode} />
    <text
      dy=".31em"
      x={26}
      textAnchor="start"
      style={{ fill: "black", fontSize: "14px" }}
      onClick={toggleNode}
    >
      {nodeDatum.name}
    </text>
  </g>
);

export default function MindMap({ initialtopic }: { initialtopic: any }) {
  // const { treeData, loading, error, selectedNode, fetchData, handleNodeClick } =
  //   useMindMap(topic);
  console.log("herere", initialtopic);
  // const parsedtreeData = JSON.parse(initialtopic);
  // console.log("parsed data",parsedtreeData)
  const treeDataMind: MindMapData = {
    topics: initialtopic.topics,
    connections: initialtopic.connections,
  };
  

  function convertToTreeData(data: MindMapData): TreeNode {
    const rootTopic = data.topics[0]; // Assume the first topic is the root
    const topicMap = new Map<string, TreeNode>();

    // Initialize all topics as nodes
    data.topics.forEach((topic) => {
      topicMap.set(topic, { name: topic });
    });

    // Build the tree structure
    data.connections.forEach(([parent, child]) => {
      const parentNode = topicMap.get(parent);
      const childNode = topicMap.get(child);

      if (parentNode && childNode) {
        if (!parentNode.children) {
          parentNode.children = [];
        }
        parentNode.children.push(childNode);
      }
    });

    return topicMap.get(rootTopic) || { name: "No Data" };
  }

  const treeData = convertToTreeData(treeDataMind);

  console.log("herere321312", treeData);
  const treeContainerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (treeContainerRef.current) {
        setDimensions({
          width: treeContainerRef.current.offsetWidth,
          height: treeContainerRef.current.offsetHeight,
        });
      }
    };

    window.addEventListener("resize", updateDimensions);
    updateDimensions();

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <div
      ref={treeContainerRef}
      className="flex-1 border rounded-lg overflow-hidden h-[calc(100vh-150px)] bg-white"
    >
      {treeData && (
        <Tree
          data={treeData}
          orientation="horizontal"
          pathFunc="step"
          translate={{ x: 100, y: dimensions.height / 2 }}
          renderCustomNodeElement={(rd3tProps) => <CustomNode {...rd3tProps} />}
          // onNodeClick={(nodeData) => handleNodeClick(nodeData as TreeNode)}
          dimensions={dimensions}
        />
      )}
    </div>
  );
}
