import { useState, useMemo, useRef, useEffect } from "react";
import { Swords, ShieldAlert, Route, Gem, X } from "lucide-react";
import Navbar from "./components/Navbar.jsx";
import StatCard from "./components/StatCard.jsx";
import AttackGraph from "./components/AttackGraph.jsx";
import NodeDetails from "./components/NodeDetails.jsx";
import AttackTimeline from "./components/AttackTimeline.jsx";
import SecurityEvents from "./components/SecurityEvents.jsx";
import IncidentSummary from "./components/IncidentSummary.jsx";
import { nodes, edges, events, incidents, statistics, attackPath } from "./data/securityData.js";

export default function App() {
  const [view, setView] = useState("dashboard");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const [focus, setFocus] = useState(null); // event clicked in timeline
  const [step, setStep] = useState(0); // 0 = no trace
  const [about, setAbout] = useState(false);
  const timer = useRef(null);
  const total = attackPath.nodes.length;
  const tracing = step > 0 && step < total;
  useEffect(() => () => clearInterval(timer.current), []);

  const trace = () => {
    clearInterval(timer.current); setFocus(null); setStep(1);
    timer.current = setInterval(() => setStep((s) => { if (s >= total) { clearInterval(timer.current); return s; } return s + 1; }), 700);
  };

  const { hlNodes, hlEdges } = useMemo(() => {
    if (step > 0) return { hlNodes: new Set(attackPath.nodes.slice(0, step)), hlEdges: new Set(attackPath.edges.slice(0, step - 1)) };
    if (focus) return { hlNodes: new Set([focus.node]), hlEdges: new Set(focus.edge ? [focus.edge] : []) };
    return { hlNodes: new Set(), hlEdges: new Set() };
  }, [step, focus]);

  const q = query.trim().toLowerCase();
  const searched = events.filter((e) => !q || Object.values(e).join(" ").toLowerCase().includes(q));
  const tableEvents = searched.filter((e) => filter === "All" || e.severity === filter);
  const selNode = nodes.find((n) => n.id === selected);
  const pageHeadings = {
    dashboard: "Incident overview",
    paths: "Attack path investigation",
    events: "Security event log",
  };

  const onTimeline = (e) => { clearInterval(timer.current); setStep(0); setFocus(e); setSelected(e.node); };
  const graph = (
    <AttackGraph nodes={nodes} edges={edges} selected={selected} onSelect={setSelected} hlNodes={hlNodes}
      hlEdges={hlEdges} query={query} onTrace={trace} tracing={tracing} />
  );
  const side = (<><NodeDetails node={selNode} edges={edges} /><IncidentSummary incident={incidents[0]} step={step} total={total - 1} /></>);
  const timeline = <AttackTimeline events={searched} activeId={focus?.id} onSelect={onTimeline} />;
  const table = <SecurityEvents events={tableEvents} filter={filter} setFilter={setFilter} />;

  return (
    <div className="app">
      <Navbar view={view} setView={setView} query={query} setQuery={setQuery} onAbout={() => setAbout(true)} />
      <main>
        <section className="page-heading">
          <div>
            <div className="eyebrow">Security operations <span>/</span> Incident response</div>
            <h1>{pageHeadings[view]}</h1>
            <p>INC-001 <span className="heading-separator">/</span> External attacker <span className="heading-separator">/</span> Customer database</p>
          </div>
          <div className="incident-flags">
            <span className="simulation-flag"><i /> Simulated data</span>
            <span className="badge Critical">Critical</span>
          </div>
        </section>
        {view === "dashboard" && (
          <>
            <div className="stats">
              <StatCard icon={Swords} label="Total Attacks" value={statistics.totalAttacks} color="#ef4444" />
              <StatCard icon={ShieldAlert} label="Compromised Nodes" value={statistics.compromisedNodes} color="#f97316" />
              <StatCard icon={Route} label="Attack Paths" value={statistics.attackPaths} color="#38bdf8" />
              <StatCard icon={Gem} label="Critical Assets" value={statistics.criticalAssets} color="#a855f7" />
            </div>
            <div className="grid-main"><div>{graph}</div><div className="col">{side}</div></div>
            <div className="grid-2">{timeline}{table}</div>
            <FutureScope />
          </>
        )}
        {view === "paths" && <div className="grid-main"><div>{graph}{timeline}</div><div className="col">{side}</div></div>}
        {view === "events" && <div className="grid-2">{timeline}{table}</div>}
      </main>
      {about && <AboutModal onClose={() => setAbout(false)} />}
    </div>
  );
}

function FutureScope() {
  const items = ["Hyperledger Fabric", "IPFS", "Real cybersecurity logs", "ML-based anomaly detection", "Real-time threat intelligence", "Automated CSM functions (N-CSM, T-CSM, A-CSM)"];
  return (
    <div className="card"><div className="card-title">Future Integration</div>
      <div className="chips">{items.map((i) => <span className="chip" key={i}>{i}</span>)}</div></div>
  );
}

function AboutModal({ onClose }) {
  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal card" onClick={(e) => e.stopPropagation()}>
        <div className="card-title"><span>About / Research Context</span><button className="icon-btn" onClick={onClose}><X size={16} /></button></div>
        <p>This project is a visualization-oriented extension inspired by the B2CSM research framework. The original work proposes blockchain-based Cyber Security Management and identifies cybersecurity visualization as a future direction.</p>
        <p>Unlike the complete B2CSM architecture, this prototype focuses only on visualization and uses simulated cybersecurity data. It does not implement Hyperledger Fabric, IPFS, smart contracts or ML, and the data shown is fictional, not real threat intelligence.</p>
        <p className="muted">The attack-path view corresponds to the paper's T-CSM T.1 idea: identifying the path through which an internal victim was compromised.</p>
      </div>
    </div>
  );
}
