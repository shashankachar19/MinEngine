# minEngine — Round 2 Master Implementation Spec (`prompt.md`)

> **Role:** Principal Frontend Engineer & Interactive 3D/GIS UI Specialist  
> **Target Platform:** Single-Page React + TypeScript + Tailwind CSS Application  
> **Architecture:** 100% Hardcoded, Deterministic, Google Pomelli-Style Storytelling "Hero Demo" (Zero API Dependencies)

---

## 1. Core Tech Stack & Libraries
- **Styling:** Tailwind CSS (Slate/Zinc palette)
- **Icons:** `lucide-react`
- **3D Visuals:** Three.js / `@react-three/fiber` / `@react-three/drei` (or low-latency Canvas 3D)
- **2D GIS Map:** Leaflet / `react-leaflet` OR custom dark-styled Google Maps canvas component
- **Animation:** `framer-motion` (or standard Tailwind CSS transitions)
- **Panel Resizing:** `re-resizable` / `react-resizable` (or CSS flex/grid drag handles)
- **Aesthetics:** Deep dark mode (`bg-slate-950/80`), Pomelli glassmorphism overlay HUD, cyberpunk/industrial command aesthetic.

---

## 2. Mandatory Visual Specifications & Layout

### A. Background & Map Layers
1. **3D Mining Site Background (`Mine3DBackground.tsx`):**
   - Renders behind the HUD as a dynamic, low-poly 3D open-cast mining pit with terrain elevation, terrace cuts, pit floor, and labeled sectors (`Sector 1`, `Sector 4`, `Pit Head`).
   - Orbital ambient camera movement centered on `Sector 1` during normal state.
   - Smooth camera pan/zoom transition to `Sector 4` when an incident is triggered.
2. **2D GIS Tracking Map (`GoogleMap2D.tsx`):**
   - Styled to match a dark Google Maps theme ("Night/Silver").
   - Realistic lat/long coordinate grid (e.g., `12.9716° N, 77.5946° E`).
   - Live vehicle markers with directional icons, labels, and speeds:
     - Haul Trucks: `HT-808`, `HT-809`
     - Ambulances / Responders: `AMB-01`, `ERV-02`
   - Overlays: Pulsing crimsonland hazard perimeter on `Sector 4`, route blockage barrier icon on `Route Alpha-4`, and glowing neon green path for the alternate route (`Bravo-2`).

### B. Navigation & Control Structures
3. **Clean Overhead Header (`Header.tsx`):**
   - **Strict Rule:** REMOVE the 3 status summary boxes above the mission control area.
   - Header contains ONLY: `minEngine` logo, live system digital clock, and a glowing `SITE OPERATIONAL` indicator.
4. **Hover-Activated Bottom Navigation Dock (`HoverBottomNav.tsx`):**
   - Auto-hiding bottom dock containing the step triggers.
   - Default state: Hidden below the screen viewport (only a subtle glowing top border line is visible).
   - Hover behavior: Slides up smoothly on cursor hover (`hover:translate-y-0 duration-300`) to reveal:
     - **Step 1:** `⚠️ Inject Landslide Incident`
     - **Step 2:** `💥 Trigger Truck Crash (Escalation)`
     - **Step 3:** `⚡ Reset Demo`
5. **Resizable Command Panels (`ResizablePanels.tsx`):**
   - Drag handles for real-time width/height resizing.
   - **Panel 1:** AI Command Log (`AgentTerminal.tsx`).
   - **Panel 2:** Resource Allocation (`ResourcePanel.tsx` — active assets, personnel counts, equipment status).
6. **Modal UI Rule:**
   - **EVERY** popup modal (`ImplementationPlanPanel`, `ApprovalModal`, `ImpactReportModal`) MUST feature an explicit 'X' close button in the top-right corner (`lucide-react` `X` icon) that dismisses the overlay.

---

## 3. Deterministic State Machine Flow

### State 0: `IDLE`
- **3D Background:** Calm ambient camera rotation over Sector 1.
- **2D Map:** All vehicle markers moving peacefully along default paths.
- **Terminal:** `"[SYSTEM] All systems nominal. Monitoring Sector 1 through Sector 6."`

### State 1: `INCIDENT_SIMULATED` (Triggered via Hover Dock Step 1)
- **Visual:** Sector 4 flashes pulsating red in both 3D & 2D views.
- **Immediate Action:** Auto-open the **Implementation Plan Panel** overlay.
- **Implementation Plan Content:**
  1. Threat Containment & Perimeter Lock (Sector 4)
  2. Primary Personnel Evacuation (Route Alpha-4)
  3. Secondary Asset Safe-Parking Protocol
  4. Emergency Medical Services (`AMB-01`) Standby
  *(Must include top-right 'X' close button)*
- **Terminal Logs (Sequenced delays):**
  - `[0.8s] PERCEPTION:` "IoT Geo-Sensor #G-402 in Sector 4 reports micro-seismic displacement: 4.2mm/s."
  - `[2.0s] RISK_ASSESSMENT:` "Slope stability score dropped to 0.31 (CRITICAL). 28 workers + 4 Haul Trucks inside Danger Radius."
  - `[3.5s] ROUTING:` "Primary Evacuation Corridor Alpha-4 calculated. Distance: 1.2km | ETA: 4m 10s."
  - `[5.0s] RESOURCE:` "Dispatched Emergency Response Vehicle ERV-02 + Automated Sirens active in Sector 4."

### State 2: `SECONDARY_INCIDENT` (Triggered automatically or via Hover Dock Step 2)
- **Visual:** Route Alpha-4 blocked icon appears on 2D map.
- **Implementation Plan Update:** Displays dynamic badge: `"REPLANNING: ROUTE ALPHA-4 BLOCKED -> BYPASSING VIA BRAVO-2"`.
- **Terminal Logs (Sequenced delays):**
  - `[6.5s] PERCEPTION:` "CCTV #12: Haul Truck HT-808 collision on Evacuation Route Alpha-4! Road completely blocked."
  - `[8.0s] ROUTING:` "Plan Invalidated! Re-calculating... Bypass corridor Haul Ramp Bravo-2 verified safe."
  - `[9.5s] RESOURCE:` "Re-routing Ambulance AMB-01 to Haul Ramp Bravo-2. Heavy Crane HC-01 dispatched to clear HT-808."
  - `[11.0s] COMMAND_HITL:` "Dynamic Plan generated. Human approval required to execute site-wide reroute alarm."

### State 3: `AWAITING_HUMAN_APPROVAL`
- **Modal:** Triggers `ApprovalModal.tsx`.
- **Content:** Plan execution details with top-right 'X' close button.
- **Action:** Prominent button `"✅ APPROVE & EXECUTE REPLANNING"`.

### State 4: `CRISIS_RESOLVED` (Triggered on Approval)
- **Visual:** 2D map renders glowing neon green re-route path via Bravo-2.
- **Notification:** Toast `"CRISIS CONTAINED — 0 Casualties Recorded"`.
- **Modal:** Auto-launches `ImpactReportModal.tsx` comparing Manual (12m / $1.2M) vs. minEngine AI (5.1s / $15k) with top-right 'X' close button and Reset option.

---

## 4. Required Component Map
- `src/components/Mine3DBackground.tsx`
- `src/components/GoogleMap2D.tsx`
- `src/components/Header.tsx`
- `src/components/HoverBottomNav.tsx`
- `src/components/ResizablePanels.tsx`
- `src/components/ImplementationPlanPanel.tsx`
- `src/components/ApprovalModal.tsx`
- `src/components/ImpactReportModal.tsx`