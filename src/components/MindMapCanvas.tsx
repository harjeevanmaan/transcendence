import React, { useRef, useEffect } from "react";
import ForceGraph2D from 'react-force-graph-2d';
export interface NodeType {
  id: string;
  label: string;
  importance?: number;
}

export interface EdgeType {
  source: string;
  target: string;
  relation?: string;
  weight?: number;
}

export interface MindMapData {
  nodes: NodeType[];
  edges: EdgeType[];
}

// Renders a basic 2-D force graph. Node size = importance, edge width = weight.
const MindMapCanvas = ({ data }: { data: MindMapData }) => {
  const fgRef = useRef<any>();

  // Slightly stronger repulsion for sparse, floaty feel
  useEffect(() => {
    if (fgRef.current) {
      fgRef.current.d3Force("charge").strength(-250);
    }
  }, []);

  const graph = React.useMemo(() => ({ nodes: data.nodes, links: data.edges }), [data]);

  return (
    <ForceGraph2D
      ref={fgRef}
      graphData={graph as any}
      nodeLabel={(n: any) => n.label}
      nodeCanvasObject={(node: any, ctx: CanvasRenderingContext2D) => {
        if (!Number.isFinite(node.x) || !Number.isFinite(node.y)) return; // not yet positioned
        const radius = 4 + (node.importance || 2) * 2;
        const g = ctx.createRadialGradient(node.x, node.y, radius * 0.2, node.x, node.y, radius);
        g.addColorStop(0, "#6366F1"); // indigo-500
        g.addColorStop(1, "#3730A3"); // indigo-800
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2, false);
        ctx.fill();
      }}
      linkWidth={(link: any) => link.weight || 1}
      linkColor={() => "#94A3B8"} // slate-400
    />
  );
};

export default MindMapCanvas; 