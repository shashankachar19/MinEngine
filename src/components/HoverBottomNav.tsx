import { useSimulation } from '../store/SimContext';
import { Terminal, AlertTriangle, ShieldAlert, Cpu, FileText, Loader, Info } from 'lucide-react';

export default function HoverBottomNav() {
  const { state, goToStep, missionStarted, openApprovalModal } = useSimulation();

  if (!missionStarted) return null;

  let text = '';
  let buttonText = '';
  let icon = null;
  let action = () => {};
  let textClass = 'text-stone-900';
  let buttonClass = 'bg-stone-100 hover:bg-stone-200 text-stone-900';
  let explainerText = '';
  let explainerTitle = '';

  switch (state.step) {
    case 0:
      text = 'SYSTEM NOMINAL. ALL SECTORS SECURE.';
      buttonText = '[ CLICK HERE TO START SIMULATION ]';
      icon = <Terminal className="w-5 h-5 text-emerald-700" />;
      buttonClass = 'bg-emerald-600 hover:bg-emerald-700 text-white animate-[pulse_2s_ease-in-out_infinite] ring-4 ring-emerald-500/30 shadow-[0_0_25px_rgba(16,185,129,0.6)]';
      action = () => goToStep(1);
      explainerTitle = 'Phase 1: Hazard Induction';
      explainerText = 'This will simulate a critical slope displacement in Sector 4 to demonstrate the AI\'s real-time detection capabilities.';
      break;
    case 1:
      text = 'CRITICAL ALERT: Slope displacement detected. 17 personnel exposed in Sector 4.';
      buttonText = '[ APPROVE EVACUATION PLAN ]';
      icon = <AlertTriangle className="w-5 h-5 text-red-600" />;
      textClass = 'text-red-700 font-bold';
      buttonClass = 'bg-red-600 hover:bg-red-700 text-white font-black animate-[pulse_2s_ease-in-out_infinite] ring-4 ring-red-500/30 shadow-[0_0_25px_rgba(220,38,38,0.6)]';
      action = () => goToStep(2); 
      explainerTitle = 'Phase 2: AI Response';
      explainerText = 'The AI has formulated a containment strategy. Clicking this authorizes the deployment of Ambulance 1 via Route Alpha-4.';
      break;
    case 2:
      text = 'EVACUATION IN PROGRESS. Ambulance 1 and Rescue Team 1 deployed via Alpha-4.';
      buttonText = '[ SIMULATE VEHICLE CRASH ]';
      icon = <ShieldAlert className="w-5 h-5 text-orange-600" />;
      textClass = 'text-orange-700 font-bold';
      buttonClass = 'bg-orange-600 hover:bg-orange-700 text-white font-black animate-[pulse_2s_ease-in-out_infinite] ring-4 ring-orange-500/30 shadow-[0_0_25px_rgba(234,88,12,0.6)]';
      action = () => goToStep(3);
      explainerTitle = 'Phase 3: Cascading Failure';
      explainerText = 'Inject a secondary crisis (a crashed haul truck) to block the primary evacuation route and test the system\'s resilience.';
      break;
    case 3:
      text = 'MULTIPLE FAILURES DETECTED. Route Alpha-4 blocked. Initial plan invalidated.';
      buttonText = '[ INITIATE DYNAMIC REPLANNING ]';
      icon = <Cpu className="w-5 h-5 text-red-600" />;
      textClass = 'text-red-700 font-bold';
      buttonClass = 'bg-red-600 hover:bg-red-700 text-white font-black animate-[pulse_2s_ease-in-out_infinite] ring-4 ring-red-500/30 shadow-[0_0_25px_rgba(220,38,38,0.6)]';
      action = () => openApprovalModal();
      explainerTitle = 'Phase 4: Dynamic Re-routing';
      explainerText = 'The AI will recalculate the safest extraction path in real-time and redirect Ambulance 2 via the Bravo-2 ramp.';
      break;
    case 4:
      text = 'REPLAN SUCCESSFUL. Ambulance 2 routed via Bravo-2 Ramp.';
      buttonText = '[ MISSION COMPLETE ]';
      icon = <FileText className="w-5 h-5 text-emerald-700" />;
      textClass = 'text-emerald-800 font-bold';
      buttonClass = 'bg-stone-50 text-emerald-600 cursor-default opacity-50';
      action = () => {};
      explainerTitle = '';
      explainerText = '';
      break;
  }

  return (
    <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between gap-6 px-6 py-4 rounded-[2rem] border border-white/20 backdrop-blur-xl bg-white/95 shadow-[0_20px_50px_rgba(8,112,184,0.1)] hover:shadow-[0_24px_60px_rgba(8,112,184,0.15)] transition-all duration-500 w-[90%] max-w-4xl hover:-translate-y-2`}>
      <div className="flex items-center gap-4 flex-1">
        <div className="shrink-0 p-3 rounded-[1.25rem] bg-stone-50 shadow-sm">{icon}</div>
        <div className={`font-sans text-sm tracking-wide ${textClass}`}>
          {state.isProcessing ? (state.processingMessage || 'AI Processing...') : text}
        </div>
      </div>
      
      {state.isProcessing ? (
        <div className="shrink-0 px-6 py-3 flex items-center justify-center">
          <Loader className="w-6 h-6 text-emerald-600 animate-spin" />
        </div>
      ) : (
        <div className="relative group">
          <button
            onClick={action}
            className={`shrink-0 px-8 py-4 rounded-[1.25rem] font-mono text-[11px] tracking-widest font-black uppercase transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:translate-y-[2px] active:shadow-md ${buttonClass}`}
          >
            {buttonText}
          </button>
          
          {/* Explainer Hover Popup */}
          {explainerTitle && (
            <div className="absolute bottom-full right-0 mb-6 w-80 bg-white/95 backdrop-blur-2xl p-6 rounded-[2rem] shadow-[0_30px_60px_rgba(0,0,0,0.15)] border border-white/60 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-4 group-hover:translate-y-0 cursor-default pointer-events-none font-sans z-[100]">
              <div className="absolute -bottom-3 right-10 w-6 h-6 bg-white/95 border-b border-r border-white/60 rotate-45" />
              <div className="relative z-10 flex items-start gap-4">
                <div className="shrink-0 w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">
                  <Info className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <h4 className="text-[11px] font-black tracking-widest uppercase text-stone-900 mb-2">{explainerTitle}</h4>
                  <p className="text-xs text-stone-600 font-medium leading-relaxed">{explainerText}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
