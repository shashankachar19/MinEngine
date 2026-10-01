import { useSimulation } from '../store/SimContext';
import { ShieldAlert, Play, X } from 'lucide-react';

export default function ScenarioExplainer() {
  const { pendingStep, executePendingStep, setPendingStep } = useSimulation();

  if (pendingStep === null) return null;

  let title = '';
  let description = '';
  let aiAction = '';

  switch (pendingStep) {
    case 1:
      title = 'Phase 1: Hazard Detected';
      description = '17 workers exposed to sudden slope movement in Sector 4.';
      aiAction = 'Calculating evacuation routes...';
      break;
    case 2:
      title = 'Phase 2: Emergency Response';
      description = 'Locking down Sector 4. Route Alpha-4 identified as safe path.';
      aiAction = 'Deploying Ambulance 1...';
      break;
    case 3:
      title = 'Phase 3: Escalation / Crash';
      description = 'Cascading failure. Haul Truck 1 crashed, blocking Route Alpha-4.';
      aiAction = 'Engaging dynamic replanning...';
      break;
    case 4:
      title = 'Phase 4: Replanning';
      description = 'Primary extraction route compromised. Time is critical.';
      aiAction = 'Routing backup Ambulance 2 via Bravo-2 Ramp...';
      break;
    default:
      return null;
  }

  return (
    <div className="absolute top-24 right-6 w-80 z-[100] bg-white/95 backdrop-blur-2xl shadow-[0_30px_60px_rgba(0,0,0,0.12)] border border-white/60 rounded-[2rem] p-6 animate-in zoom-in-95 slide-in-from-right-8 fade-in duration-500 font-sans group">
      
      {/* Top Right Close Button */}
      <button 
        onClick={() => setPendingStep(null)}
        className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-800 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
      >
        <X className="w-4 h-4" strokeWidth={3} />
      </button>

      {/* Header Row */}
      <div className="flex items-center gap-4 mb-5">
        <div className="shrink-0 w-10 h-10 bg-red-50 rounded-2xl flex items-center justify-center shadow-inner">
          <ShieldAlert className="w-5 h-5 text-red-600 animate-pulse" strokeWidth={2.5} />
        </div>
        <h2 className="text-sm font-black tracking-tight text-stone-900 uppercase leading-snug pr-6">
          {title}
        </h2>
      </div>
      
      {/* Description */}
      <p className="text-xs text-stone-600 font-medium leading-relaxed mb-6">
        {description}
      </p>
      
      {/* AI Action Box */}
      <div className="bg-[#F8F9FA] p-4 rounded-[1.25rem] mb-6 shadow-inner border border-stone-100">
        <span className="text-[9px] font-bold text-emerald-700 tracking-widest uppercase mb-1.5 block flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
          AI Engine Processing
        </span>
        <p className="text-[11px] text-stone-700 font-mono font-medium leading-relaxed">
          {aiAction}
        </p>
      </div>

      {/* Trigger Button */}
      <button
        onClick={executePendingStep}
        className="w-full py-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-[1.25rem] font-mono text-[10px] font-black tracking-widest uppercase transition-all flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(4,120,87,0.3)] hover:shadow-[0_12px_25px_rgba(4,120,87,0.4)] hover:-translate-y-1 active:translate-y-[2px] active:shadow-none"
      >
        <Play className="w-4 h-4" />
        [ AUTHORIZE ACTION ]
      </button>

    </div>
  );
}
