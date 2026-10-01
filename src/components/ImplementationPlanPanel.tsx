import { useSimulation } from '../store/SimContext';
import { ShieldAlert, Navigation, Clock, Loader, Activity, Wind, Droplet } from 'lucide-react';

export default function ImplementationPlanPanel() {
  const { state, closePlanPanel } = useSimulation();

  if (state.step >= 4) return null;
  if (state.step !== 0 && !state.showPlanPanel) return null;

  return (
    <div className="absolute inset-0 flex flex-col font-sans">
      {/* Header */}
      <div className="flex-none px-6 py-5 flex items-center justify-between bg-white/50 backdrop-blur-md z-10 rounded-t-[2rem]">
        <div className="flex items-center gap-3">
          {state.step === 0 ? (
            <div className="p-2 bg-emerald-50 rounded-xl"><Activity className="w-4 h-4 text-emerald-600" /></div>
          ) : (
            <div className="p-2 bg-orange-50 rounded-xl"><ShieldAlert className="w-4 h-4 text-orange-600" /></div>
          )}
          <h2 className={`text-xs font-black tracking-widest uppercase ${state.step === 0 ? 'text-stone-900' : 'text-stone-900'}`}>
            {state.step === 0 ? 'ENVIRONMENTAL & SEISMIC TELEMETRY' : state.step === 1 ? 'Emergency Plan' : state.step === 2 ? 'Execution Status' : 'Approval Required'}
          </h2>
        </div>
        {state.step !== 0 && <button onClick={closePlanPanel} className="text-stone-400 hover:text-stone-900 transition-colors font-bold">✕</button>}
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-y-auto custom-scrollbar bg-white">
        
        {state.step === 0 && (
          <div className="flex flex-col gap-4 font-mono px-2">
             <div className="p-5 bg-red-50/50 rounded-[1.25rem] shadow-[0_4px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 border border-red-100/50">
                <div className="flex items-center justify-between mb-3">
                   <div className="flex items-center gap-2 text-xs font-bold text-red-700">
                      <Activity className="w-4 h-4 animate-pulse" /> Seismic Activity
                   </div>
                   <span className="text-[10px] text-red-600 font-black tracking-widest animate-pulse bg-red-100 px-2 py-0.5 rounded-full">ELEVATED</span>
                </div>
                <div className="text-xl font-black text-red-800 mb-2">4.2 mm/s</div>
                <div className="w-full h-1.5 bg-red-200 rounded-full overflow-hidden">
                   <div className="h-full bg-red-600 w-[85%] animate-pulse rounded-full" />
                </div>
             </div>

             <div className="p-5 bg-stone-50 rounded-[1.25rem] shadow-[0_4px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 border border-stone-200/50">
                <div className="flex items-center justify-between mb-3">
                   <div className="flex items-center gap-2 text-xs font-bold text-stone-600">
                      <Wind className="w-4 h-4" /> Wind Speed
                   </div>
                   <span className="text-[10px] text-stone-500 font-black tracking-widest bg-stone-200 px-2 py-0.5 rounded-full">NOMINAL</span>
                </div>
                <div className="text-xl font-black text-stone-700 mb-2">14 km/h</div>
                <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
                   <div className="h-full bg-emerald-500 w-[35%] rounded-full" />
                </div>
             </div>

             <div className="p-5 bg-stone-50 rounded-[1.25rem] shadow-[0_4px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 border border-stone-200/50">
                <div className="flex items-center justify-between mb-3">
                   <div className="flex items-center gap-2 text-xs font-bold text-stone-600">
                      <Droplet className="w-4 h-4 text-blue-500" /> Soil Moisture
                   </div>
                   <span className="text-[10px] text-stone-500 font-black tracking-widest bg-stone-200 px-2 py-0.5 rounded-full">SATURATED</span>
                </div>
                <div className="text-xl font-black text-stone-700 mb-2">84%</div>
                <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
                   <div className="h-full bg-blue-500 w-[84%] rounded-full" />
                </div>
             </div>
          </div>
        )}

        {state.step === 1 && (
          <div className="space-y-4 font-mono text-xs animate-in slide-in-from-right fade-in px-2">
            <div className="p-5 bg-white border-l-[6px] border-l-orange-500 rounded-[1.25rem] shadow-[0_4px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1">
              <span className="text-orange-700 font-bold flex items-center gap-2 mb-2 text-sm"><Clock className="w-4 h-4"/> 1. Containment</span>
              <p className="text-stone-600 ml-6">Lock down Sector 4. Activate geo-fence.</p>
            </div>
            <div className="p-5 bg-white border-l-[6px] border-l-emerald-600 rounded-[1.25rem] shadow-[0_4px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1">
              <span className="text-emerald-700 font-bold flex items-center gap-2 mb-2 text-sm"><Navigation className="w-4 h-4"/> 2. Evacuation</span>
              <p className="text-stone-600 ml-6">Evacuate 28 workers via Route Alpha-4.</p>
            </div>
          </div>
        )}

        {state.step === 2 && (
          <div className="flex flex-col items-center justify-center h-full text-stone-600 space-y-4 animate-in zoom-in fade-in">
            <Loader className="w-8 h-8 text-emerald-600 animate-spin" />
            <div className="font-mono text-xs font-black tracking-widest text-center">
              EXECUTING PLAN...<br/>
              <span className="text-emerald-700 mt-2 block">AMBULANCE 1 DEPLOYED</span>
            </div>
          </div>
        )}

        {state.step === 3 && (
          <div className="flex flex-col h-full animate-in slide-in-from-right fade-in">
             <div className="bg-red-50 p-6 rounded-[1.25rem] flex-1 mb-4 shadow-[0_4px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 mx-2">
                <h4 className="text-xs font-black text-red-700 uppercase tracking-widest mb-3">Dynamic Replan Triggered</h4>
                <p className="text-xs text-stone-700 font-mono font-medium leading-relaxed mb-4">
                  Route Alpha-4 is blocked by crashed Haul Truck 1. AI proposes re-routing Ambulance 2 via Route R7 (Bravo-2).
                </p>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
