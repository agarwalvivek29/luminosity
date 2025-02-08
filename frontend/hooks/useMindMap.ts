"use client";

import { useState } from "react";
import type { MindMapData, TreeNode } from "../types/mindmap";
import { fetchTopicData, convertToTreeData } from "../utils/mindMapUtils";

export function useMindMap(initialTopic: string) {
  const [topic, setTopic] = useState(initialTopic);
  const [data, setData] = useState<MindMapData | null>(null);
  const [treeData, setTreeData] = useState<TreeNode | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const fetchData = async (newTopic: string) => {
    setLoading(true);
    setError(null);
    try {
      const fetchedData = await fetchTopicData(newTopic);
      setData(fetchedData);
      const convertedTreeData = convertToTreeData(fetchedData);
      setTreeData(convertedTreeData);
      setTopic(newTopic);
    } catch (err) {
      console.log(err);
      setError("Failed to fetch mind map data");
    } finally {
      setLoading(false);
    }
  };

  const handleNodeClick = (nodeData: TreeNode) => {
    setSelectedNode(nodeData.name);
  };

  return {
    topic,
    data,
    treeData,
    loading,
    error,
    selectedNode,
    fetchData,
    handleNodeClick,
  };
}
