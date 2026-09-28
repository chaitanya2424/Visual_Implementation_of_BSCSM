export default function IncidentSummary({ incident, step, total }) {
  const rows = [["Incident ID", incident.id], ["Attacker", incident.attacker], ["Initial Target", incident.initialTarget],
    ["Compromised Assets", incident.compromised], ["Path Severity", incident.pathSeverity], ["Affected Assets", incident.affectedAssets]];
  return (
    <div className="card">
      <div className="card-title">Current Incident</div>
      {rows.map(([k, v]) => <div className="row" key={k}><span className="muted">{k}</span><span>{v}</span></div>)}
      <div className="row"><span className="muted">Severity</span><span className="badge Critical">{incident.severity}</span></div>
      <div className="row"><span className="muted">Status</span><span className="badge Medium">{incident.status}</span></div>
      <div className="path-box"><div className="muted">Attack Path</div>{incident.path}
        {step > 0 && <div className="muted" style={{ marginTop: 4 }}>Traced {Math.min(step - 1, total)}/{total} hops</div>}
      </div>
    </div>
  );
}
