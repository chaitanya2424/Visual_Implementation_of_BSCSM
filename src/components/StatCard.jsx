export default function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div className="card stat" style={{ borderTop: `2px solid ${color}` }}>
      <div className="stat-icon" style={{ color, background: color + "22" }}><Icon size={20} /></div>
      <div><div className="stat-value">{value}</div><div className="muted">{label}</div></div>
    </div>
  );
}
