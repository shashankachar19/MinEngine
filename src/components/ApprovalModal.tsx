import { useSimulation } from '../store/SimContext';
import { AlertTriangle, ArrowRight, ShieldAlert } from 'lucide-react';

export default function ApprovalModal() {
  const { state, approveAndResolve, closeApprovalModal } = useSimulation();

  if (!state.showApprovalModal) return null;

  return (
    <div className="absolute top-1/2 left-[35%] -translate-x-1/2 -translate-y-1/2 z-[100] w-[450px]">
      <div className="bg-white border-2 border-stone-800 shadow-[12px_12px_0_rgba(28,25,23,0.15)] font-sans text-stone-900">
        
        {/* Header */}
        <div className="bg-[#F4F1EA] px-6 py-5 border-b-2 border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <ShieldAlert className="w-6 h-6 text-red-700" />
            <h2 className="text-base font-black tracking-tight uppercase">Action Required</h2>
          </div>
          <button onClick={closeApprovalModal} className="text-stone-500 hover:text-stone-900 font-bold p-2 transition-colors">✕</button>
        </div>

        {/* Content */}
        <div className="p-6 bg-white">
          <div className="border-2 border-red-600 bg-red-50 p-5 mb-2">
            <h3 className="text-sm font-black text-red-700 uppercase tracking-tight mb-3">Dynamic Replan Triggered</h3>
            <p className="text-xs text-stone-700 font-mono leading-relaxed">
              Route Alpha-4 is blocked. AI proposes re-routing all assets via Bravo-2. 
              Requires Human-in-the-Loop authorization.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#F4F1EA] px-6 py-5 border-t-2 border-stone-800">
          <button
            onClick={() => {
              closeApprovalModal();
              approveAndResolve();
            }}
            className="w-full py-4 bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs tracking-widest uppercase flex items-center justify-center gap-3 border-2 border-stone-900 shadow-[4px_4px_0_rgba(28,25,23,0.1)] active:translate-y-[2px] active:shadow-none transition-all"
          >
            [ AUTHORIZE OVERRIDE ]
            <ArrowRight className="w-5 h-5 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
