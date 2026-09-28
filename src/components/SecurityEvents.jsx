import { Download } from "lucide-react";

export default function SecurityEvents({ events, filter, setFilter }) {
  return (
    <div className="card">
      <div className="card-title">
        <span>Security Events</span>
        <div className="filters">
          {["All", "Critical", "High", "Medium"].map((f) => (
            <button key={f} className={filter === f ? "chip active" : "chip"} onClick={() => setFilter(f)}>{f}</button>
          ))}
          <button className="export-btn" onClick={() => exportEvents(events)} disabled={events.length === 0} title="Export visible events as CSV">
            <Download size={14} /> Export CSV
          </button>
        </div>
      </div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Time</th><th>Source</th><th>Target</th><th>Event</th><th>Severity</th></tr></thead>
          <tbody>
            {events.map((e) => (
              <tr key={e.id}><td>{e.time}</td><td>{e.source}</td><td>{e.target}</td><td>{e.event}</td>
                <td><span className={`badge ${e.severity}`}>{e.severity}</span></td></tr>
            ))}
            {events.length === 0 && <tr><td colSpan="5" className="muted">No events match.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function exportEvents(events) {
  const columns = ["time", "source", "target", "event", "severity"];
  const escapeCsv = (value) => `"${String(value ?? "").replaceAll('"', '""')}"`;
  const rows = [columns, ...events.map((event) => columns.map((column) => event[column]))];
  const csv = rows.map((row) => row.map(escapeCsv).join(",")).join("\r\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = "b2csm-security-events.csv";
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
