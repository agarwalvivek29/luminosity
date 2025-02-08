export interface MindMapData {
  topics: string[]
  connections: [string, string][]
}

export interface TreeNode {
  name: string
  children?: TreeNode[]
}

