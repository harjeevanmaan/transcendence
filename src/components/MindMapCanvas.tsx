import React, { useRef, useEffect, useState } from "react";
import ForceGraph2D from "react-force-graph-2d";
import type ForceGraphInstance from "force-graph";
import { forceCollide } from "d3-force";
import type { NodeObject } from "force-graph";

export interface NodeType extends NodeObject {
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
  const fgRef = useRef<ForceGraphInstance<NodeType, EdgeType>>();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 300, h: 300 });
  const [fitRequested, setFitRequested] = useState(false);
  const [layoutReady, setLayoutReady] = useState(false);

  // ResizeObserver keeps canvas height in sync with its parent at all times
  useEffect(() => {
    if (!wrapperRef.current) return;
    const el = wrapperRef.current;

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setSize({ w: Math.floor(width), h: Math.floor(height) });
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Configure forces only once
  useEffect(() => {
    if (fgRef.current) {
      fgRef.current.d3Force("charge")?.strength(-120);
      fgRef.current.d3Force("center")?.strength(0.1);

      /* ---------- NEW: keep nodes from overlapping ---------- */
      fgRef.current.d3Force(
        "collision",
        forceCollide<NodeType>()
          .radius((n: any) => 20 + n.label.length * 3)   // rough pill half-width
          .strength(0.9)
      );
    }
  }, []);

  const graph = React.useMemo(() => ({ nodes: data.nodes, links: data.edges }), [data]);

  useEffect(() => {
    if (data.nodes.length) {
      console.log("🎨 rendering graph with", data.nodes.length, "nodes");
    }
  }, [data.nodes.length]);

  // ───── Canvas-size debug ─────
  useEffect(() => {
    console.log("[Canvas] size →", size.w, "×", size.h);
  }, [size]);

  // ask for a fresh fit whenever data or canvas size changes
  useEffect(() => {
    if (data.nodes.length) {
      setFitRequested(true);
      setLayoutReady(false);
    }
  }, [data.nodes.length, size.w, size.h]);

  /* ---------- helper palettes ---------- */
  const colorByImportance = (imp: number = 1) => {
    return imp >= 5 ? "#4B5563"          // root  – slate-600
         : imp >= 3 ? "#6B7280"          // topic – gray-500
                    : "#D1D5DB";         // leaf  – gray-300
  };

  /* ---------- custom canvas render ---------- */
  const drawNode = (node: any, ctx: CanvasRenderingContext2D, scale: number) => {
    /* shorten very long labels so the pill stays compact */
    const rawLabel    = node.label ?? "";
    const label =
      rawLabel.length > 14 ? rawLabel.slice(0, 12).trimEnd() + "…" : rawLabel;
    const importance  = node.importance ?? 1;
    const fontPx      = 10 + importance * 2;     // 12-20 px
    ctx.font          = `${fontPx / scale}px Inter, sans-serif`;

    /* text size + pill outline */
    const textW       = ctx.measureText(label).width;
    const pad         = 4 + importance;          // fatter for big nodes
    const boxW        = textW + pad * 2;
    const boxH        = fontPx + pad * 2;

    const stroke      = colorByImportance(importance);
    const grad        = ctx.createLinearGradient(0, pad, 0, boxH - pad);
    grad.addColorStop(0, "#FFFFFF");
    grad.addColorStop(1, "#F3F4F6");

    ctx.fillStyle   = grad;
    ctx.strokeStyle = stroke;
    ctx.lineWidth     = 1.5;

    /* pill-shaped bg */
    const x = node.x! - boxW / 2;
    const y = node.y! - boxH / 2;
    const r = boxH / 2;
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + boxW - r, y);
    ctx.quadraticCurveTo(x + boxW, y, x + boxW, y + r);
    ctx.lineTo(x + boxW, y + boxH - r);
    ctx.quadraticCurveTo(x + boxW, y + boxH, x + boxW - r, y + boxH);
    ctx.lineTo(x + r, y + boxH);
    ctx.quadraticCurveTo(x, y + boxH, x, y + boxH - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    /* label */
    ctx.fillStyle   = stroke;
    ctx.textAlign   = "center";
    ctx.textBaseline= "middle";
    ctx.fillText(label, node.x!, node.y!);

    /* full text on native tooltip */
    if (!node.__titleSet) {
      node.__titleSet = true;
      node.name = rawLabel;               // ForceGraph uses `name` for <title>
    }
  };

  /* ---------- pointer area (hit-test) ---------- */
  const paintPointer = (node: any, colour: string, ctx: any) => {
    const w = 50 + (node.importance ?? 1) * 10;  // generous hit-box
    const h = 24 + (node.importance ?? 1) * 4;
    ctx.fillStyle = colour;
    ctx.fillRect(node.x! - w / 2, node.y! - h / 2, w, h);
  };

  /* ---------- helper: lock every node once layout is done ---------- */
  const freezeCurrentPositions = () => {
    const fg = fgRef.current;
    if (!fg || typeof (fg as any).graphData !== "function") return;

    const { nodes } = (fg as any).graphData();
    nodes.forEach((n: any) => {
      n.fx = n.x;
      n.fy = n.y;
    });
  };

  return (
    <div ref={wrapperRef} className="w-full h-full">
      <ForceGraph2D
        ref={fgRef}
        width={size.w}
        height={size.h}
        graphData={graph}
        // ---------- layout ----------
        dagMode="td"                // top-down
        dagLevelDistance={150}
        cooldownTicks={60}          // finish quickly but allow separation
        enableNodeDrag={false}
        // ---------- sizing / colour ----------
        nodeRelSize={4}
        nodeVal={(n: any) => n.importance ?? 1}
        linkColor={() => "rgba(0,0,0,0.2)"}
        // ---------- custom draw ----------
        nodeCanvasObject={drawNode}
        nodePointerAreaPaint={paintPointer}
        style={{ opacity: layoutReady ? 1 : 0, transition: "opacity .4s" }}
        onEngineStop={() => {
          if (fitRequested && fgRef.current) {
            fgRef.current.zoomToFit(400, 40);
            setFitRequested(false);
            setLayoutReady(true);

            /* 🔒 pin nodes so future data can't shake them */
            freezeCurrentPositions();
          }
        }}
      />
    </div>
  );
};

export default MindMapCanvas; 