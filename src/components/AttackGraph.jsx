import { useMemo } from "react";
import ReactFlow, { Background, Controls, Handle, Position, MarkerType } from "reactflow";
import "reactflow/dist/style.css";
import { Skull, Server, Database, Monitor, AlertTriangle } from "lucide-react";

const icons = { attacker: Skull, compromised: AlertTriangle, critical: Database, normal: Monitor };

function SocNode({ data, type }) {
  const Icon = icons[type] || Server;
  return (
    <div className={`snode ${type} ${data.dim ? "dim" : ""} ${data.hl ? "hl" : ""} ${data.sel ? "sel" : ""}`}>
      <Handle type="target" position={Position.Left} />
      <div className="snode-head"><Icon size={14} /> {data.name}</div>
      <div className="snode-ip">{data.label}</div>
      <div className="snode-status">{data.status}</div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
const nodeTypes = { attacker: SocNode, compromised: SocNode, critical: SocNode, normal: SocNode };
const edgeColor = { ATTACK: "#ef4444", "LATERAL MOVEMENT": "#f97316", ACCESS: "#38bdf8", "DATA EXFILTRATION": "#a855f7" };

export default function AttackGraph({ nodes, edges, selected, onSelect, hlNodes, hlEdges, query, onTrace, tracing }) {
  const q = query.trim().toLowerCase();
  const hasHL = hlNodes.size > 0;

  const rfNodes = useMemo(() => nodes.map((n) => {
    const match = !q || Object.values(n.data).join(" ").toLowerCase().includes(q);
    const hl = hlNodes.has(n.id);
    return { ...n, data: { ...n.data, hl, sel: selected === n.id, dim: (hasHL && !hl) || !match } };
  }), [nodes, q, hlNodes, hasHL, selected]);

  const rfEdges = useMemo(() => edges.map((e) => {
    const hl = hlEdges.has(e.id);
    const c = edgeColor[e.label] || "#64748b";
    return {
      ...e, type: "smoothstep", animated: hl || (!hasHL && e.label !== "ACCESS"),
      markerEnd: { type: MarkerType.ArrowClosed, color: c },
      style: { stroke: c, strokeWidth: hl ? 3.5 : 1.8, opacity: hasHL && !hl ? 0.15 : 1 },
      labelStyle: { fill: "#e2e8f0", fontSize: 9, fontWeight: 700 },
      labelBgStyle: { fill: "#0f172a" }, labelBgPadding: [4, 2],
    };
  }), [edges, hlEdges, hasHL]);

  return (
    <div className="card graph-card">
      <div className="card-title">
        <span>Attack Graph</span>
        <button className="btn" onClick={onTrace} disabled={tracing}>{tracing ? "Tracing..." : "Trace Attack Path"}</button>
      </div>
      <div className="legend">
        <span><i style={{ background: "#ef4444" }} />Attacker</span>
        <span><i style={{ background: "#f97316" }} />Compromised</span>
        <span><i style={{ background: "#3b82f6" }} />Normal</span>
        <span><i style={{ background: "#a855f7" }} />Critical asset</span>
      </div>
      <div className="graph-area">
        <ReactFlow nodes={rfNodes} edges={rfEdges} nodeTypes={nodeTypes} fitView fitViewOptions={{ padding: 0.15 }}
          onNodeClick={(_, n) => onSelect(n.id)} onPaneClick={() => onSelect(null)} minZoom={0.3} proOptions={{ hideAttribution: true }}>
          <Background color="#1e293b" gap={20} />
          <Controls showInteractive={false} />
        </ReactFlow>
      </div>
    </div>
  );
}
