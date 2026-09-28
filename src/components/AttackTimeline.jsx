export default function AttackTimeline({ events, activeId, onSelect }) {
  return (
    <div className="card">
      <div className="card-title">Attack Timeline</div>
      <div className="timeline">
        {events.map((e) => (
          <div key={e.id} className={`tl-item ${activeId === e.id ? "active" : ""}`} onClick={() => onSelect(e)}>
            <span className={`dot sev-${e.severity}`} />
            <div><div className="tl-time">{e.time}</div><div>{e.desc}</div></div>
          </div>
        ))}
        {events.length === 0 && <p className="muted">No matching events.</p>}
      </div>
    </div>
  );
}
