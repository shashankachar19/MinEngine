import { ShieldAlert, Cross, Users } from 'lucide-react';
import { useSimulation } from '../store/SimContext';

export default function ResourcePanel() {
  const { state } = useSimulation();

  // Dynamic counts based on step
  const ambAvailable = state.step >= 4 ? 0 : state.step >= 2 ? 1 : 2;
  const ambDeployed = state.step >= 4 ? 2 : state.step >= 2 ? 1 : 0;
  const ambBlocked = state.step === 3 ? 1 : 0;
  const rescueDeployed = state.step >= 2;
  const rescueAvail = rescueDeployed ? 2 : 3;
  
  const ambBadgeColor = state.step === 3 ? 'bg-red-600' : state.step >= 2 ? 'bg-orange-500' : 'bg-emerald-500';
  const ambBg = state.step === 3 ? 'bg-red-50 text-red-600 animate-pulse' : state.step >= 2 ? 'bg-orange-50 text-orange-600' : 'bg-white text-stone-600';

  return (
    <div className="h-full w-full flex flex-col items-center py-4 gap-6 font-sans bg-transparent overflow-y-visible custom-scrollbar">
      
      {/* Fire Engines */}
      <div className="relative group cursor-pointer mt-1">
        <div className="p-3.5 rounded-2xl bg-white text-stone-600 transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.05)] group-hover:shadow-[0_12px_24px_rgba(0,0,0,0.12)] group-hover:-translate-y-1 group-hover:scale-105">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
            <path d="M2 12V7a2 2 0 0 1 2-2h5l2.5 2.5H18a2 2 0 0 1 2 2v4.5"/>
            <path d="M2 12h20"/>
            <path d="M17 12v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5"/>
            <circle cx="7" cy="17" r="2"/>
            <circle cx="15" cy="17" r="2"/>
            <path d="M6 10h4"/>
            <path d="M14 7v3"/>
            <path d="M10 5v2"/>
          </svg>
        </div>
        <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center text-[9px] font-bold text-white shadow-md">
          2
        </div>
        <div className="absolute left-full ml-5 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-xl p-5 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.18)] border border-stone-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 w-56 z-50 translate-x-2 group-hover:translate-x-0">
          <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-4 h-4 bg-white border-l border-b border-stone-200 rotate-45" />
          <div className="relative z-10">
            <span className="text-red-500 text-base block mb-1 font-black">🚒 2 Fire Engines</span>
            <span className="text-[15px] font-medium text-stone-600">Available and stationed on site</span>
          </div>
        </div>
      </div>

      {/* Rescue Team */}
      <div className="relative group cursor-pointer">
        <div className={`p-3.5 rounded-2xl transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.05)] group-hover:shadow-[0_12px_24px_rgba(0,0,0,0.12)] group-hover:-translate-y-1 group-hover:scale-105 ${rescueDeployed ? 'bg-blue-50 text-blue-600' : 'bg-white text-stone-600'}`}>
          <ShieldAlert className="w-[22px] h-[22px] text-blue-500" />
        </div>
        <div className={`absolute -top-2 -right-2 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center text-[9px] font-bold text-white shadow-md ${rescueDeployed ? 'bg-blue-600' : 'bg-blue-500'}`}>
          {rescueAvail}
        </div>
        <div className="absolute left-full ml-5 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-xl p-5 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.18)] border border-stone-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 w-60 z-50 translate-x-2 group-hover:translate-x-0">
          <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-4 h-4 bg-white border-l border-b border-stone-200 rotate-45" />
          <div className="relative z-10">
            <span className="text-blue-500 text-base block mb-1 font-black">🛡️ {rescueAvail} Rescue Squads</span>
            <span className="text-[15px] font-medium text-stone-600">
              {rescueDeployed ? 'RT-1 deployed to Sector 4 via Alpha-4' : 'All teams on standby'}
            </span>
          </div>
        </div>
      </div>

      {/* Ambulance */}
      <div className="relative group cursor-pointer">
        <div className={`p-3.5 rounded-2xl transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.05)] group-hover:shadow-[0_12px_24px_rgba(0,0,0,0.12)] group-hover:-translate-y-1 group-hover:scale-105 ${ambBg}`}>
          <Cross className={`w-[22px] h-[22px] ${state.step === 3 ? 'text-red-600' : state.step >= 2 ? 'text-orange-500' : 'text-emerald-500'}`} />
        </div>
        <div className={`absolute -top-2 -right-2 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center text-[9px] font-bold text-white shadow-md ${ambBadgeColor}`}>
          {ambAvailable}
        </div>
        <div className="absolute left-full ml-5 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-xl p-5 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.18)] border border-stone-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 w-64 z-50 translate-x-2 group-hover:translate-x-0">
          <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-4 h-4 bg-white border-l border-b border-stone-200 rotate-45" />
          <div className="relative z-10">
            <span className={`${state.step === 3 ? 'text-red-600' : state.step >= 2 ? 'text-orange-500' : 'text-emerald-500'} text-base block mb-1.5 font-black`}>🚑 Ambulances</span>
            <div className="text-[14px] font-medium text-stone-600 space-y-1.5">
              {state.step === 0 && <div>2 units available for dispatch</div>}
              {state.step === 1 && <div>2 units on standby — awaiting orders</div>}
              {state.step === 2 && (
                <>
                  <div className="text-blue-600 font-bold">AMB-1: En route via Alpha-4</div>
                  <div>AMB-2: Standby at depot</div>
                </>
              )}
              {state.step === 3 && (
                <>
                  <div className="text-red-600 font-bold">AMB-1: ⚠ Blocked by crash</div>
                  <div>AMB-2: Standby at depot</div>
                </>
              )}
              {state.step >= 4 && (
                <>
                  <div className="text-stone-400 line-through">AMB-1: Blocked</div>
                  <div className="text-emerald-600 font-bold">AMB-2: Arrived at Sector 4 ✓</div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Drones */}
      <div className="relative group cursor-pointer">
        <div className="p-3.5 rounded-2xl bg-white text-stone-600 transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.05)] group-hover:shadow-[0_12px_24px_rgba(0,0,0,0.12)] group-hover:-translate-y-1 group-hover:scale-105">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500">
            <rect x="10" y="10" width="4" height="4" rx="1"/>
            <path d="m14 10 3-3"/><path d="m10 14-3 3"/><path d="m14 14 3 3"/><path d="m10 10-3-3"/>
            <circle cx="18" cy="6" r="2"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/><circle cx="6" cy="6" r="2"/>
          </svg>
        </div>
        <div className="absolute -top-2 -right-2 w-5 h-5 bg-purple-500 rounded-full border-2 border-white flex items-center justify-center text-[9px] font-bold text-white shadow-md">
          4
        </div>
        <div className="absolute left-full ml-5 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-xl p-5 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.18)] border border-stone-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 w-60 z-50 translate-x-2 group-hover:translate-x-0">
          <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-4 h-4 bg-white border-l border-b border-stone-200 rotate-45" />
          <div className="relative z-10">
            <span className="text-purple-500 text-base block mb-1 font-black">🛸 4 Survey Drones</span>
            <span className="text-[15px] font-medium text-stone-600">UAVs airborne for real-time mapping</span>
          </div>
        </div>
      </div>

      {/* Total Personnel */}
      <div className="relative group cursor-pointer mt-auto mb-1">
        <div className="p-3.5 rounded-2xl bg-white text-stone-600 transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.05)] group-hover:shadow-[0_12px_24px_rgba(0,0,0,0.12)] group-hover:-translate-y-1 group-hover:scale-105">
          <Users className="w-[22px] h-[22px] text-stone-500" />
        </div>
        <div className="absolute -top-2 -right-3 w-7 h-5 bg-stone-700 rounded-full border-2 border-white flex items-center justify-center text-[9px] font-bold text-white shadow-md px-1">
          42
        </div>
        <div className="absolute left-full ml-5 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-xl p-5 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.18)] border border-stone-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 w-60 z-50 translate-x-2 group-hover:translate-x-0">
          <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-4 h-4 bg-white border-l border-b border-stone-200 rotate-45" />
          <div className="relative z-10">
            <span className="text-stone-700 text-base block mb-1 font-black">👷 42 Personnel</span>
            <span className="text-[15px] font-medium text-stone-600">
              {state.step >= 1 ? '17 at risk in Sector 4 — 25 in safe zones' : 'All registered on active mining duty'}
            </span>
          </div>
        </div>
      </div>

    </div>
  );
}
