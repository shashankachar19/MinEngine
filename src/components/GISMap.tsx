import { useEffect, useRef, useState } from 'react';
import { useSimulation } from '../store/SimContext';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// ── Geo-coordinates for the mining site (Sandur Belt, Bellary) ──
const MINE_CENTER: [number, number] = [15.085, 76.55];

const SECTOR_1: [number, number] = [15.098, 76.535];
const SECTOR_4: [number, number] = [15.083, 76.545];

const MEDICAL_DEPOT: [number, number] = [15.095, 76.562];
const HAUL_TRUCK_POS: [number, number] = [15.078, 76.550];
const CRASH_POINT: [number, number] = [15.087, 76.554];

// Route Alpha-4: Medical Depot → Sector 4 (direct road)
const ROUTE_ALPHA: [number, number][] = [
  MEDICAL_DEPOT,
  [15.091, 76.557],
  CRASH_POINT,
  [15.085, 76.550],
  SECTOR_4,
];

// Route Bravo-2: Alternate western bypass (Medical Depot → west → south → Sector 4)
const ROUTE_BRAVO: [number, number][] = [
  MEDICAL_DEPOT,
  [15.097, 76.555],
  [15.096, 76.547],
  [15.092, 76.540],
  [15.087, 76.538],
  [15.083, 76.540],
  SECTOR_4,
];

// Helper: Interpolate route for smooth animation
function interpolateRoute(route: [number, number][], stepsPerSegment = 30): [number, number][] {
  const points: [number, number][] = [];
  for (let i = 0; i < route.length - 1; i++) {
    const start = route[i];
    const end = route[i + 1];
    for (let j = 0; j <= stepsPerSegment; j++) {
      const t = j / stepsPerSegment;
      points.push([
        start[0] + (end[0] - start[0]) * t,
        start[1] + (end[1] - start[1]) * t
      ]);
    }
  }
  return points;
}

function createIcon(html: string, size: [number, number] = [44, 44]) {
  return L.divIcon({
    html,
    className: 'custom-marker',
    iconSize: size,
    iconAnchor: [size[0] / 2, size[1] / 2],
  });
}

const tooltipOpts: L.TooltipOptions = {
  direction: 'top',
  offset: [0, -28],
  className: 'custom-tooltip',
  permanent: false,
};

// Helper: format time offset from now
function timeAgo(minutesAgo: number): string {
  const d = new Date(Date.now() - minutesAgo * 60000);
  return d.toLocaleTimeString('en-GB', { hour12: false });
}

function SlopeDisplacementPanel() {
  const [, setTick] = useState(0);
  useEffect(() => {
    const iv = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(iv);
  }, []);

  const readings = [
    { offset: 6, value: '2 mm', pct: '15%', color: 'bg-emerald-400', textColor: 'text-emerald-600' },
    { offset: 4, value: '4 mm', pct: '30%', color: 'bg-yellow-400', textColor: 'text-yellow-600' },
    { offset: 2, value: '7 mm', pct: '55%', color: 'bg-orange-400', textColor: 'text-orange-600' },
    { offset: 0, value: '12 mm', pct: '85%', color: 'bg-red-500 animate-pulse', textColor: 'text-red-600' },
  ];

  return (
    <div className="absolute bottom-20 left-4 w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.18)] border border-stone-200 z-[1000] pointer-events-none animate-in slide-in-from-left-4 fade-in duration-700 overflow-hidden">
      <div className="px-5 py-3 bg-red-50 border-b border-red-100 flex items-center justify-between">
        <span className="text-xs font-black tracking-widest text-red-700 uppercase">📡 Slope Displacement</span>
        <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
      </div>
      <div className="px-5 py-4 font-sans">
        <div className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-3">GEO-SENSOR 402 — Live Feed</div>
        <div className="space-y-2.5">
          {readings.map((r, i) => (
            <div key={i} className="flex items-center justify-between">
              <span className="text-sm font-mono font-bold text-stone-500">{timeAgo(r.offset)}</span>
              <div className="flex items-center gap-2">
                <div className="w-16 bg-stone-100 rounded-full h-2"><div className={`${r.color} h-2 rounded-full`} style={{width: r.pct}} /></div>
                <span className={`text-sm font-black ${r.textColor} w-14 text-right`}>{r.value}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-3 border-t border-stone-100 text-xs font-bold text-red-600 uppercase tracking-wider flex items-center gap-2">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          Threshold exceeded — Evacuation triggered
        </div>
      </div>
    </div>
  );
}

export default function GISMap() {
  const { state } = useSimulation();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const layerGroupRef = useRef<L.LayerGroup | null>(null);
  const routeLayerRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (mapRef.current && !mapInstance.current) {
      const map = L.map(mapRef.current, {
        center: MINE_CENTER,
        zoom: 14,
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: true,
        dragging: true,
      });

      // Classic OSM map (inverted in CSS to dark theme)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
      }).addTo(map);

      L.control.zoom({ position: 'bottomleft' }).addTo(map);

      layerGroupRef.current = L.layerGroup().addTo(map);
      routeLayerRef.current = L.layerGroup().addTo(map);

      mapInstance.current = map;
    }
  }, []);

  useEffect(() => {
    const layers = layerGroupRef.current;
    const routeLayers = routeLayerRef.current;
    if (!layers || !routeLayers) return;

    layers.clearLayers();
    routeLayers.clearLayers();

    // ── Route Alpha-4 ──
    const alphaColor = state.step >= 3 ? '#ef4444' : '#3b82f6';
    L.polyline(ROUTE_ALPHA, { color: '#e5e7eb', weight: 14, opacity: 0.8, lineCap: 'round' }).addTo(routeLayers);
    L.polyline(ROUTE_ALPHA, { color: alphaColor, weight: 6, opacity: 0.9, lineCap: 'round', dashArray: state.step >= 3 ? '10 10' : '' }).addTo(routeLayers);

    const alphaLabel = state.step >= 3 ? 'ALPHA-4 (BLOCKED)' : 'ALPHA-4 (MAIN)';
    const alphaLabelColor = state.step >= 3 ? '#dc2626' : '#1d4ed8';
    const alphaLabelBg = state.step >= 3 ? '#fee2e2' : '#eff6ff';
    L.marker([15.089, 76.555], {
      icon: L.divIcon({
        html: `<div style="background:${alphaLabelBg};color:${alphaLabelColor};border:2px solid ${alphaColor};padding:6px 16px;border-radius:20px;font-size:13px;font-weight:900;letter-spacing:0.8px;white-space:nowrap;font-family:monospace;box-shadow:0 4px 15px rgba(0,0,0,0.12)">${alphaLabel}</div>`,
        className: 'custom-marker',
        iconSize: [180, 34],
        iconAnchor: [90, 17],
      })
    }).addTo(routeLayers);

    // ── Route Bravo-2 (alternate bypass — appears at step 4) ──
    if (state.step >= 4) {
      L.polyline(ROUTE_BRAVO, { color: '#e5e7eb', weight: 14, opacity: 0.8, lineCap: 'round' }).addTo(routeLayers);
      L.polyline(ROUTE_BRAVO, { className: 'animated-route', color: '#10b981', weight: 6, opacity: 1, lineCap: 'round', dashArray: '15 15' }).addTo(routeLayers);

      L.marker([15.092, 76.541], {
        icon: L.divIcon({
          html: `<div style="background:#ecfdf5;color:#047857;border:2px solid #10b981;padding:6px 16px;border-radius:20px;font-size:13px;font-weight:900;letter-spacing:0.8px;white-space:nowrap;font-family:monospace;box-shadow:0 4px 15px rgba(0,0,0,0.12)">BRAVO-2 (SAFE BYPASS)</div>`,
          className: 'custom-marker',
          iconSize: [210, 34],
          iconAnchor: [105, 17],
        })
      }).addTo(routeLayers);
    }

    // ── Sector 1 (HOVER) ──
    const s1Icon = createIcon(`
      <div style="width:44px;height:44px;border-radius:50%;background:white;border:3px solid #10b981;display:flex;align-items:center;justify-content:center;box-shadow:0 6px 20px rgba(0,0,0,0.15);cursor:pointer">
        <span style="color:#10b981;font-size:22px;line-height:1">●</span>
      </div>
    `);
    L.marker(SECTOR_1, { icon: s1Icon })
      .addTo(layers)
      .bindTooltip(`
        <div style="font-family:'Outfit',sans-serif;min-width:240px">
          <div style="font-size:14px;font-weight:900;color:#78716c;text-transform:uppercase;letter-spacing:2px;border-bottom:1px solid #e7e5e4;padding-bottom:10px;margin-bottom:14px">Sector 1 — Active Zone</div>
          <div style="display:flex;flex-direction:column;gap:12px">
            <div style="font-size:16px;font-weight:600;color:#44403c">⛏️ Drill Rig Alpha</div>
            <div style="font-size:16px;font-weight:600;color:#44403c">⛏️ Drill Rig Beta</div>
            <div style="font-size:16px;font-weight:600;color:#44403c">👷 12 Workers Active</div>
          </div>
        </div>
      `, { ...tooltipOpts });

    // ── Sector 4 (Hazard — HOVER) ──
    const isHazard = state.step >= 1;
    const s4Html = isHazard
      ? `<div style="width:50px;height:50px;border-radius:50%;background:#fef2f2;border:3px solid #ef4444;display:flex;align-items:center;justify-content:center;box-shadow:0 0 30px rgba(239,68,68,0.5);cursor:pointer;animation:pulse 2s infinite">
           <span style="font-size:22px">⚠️</span>
         </div>`
      : `<div style="width:44px;height:44px;border-radius:50%;background:white;border:3px solid #a8a29e;display:flex;align-items:center;justify-content:center;box-shadow:0 6px 20px rgba(0,0,0,0.12);cursor:pointer">
           <span style="font-size:18px;color:#78716c">📍</span>
         </div>`;
    
    const s4Tooltip = isHazard
      ? `<div style="font-family:'Outfit',sans-serif;min-width:280px">
          <div style="font-size:14px;font-weight:900;color:#b91c1c;text-transform:uppercase;letter-spacing:2px;border-bottom:2px solid #fecaca;padding-bottom:10px;margin-bottom:14px">⚠️ Sector 4 — HAZARD ZONE</div>
          <div style="display:flex;flex-direction:column;gap:12px">
            <div style="font-size:16px;font-weight:600;color:#991b1b">🔴 GEO-SENSOR 402 — Slope Alert</div>
            <div style="font-size:16px;font-weight:600;color:#991b1b">👷 17 Workers Exposed</div>
            <div style="font-size:15px;color:#dc2626;margin-top:4px;font-weight:500">Immediate evacuation recommended.</div>
          </div>
        </div>`
      : `<div style="font-family:'Outfit',sans-serif;min-width:240px">
          <div style="font-size:14px;font-weight:900;color:#78716c;text-transform:uppercase;letter-spacing:2px;border-bottom:1px solid #e7e5e4;padding-bottom:10px;margin-bottom:14px">Sector 4 — Zone B3</div>
          <div style="display:flex;flex-direction:column;gap:12px">
            <div style="font-size:16px;font-weight:600;color:#44403c">📡 GEO-SENSOR 402</div>
            <div style="font-size:16px;font-weight:600;color:#44403c">👷 17 Workers Present</div>
          </div>
        </div>`;

    L.marker(SECTOR_4, { icon: createIcon(s4Html, [50, 50]) })
      .addTo(layers)
      .bindTooltip(s4Tooltip, { ...tooltipOpts });

    // ── Haul Truck / Crash ──
    if (state.step >= 3) {
      const crashIcon = createIcon(`
        <div class="animate-crash-pulse" style="width:58px;height:58px;border-radius:50%;background:white;border:4px solid #dc2626;display:flex;align-items:center;justify-content:center;box-shadow:0 0 30px rgba(220,38,38,0.7);cursor:pointer;position:relative">
          <div style="position:absolute;inset:0;border-radius:50%;background:#ef4444;animation:ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;opacity:0.5"></div>
          <span style="font-size:26px;position:relative;z-index:10;animation:shake 0.5s">💥</span>
        </div>
      `, [58, 58]);
      L.marker(CRASH_POINT, { icon: crashIcon })
        .addTo(layers)
        .bindTooltip(`
          <div style="font-family:'Outfit',sans-serif;min-width:260px">
            <div style="font-size:14px;font-weight:900;color:#dc2626;text-transform:uppercase;letter-spacing:2px;margin-bottom:10px">🚧 Crash Site</div>
            <div style="font-size:16px;font-weight:600;color:#991b1b">Haul Truck — 150t Payload</div>
            <div style="font-size:15px;color:#b91c1c;margin-top:8px">Engine failure. Route Alpha-4 blocked.</div>
          </div>
        `, { ...tooltipOpts });
    } else {
      const truckIcon = createIcon(`
        <div style="width:44px;height:44px;border-radius:50%;background:white;border:2px solid #d6d3d1;display:flex;align-items:center;justify-content:center;box-shadow:0 6px 20px rgba(0,0,0,0.12);cursor:pointer">
          <span style="font-size:20px">🚛</span>
        </div>
      `);
      L.marker(HAUL_TRUCK_POS, { icon: truckIcon })
        .addTo(layers)
        .bindTooltip(`
          <div style="font-family:'Outfit',sans-serif;min-width:220px">
            <div style="font-size:14px;font-weight:900;color:#44403c;text-transform:uppercase;letter-spacing:2px;margin-bottom:10px">🚛 Haul Truck 1</div>
            <div style="font-size:16px;font-weight:600;color:#57534e">Transporting Iron Ore — 150t</div>
          </div>
        `, { ...tooltipOpts });
    }

    // ── Ambulance 1 ──
    const amb1Border = state.step >= 3 ? '#ef4444' : state.step === 2 ? '#3b82f6' : '#a8a29e';
    const amb1Shadow = state.step >= 3 ? 'rgba(239,68,68,0.4)' : state.step === 2 ? 'rgba(59,130,246,0.4)' : 'rgba(0,0,0,0.1)';
    const amb1Opacity = state.step >= 3 ? 'opacity:0.6;filter:grayscale(0.5);' : '';
    const amb1Icon = createIcon(`
      <div style="width:44px;height:44px;border-radius:50%;background:white;border:3px solid ${amb1Border};display:flex;align-items:center;justify-content:center;box-shadow:0 6px 20px ${amb1Shadow};cursor:pointer;${amb1Opacity}">
        <span style="font-size:20px">🚑</span>
      </div>
    `);
    
    // Ambulance 1 drives to crash point in step 2
    const amb1Marker = L.marker(MEDICAL_DEPOT, { icon: amb1Icon }).addTo(layers);
    
    if (state.step === 2) {
      const interpolatedAlpha = interpolateRoute(ROUTE_ALPHA.slice(0, 3), 30);
      let idx = 0;
      const iv = setInterval(() => {
        if (idx < interpolatedAlpha.length) {
          amb1Marker.setLatLng(interpolatedAlpha[idx]);
          idx++;
        } else {
          clearInterval(iv);
        }
      }, 30);
    } else if (state.step >= 3) {
      amb1Marker.setLatLng(CRASH_POINT);
    }

    const amb1Status = state.step >= 3 ? 'Blocked by crash debris on Alpha-4' : state.step === 2 ? 'En route to Sector 4 via Alpha-4' : 'Standby at Medical Depot';
    const amb1Color = state.step >= 3 ? '#dc2626' : state.step === 2 ? '#1d4ed8' : '#57534e';
    amb1Marker.bindTooltip(`
        <div style="font-family:'Outfit',sans-serif;min-width:260px">
          <div style="font-size:14px;font-weight:900;color:${amb1Color};text-transform:uppercase;letter-spacing:2px;margin-bottom:10px">🚑 Ambulance 1</div>
          <div style="font-size:16px;font-weight:600;color:${amb1Color}">${amb1Status}</div>
        </div>
      `, { ...tooltipOpts });

    // ── Ambulance 2 ──
    const amb2Border = state.step >= 4 ? '#10b981' : '#a8a29e';
    const amb2Shadow = state.step >= 4 ? 'rgba(16,185,129,0.4)' : 'rgba(0,0,0,0.1)';
    const amb2Icon = createIcon(`
      <div style="width:44px;height:44px;border-radius:50%;background:white;border:3px solid ${amb2Border};display:flex;align-items:center;justify-content:center;box-shadow:0 6px 20px ${amb2Shadow};cursor:pointer">
        <span style="font-size:20px">🚑</span>
      </div>
    `);
    
    const amb2Marker = L.marker(MEDICAL_DEPOT, { icon: amb2Icon }).addTo(layers);
    
    // Ambulance 2 drives to Sector 4 in step 4
    if (state.step >= 4) {
      const interpolatedBravo = interpolateRoute(ROUTE_BRAVO, 30);
      let idx2 = 0;
      const iv2 = setInterval(() => {
        if (idx2 < interpolatedBravo.length) {
          amb2Marker.setLatLng(interpolatedBravo[idx2]);
          idx2++;
        } else {
          clearInterval(iv2);
        }
      }, 20); // Smooth drive animation
    }

    const amb2Status = state.step >= 4 ? 'Arrived at Sector 4 — Rescuing workers' : 'Standby at Medical Depot';
    const amb2Color = state.step >= 4 ? '#047857' : '#57534e';
    amb2Marker.bindTooltip(`
        <div style="font-family:'Outfit',sans-serif;min-width:260px">
          <div style="font-size:14px;font-weight:900;color:${amb2Color};text-transform:uppercase;letter-spacing:2px;margin-bottom:10px">🚑 Ambulance 2</div>
          <div style="font-size:16px;font-weight:600;color:${amb2Color}">${amb2Status}</div>
        </div>
      `, { ...tooltipOpts });

    // ── Medical Depot ──
    const depotIcon = createIcon(`
      <div style="width:42px;height:42px;border-radius:50%;background:white;border:2px solid #6366f1;display:flex;align-items:center;justify-content:center;box-shadow:0 6px 20px rgba(0,0,0,0.12);cursor:pointer">
        <span style="font-size:18px">🏥</span>
      </div>
    `, [42, 42]);
    L.marker(MEDICAL_DEPOT, { icon: depotIcon })
      .addTo(layers)
      .bindTooltip(`
        <div style="font-family:'Outfit',sans-serif;min-width:200px">
          <div style="font-size:14px;font-weight:900;color:#4f46e5;text-transform:uppercase;letter-spacing:2px;margin-bottom:10px">🏥 Medical HQ</div>
          <div style="font-size:16px;font-weight:600;color:#57534e">Central dispatch for all emergency vehicles</div>
        </div>
      `, { ...tooltipOpts });

  }, [state.step]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden font-mono text-stone-900 bg-stone-200">
      
      {/* Leaflet Map */}
      <div ref={mapRef} className="absolute inset-0 w-full h-full z-0 rounded-2xl" />
      
      {/* Top Overlays */}
      <div className="absolute top-4 left-4 text-xs font-bold tracking-widest text-stone-700 bg-white/90 px-4 py-2.5 rounded-xl shadow-lg z-[1000] backdrop-blur-sm border border-white/50 pointer-events-none">
        SYS.COORD // 15.0826°N  76.5486°E
      </div>
      <div className="absolute top-4 right-4 text-xs font-bold tracking-widest text-stone-700 bg-white/90 px-4 py-2.5 rounded-xl shadow-lg z-[1000] backdrop-blur-sm border border-white/50 pointer-events-none">
        MINING GRID: SANDUR BELT
      </div>

      {/* ── SLOPE DISPLACEMENT LIVE FEED (appears on step >= 1) ── */}
      {state.step >= 1 && !state.isProcessing && (
        <SlopeDisplacementPanel />
      )}

      {/* Step-based guided tooltips */}
      {state.step === 1 && !state.isProcessing && (
        <div className="absolute top-16 right-4 w-64 bg-white p-5 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.18)] border border-stone-200 animate-in slide-in-from-right-4 fade-in duration-500 z-[1000] pointer-events-none">
          <div className="text-sm text-stone-600 font-sans font-medium leading-relaxed">
            <strong className="text-red-600 block mb-1.5 uppercase tracking-wider text-xs font-black">⚠ Hazard Detected</strong>
            Slope displacement exceeds 12 mm in Sector 4. 17 Workers at risk. Hover the ⚠️ marker for details.
          </div>
        </div>
      )}

      {state.step === 3 && !state.isProcessing && (
        <div className="absolute top-16 right-4 w-64 bg-white p-5 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.18)] border border-stone-200 animate-in slide-in-from-right-4 fade-in duration-500 z-[1000] pointer-events-none">
          <div className="text-sm text-stone-600 font-sans font-medium leading-relaxed">
            <strong className="text-red-600 block mb-1.5 uppercase tracking-wider text-xs font-black">🚧 Route Blocked</strong>
            Ambulance 1 stuck behind crashed haul truck on Alpha-4.
          </div>
        </div>
      )}

      {state.step === 4 && !state.isProcessing && (
        <div className="absolute top-16 right-4 w-64 bg-white p-5 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.18)] border border-stone-200 animate-in slide-in-from-right-4 fade-in duration-500 z-[1000] pointer-events-none">
          <div className="text-sm text-stone-600 font-sans font-medium leading-relaxed">
            <strong className="text-emerald-600 block mb-1.5 uppercase tracking-wider text-xs font-black">✅ Replan Executed</strong>
            Ambulance 2 dispatched via alternate path. Crisis contained.
          </div>
        </div>
      )}

      {/* Embedded CSS for animations */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px) rotate(-5deg); }
          75% { transform: translateX(4px) rotate(5deg); }
        }
        .animate-crash-pulse {
          animation: crash-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        @keyframes crash-in {
          0% { transform: scale(0); }
          50% { transform: scale(1.3); }
          100% { transform: scale(1); }
        }
        .animated-route {
          stroke-dasharray: 20 20;
          animation: dash-flow 1.5s linear infinite;
        }
        @keyframes dash-flow {
          to { stroke-dashoffset: -40; }
        }
      `}</style>
    </div>
  );
}
