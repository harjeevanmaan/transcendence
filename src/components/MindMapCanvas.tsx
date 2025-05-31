import React, { useRef, useEffect, useState } from "react";
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
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 300, h: 300 });

  // Resize observer to keep canvas bounded to parent div
  useEffect(() => {
    const update = () => {
      if (!wrapperRef.current) return;
      const { clientWidth, clientHeight } = wrapperRef.current;
      setSize({ w: clientWidth, h: clientHeight });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Configure forces only once
  useEffect(() => {
    if (fgRef.current) {
      fgRef.current.d3Force("charge").strength(-120);
      fgRef.current.d3Force("center").strength(0.1);
    }
  }, []);

  const graph = React.useMemo(() => ({ nodes: data.nodes, links: data.edges }), [data]);

  useEffect(() => {
    if (data.nodes.length) {
      console.log("🎨 rendering graph with", data.nodes.length, "nodes");
    }
  }, [data.nodes.length]);

  return (
    <div ref={wrapperRef} className="w-full h-full">
      <ForceGraph2D
        ref={fgRef}
        width={size.w}
        height={size.h}
        graphData={graph as any}
        nodeLabel={(n: any) => n.label}
        nodeCanvasObject={(node: any, ctx: CanvasRenderingContext2D) => {
          if (!Number.isFinite(node.x) || !Number.isFinite(node.y)) return;
          const radius = 4 + (node.importance || 2) * 2;

          // circle
          const g = ctx.createRadialGradient(node.x, node.y, radius * 0.2, node.x, node.y, radius);
          g.addColorStop(0, "#6366F1");
          g.addColorStop(1, "#3730A3");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(node.x, node.y, radius, 0, Math.PI * 2, false);
          ctx.fill();

          // label
          ctx.font = "10px Inter, sans-serif";
          ctx.fillStyle = "#E0E7FF"; // indigo-100
          ctx.textAlign = "center";
          ctx.textBaseline = "top";
          ctx.fillText(node.label, node.x, node.y + radius + 2);
        }}
        linkWidth={(link: any) => link.weight || 1}
        linkColor={() => "#94A3B8"}
      />
    </div>
  );
};

export default MindMapCanvas; 