// All data is SIMULATED and fictional. Not real threat intelligence.
export const nodes = [
  { id: "attacker-1", type: "attacker", position: { x: 0, y: 160 },
    data: { label: "185.22.31.4", name: "External Attacker", kind: "External Host", status: "Malicious", risk: "Critical", detected: "10:00" } },
  { id: "web-1", type: "compromised", position: { x: 260, y: 160 },
    data: { label: "10.0.0.5", name: "Web Server", kind: "DMZ Web Server", status: "Compromised", risk: "High", detected: "10:05" } },
  { id: "app-1", type: "compromised", position: { x: 520, y: 160 },
    data: { label: "10.0.0.14", name: "Application Server", kind: "Application Server", status: "Compromised", risk: "High", detected: "10:10" } },
  { id: "int-1", type: "compromised", position: { x: 780, y: 160 },
    data: { label: "10.0.0.23", name: "Internal Server", kind: "Internal Server", status: "Compromised", risk: "High", detected: "10:12" } },
  { id: "db-1", type: "critical", position: { x: 1040, y: 160 },
    data: { label: "10.0.0.50", name: "Customer Database", kind: "Database (Critical Asset)", status: "Compromised", risk: "Critical", detected: "10:15" } },
  { id: "ws-1", type: "normal", position: { x: 260, y: 350 },
    data: { label: "10.0.1.31", name: "HR Workstation", kind: "Workstation", status: "Normal", risk: "Low", detected: "-" } },
  { id: "dns-1", type: "normal", position: { x: 520, y: 350 },
    data: { label: "10.0.0.2", name: "Internal DNS", kind: "DNS Server", status: "Normal", risk: "Low", detected: "-" } },
];

export const edges = [
  { id: "e1", source: "attacker-1", target: "web-1", label: "ATTACK" },
  { id: "e2", source: "web-1", target: "app-1", label: "LATERAL MOVEMENT" },
  { id: "e3", source: "app-1", target: "int-1", label: "LATERAL MOVEMENT" },
  { id: "e4", source: "int-1", target: "db-1", label: "ACCESS" },
  { id: "e5", source: "db-1", target: "attacker-1", label: "DATA EXFILTRATION" },
  { id: "e6", source: "web-1", target: "ws-1", label: "ACCESS" },
  { id: "e7", source: "app-1", target: "dns-1", label: "ACCESS" },
];

// Ordered attack path (T-CSM T.1 style: how was the victim compromised?)
export const attackPath = {
  nodes: ["attacker-1", "web-1", "app-1", "int-1", "db-1"],
  edges: ["e1", "e2", "e3", "e4"],
};

export const events = [
  { id: 1, time: "10:00", source: "185.22.31.4", target: "Web Server", event: "Initial Attack", severity: "High", desc: "External attacker detected", node: "attacker-1", edge: null },
  { id: 2, time: "10:02", source: "185.22.31.4", target: "Web Server", event: "Port Scan / Exploit Attempt", severity: "Medium", desc: "Attacker contacted Web Server", node: "web-1", edge: "e1" },
  { id: 3, time: "10:05", source: "185.22.31.4", target: "Web Server", event: "Host Compromised", severity: "High", desc: "Web Server compromised", node: "web-1", edge: "e1" },
  { id: 4, time: "10:08", source: "Web Server", target: "App Server", event: "Lateral Movement", severity: "High", desc: "Lateral movement detected", node: "app-1", edge: "e2" },
  { id: 5, time: "10:10", source: "Web Server", target: "App Server", event: "Host Compromised", severity: "High", desc: "Application Server compromised", node: "app-1", edge: "e2" },
  { id: 6, time: "10:12", source: "App Server", target: "Internal Server", event: "Lateral Movement", severity: "High", desc: "Internal Server reached", node: "int-1", edge: "e3" },
  { id: 7, time: "10:15", source: "Internal Server", target: "Database", event: "Unauthorized Access", severity: "Critical", desc: "Database accessed", node: "db-1", edge: "e4" },
  { id: 8, time: "10:17", source: "Database", target: "185.22.31.4", event: "Data Exfiltration", severity: "Critical", desc: "Sensitive data access detected", node: "db-1", edge: "e5" },
];

export const incidents = [
  { id: "INC-001", attacker: "185.22.31.4", initialTarget: "Web Server", compromised: 3, severity: "CRITICAL", status: "UNDER INVESTIGATION",
    path: "Attacker → Web Server → App Server → Internal Server → Database", affectedAssets: 3, pathSeverity: "High" },
];

export const statistics = { totalAttacks: 8, compromisedNodes: 4, attackPaths: 3, criticalAssets: 2 };
