import { useSimulation } from '../store/SimContext';
import ResourcePanel from './ResourcePanel';
import CommandLog from './CommandLog';
import { AlertTriangle, ShieldCheck, ArrowRight, Activity, Clock, ShieldAlert } from 'lucide-react';

export default function RightSidebar() {
  const { state, nextStep, approveAndResolve } = useSimulation();

  return (
    <div className="h-full w-full flex flex-col bg-white font-sans text-stone-900">
      {/* TOP SECTION: Resource Grid */}
      <div className="flex-[2] min-h-[200px] border-b-2 border-stone-300 overflow-hidden relative">
        <ResourcePanel />
      </div>

      {/* MIDDLE SECTION: Dynamic Injection Area */}
      <div className="flex-[3] min-h-[300px] border-b-2 border-stone-300 overflow-hidden bg-[#F4F1EA] relative">
        <div className="absolute inset-0 p-5 overflow-y-auto custom-scrollbar">
          {/* Default Empty State */}
          {state.step === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-stone-400">
              <Activity className="w-8 h-8 mb-2" />
              <div className="font-mono text-xs font-bold tracking-widest uppercase">Awaiting Injection</div>
            </div>
          )}

          {/* Plan Injection (Step 1) */}
          {state.step === 1 && (
            <div className="animate-in slide-in-from-right duration-500 fade-in">
              <div className="flex items-center gap-3 border-b-2 border-stone-300 pb-3 mb-5">
                <ShieldAlert className="w-6 h-6 text-red-700" />
                <h3 className="text-sm font-black tracking-tight text-stone-900 uppercase">Emergency Plan</h3>
              </div>
              <div className="space-y-4 font-mono text-xs font-medium">
                <div className="p-4 bg-white border-2 border-stone-200 border-l-4 border-l-orange-500 shadow-sm">
                  <span className="text-orange-700 font-bold">1. Containment</span>
                  <p className="text-stone-600 mt-1">Lock down Sector 4. Activate geo-fence.</p>
                </div>
                <div className="p-4 bg-white border-2 border-stone-200 border-l-4 border-l-emerald-600 shadow-sm">
                  <span className="text-emerald-700 font-bold">2. Evacuation</span>
                  <p className="text-stone-600 mt-1">Evacuate 28 workers via Route Alpha-4.</p>
                </div>
                <div className="p-4 bg-white border-2 border-stone-200 border-l-4 border-l-cyan-600 shadow-sm">
                  <span className="text-cyan-700 font-bold">3. Assets</span>
                  <p className="text-stone-600 mt-1">Secure Haul Trucks HT-808, HT-809.</p>
                </div>
              </div>
            </div>
          )}

          {/* Replan Approval (Step 3) */}
          {state.step === 3 && (
            <div className="animate-in slide-in-from-right duration-500 fade-in h-full flex flex-col">
              <div className="flex items-center gap-3 border-b-2 border-stone-300 pb-3 mb-5">
                <AlertTriangle className="w-6 h-6 text-red-700 animate-pulse" />
                <h3 className="text-sm font-black tracking-tight text-red-700 uppercase">Approval Required</h3>
              </div>
              <div className="flex-1 bg-red-50 border-2 border-red-600 p-5">
                <h4 className="text-xs font-black text-red-700 uppercase tracking-widest mb-3">Dynamic Replan Triggered</h4>
                <p className="text-xs text-stone-700 font-mono font-medium leading-relaxed mb-6">
                  Route Alpha-4 is blocked. AI proposes re-routing all assets via Route R7 (Bravo-2). 
                  Requires Human-in-the-Loop authorization to execute.
                </p>
                <button
                  onClick={approveAndResolve}
                  className="w-full py-4 bg-emerald-700 hover:bg-emerald-800 text-white border-2 border-emerald-900 font-mono text-xs font-bold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 group shadow-[4px_4px_0_rgba(28,25,23,0.1)] active:translate-y-[2px] active:shadow-none"
                >
                  [ AUTHORIZE ]
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          )}

          {/* Post-Incident Report (Step 4 & 5) */}
          {state.step >= 4 && (
            <div className="animate-in slide-in-from-right duration-500 fade-in">
              <div className="flex items-center gap-3 border-b-2 border-stone-300 pb-3 mb-5">
                <ShieldCheck className="w-6 h-6 text-emerald-700" />
                <h3 className="text-sm font-black tracking-tight text-emerald-700 uppercase">Post-Incident Report</h3>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-emerald-50 border-2 border-emerald-600 p-4 text-center shadow-sm">
                  <div className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest mb-1">Casualties</div>
                  <div className="text-3xl font-mono text-emerald-700 font-black">0</div>
                </div>
                <div className="bg-white border-2 border-stone-300 p-4 text-center shadow-sm">
                  <div className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1">Response Time</div>
                  <div className="text-3xl font-mono text-stone-900 font-black">5.1s</div>
                </div>
              </div>
              <div className="bg-orange-50 border-2 border-orange-300 p-4 shadow-sm">
                <div className="flex items-center gap-2 text-orange-800 mb-1">
                  <Clock className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Manual Alternative</span>
                </div>
                <div className="text-xs font-mono font-bold text-orange-700">Est. 12+ mins (High Fatality Risk)</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* BOTTOM SECTION: Terminal Log */}
      <div className="flex-[3] min-h-[300px] overflow-hidden relative">
        <CommandLog />
      </div>
    </div>
  );
}
