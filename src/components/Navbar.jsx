import { Shield, Bell, User, Search, Info } from "lucide-react";
const tabs = [["dashboard", "Dashboard"], ["paths", "Attack Paths"], ["events", "Events"]];
export default function Navbar({ view, setView, query, setQuery, onAbout }) {
  return (
    <header className="navbar">
      <div className="brand"><Shield size={20} color="#38bdf8" /> B2CSM Security Dashboard</div>
      <nav>
        {tabs.map(([k, l]) => (
          <button key={k} className={view === k ? "tab active" : "tab"} onClick={() => setView(k)}>{l}</button>
        ))}
      </nav>
      <div className="search">
        <Search size={14} />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search IP, server, or event..." />
      </div>
      <div className="nav-icons">
        <button className="icon-btn" onClick={onAbout} title="About / Research Context"><Info size={18} /></button>
        <Bell size={18} /><User size={18} />
      </div>
    </header>
  );
}
