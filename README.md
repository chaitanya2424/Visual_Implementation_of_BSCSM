# B2CSM Attack Path Visualization Dashboard
Visualization-only prototype inspired by the future scope of "Blockchain-based automated and robust cyber security management (B2CSM)". All data is simulated.

## Run
    npm install
    npm run dev      # open the printed http://localhost:5173

## Paper mapping
- Attack graph / annotated relationships -> AGTSR-style graph of hosts (nodes) and labelled communications (edges)
- Trace Attack Path -> T-CSM T.1 (attack path of a compromised internal victim)
- Compromised nodes, incident panel -> outputs of N-CSM/T-CSM presented visually
- Timeline + events table -> time-series aspect of AGTSR
- Future Integration -> Fabric, IPFS, real logs, ML, automated CSM

## 5-minute demo
1. (0:30) Open dashboard, explain the 4 stat cards.  2. (0:45) Graph: red attacker, orange compromised, purple critical DB, blue normal; zoom/pan.  3. (0:30) Click Internal Server, read the details.  4. (1:00) Click Trace Attack Path, watch Attacker -> Web -> App -> Internal -> DB light up.  5. (1:00) Click timeline events; matching node/edge highlights.  6. (0:45) Filter table to Critical; search "10.0.0.50".  7. (0:30) Open About (i icon): explain scope and Future Integration.

## Viva Q&A
- Is this blockchain based? No. It is only the visualization layer; the paper's Fabric/IPFS/chaincode parts are future integration.
- Why visualization? The paper names dashboards for CSM results and attack relationships as future work.
- Is the data real? No, fictional mock data in src/data/securityData.js.
- What is an attack path? The ordered chain of hosts an attacker used to reach a victim (T-CSM T.1).
- How does it connect to real B2CSM? Replace securityData.js with data read from chaincode/IPFS via an API.
- Why React Flow? Ready-made zoom, pan, selection and custom nodes/edges.
- Limitations? Static data, no real-time feed, path is predefined rather than computed.
