import axios from "axios";
import type { MindMapData, TreeNode } from "../types/mindmap";

// Mock API function to simulate fetching researched data
export async function fetchTopicData(topic: string): Promise<MindMapData> {
  // Simulate API delay
  let topics: string[] = [];
  let connections: [string, string][] = [];
  axios
    .post("https://splzt74b-8000.inc1.devtunnels.ms/mindmaps", {
      prompt: topic,
    })
    .then((response) => {
      topics = response.data.flowchart.topics;
      connections = response.data.flowchart.connections;
    })
    .catch((error) => {
      console.log(error);
    });
  // Mock data structure
  const mockData: MindMapData = {
    topics: topics,
    connections: connections,
  };

  return mockData;
}

// Function to convert our data structure to tree structure for react-d3-tree
export function convertToTreeData(data: MindMapData): TreeNode {
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
