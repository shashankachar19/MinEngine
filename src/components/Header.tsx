import { Shield, Clock, MapPin } from 'lucide-react';
import { useSimulation } from '../store/SimContext';
import { useEffect, useState, useRef } from 'react';
import { MINE_LOCATION } from '../store/simulationState';

function LiveClock() {
  const [time, setTime] = useState(() => new Date().toLocaleTimeString('en-GB', { hour12: false }));
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-GB', { hour12: false }));
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, []);

  return <span className="font-mono text-sm tracking-widest text-stone-600 font-bold">{time}</span>;
}

export default function Header() {
  const { state } = useSimulation();

  let statusClass = 'text-emerald-800 bg-emerald-50';
  let dotColor = 'bg-emerald-600';

  if (state.siteStatus === 'INCIDENT' || state.siteStatus === 'SECONDARY_INCIDENT') {
    statusClass = 'text-red-800 bg-red-50';
    dotColor = 'bg-red-600 animate-pulse';
  } else if (state.siteStatus === 'AWAITING_APPROVAL') {
    statusClass = 'text-orange-800 bg-orange-50';
    dotColor = 'bg-orange-600 animate-pulse';
  }

  return (
    <header className="h-16 flex items-center justify-between px-6 z-40 relative bg-transparent font-sans border-none">
      {/* Left: Logo */}
      <div className="flex items-center gap-4">
        <div className="bg-stone-50 p-3 rounded-2xl shadow-sm">
          <Shield className="w-6 h-6 text-stone-900" strokeWidth={2} />
        </div>
        <div>
          <h1 className="text-lg font-black tracking-tight leading-none uppercase text-stone-900">
            MIN<span className="text-emerald-700">ENGINE.</span>
          </h1>
          <p className="text-[10px] font-mono font-bold text-stone-500 tracking-widest leading-none mt-1 uppercase">
            {MINE_LOCATION.district} CMD
          </p>
        </div>
      </div>

      {/* Center: Status indicator */}
      <div className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-mono tracking-widest transition-all duration-500 ${statusClass}`}>
        <div className={`w-2 h-2 rounded-full ${dotColor}`} />
        <span className="text-xs font-black uppercase">
          {state.isProcessing ? 'AI PROCESSING...' : state.statusLabel}
        </span>
      </div>

      {/* Right: Location + Clock */}
      <div className="flex items-center gap-6 text-stone-600">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-stone-400" />
          <span className="text-xs font-mono font-bold tracking-widest">{MINE_LOCATION.lat.toFixed(2)}N {MINE_LOCATION.lng.toFixed(2)}E</span>
        </div>
        <div className="flex items-center gap-2 border-l-2 border-stone-200 pl-6">
          <Clock className="w-4 h-4 text-stone-400" />
          <LiveClock />
        </div>
      </div>
    </header>
  );
}
