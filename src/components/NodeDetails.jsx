export default function NodeDetails({ node, edges }) {
  if (!node) return (
    <div className="card"><div className="card-title">Node Details</div><p className="muted">Click a node in the graph to inspect it.</p></div>
  );
  const d = node.data;
  const conns = edges.filter((e) => e.source === node.id || e.target === node.id).length;
  const rows = [["Type", d.kind], ["IP", d.label], ["Status", d.status], ["Risk", d.risk], ["First Detected", d.detected], ["Connections", conns]];
  return (
    <div className="card">
      <div className="card-title">Node Details</div>
      <h3 className="node-name">{d.name}</h3>
      {rows.map(([k, v]) => (
        <div className="row" key={k}><span className="muted">{k}</span>
          <span className={k === "Risk" ? `badge ${v}` : k === "Status" ? `badge st-${v}` : ""}>{v}</span></div>
      ))}
    </div>
  );
}
