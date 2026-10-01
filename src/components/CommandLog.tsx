import { useEffect, useRef } from 'react';
import { useSimulation } from '../store/SimContext';
import { Terminal } from 'lucide-react';

export default function CommandLog() {
  const { visibleLogs, state } = useSimulation();
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [visibleLogs]);

  return (
    <div className="h-full flex flex-col font-mono bg-transparent text-stone-600 min-h-0">
      <div className="flex-none px-5 py-4 border-b-2 border-stone-200 flex items-center justify-between bg-stone-50 z-10">
        <h2 className="text-base font-black tracking-widest text-stone-900 flex items-center gap-2.5 uppercase">
          <Terminal className="w-5 h-5 text-emerald-700" />
          AI Engine Logs
        </h2>
        <span className="text-sm text-stone-500 font-bold tracking-widest">
          {state.isProcessing ? 'PROCESSING...' : `${visibleLogs.length} EVENTS`}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto min-h-0 relative p-4 custom-scrollbar bg-white">
        <div className="space-y-3">
          {visibleLogs.map(log => {
            let textColor = 'text-stone-600';
            let tagColor = 'bg-stone-100 text-stone-500 border border-stone-200';
            let borderColor = 'border-stone-200';

            if (log.level === 'system') {
              textColor = 'text-stone-600';
              borderColor = 'border-stone-300';
            } else if (log.level === 'perception') {
              textColor = 'text-cyan-800';
              tagColor = 'bg-cyan-50 text-cyan-700 border border-cyan-200 shadow-sm';
              borderColor = 'border-cyan-500';
            } else if (log.level === 'risk') {
              textColor = 'text-red-800';
              tagColor = 'bg-red-50 text-red-700 border border-red-200 shadow-sm';
              borderColor = 'border-red-500';
            } else if (log.level === 'routing') {
              textColor = 'text-blue-800';
              tagColor = 'bg-blue-50 text-blue-700 border border-blue-200 shadow-sm';
              borderColor = 'border-blue-500';
            } else if (log.level === 'resource') {
              textColor = 'text-emerald-800';
              tagColor = 'bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm';
              borderColor = 'border-emerald-500';
            } else if (log.level === 'command') {
              textColor = 'text-purple-800';
              tagColor = 'bg-purple-50 text-purple-700 border border-purple-200 shadow-sm';
              borderColor = 'border-purple-500';
            }

            return (
              <div key={log.id} className={`p-4 rounded-xl bg-white shadow-[0_4px_12px_rgba(0,0,0,0.03)] transition-all duration-300 hover:shadow-[0_12px_24px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 leading-relaxed flex gap-3 animate-in slide-in-from-bottom-2 fade-in duration-300 group cursor-default border-l-[6px] border-y border-r border-y-stone-100 border-r-stone-100 ${borderColor}`}>
                <span className="text-stone-400 shrink-0 mt-1 text-xs font-bold group-hover:text-stone-600 transition-colors">{log.timestamp}</span>
                <div className="flex-1">
                  <span className={`inline-block px-3 py-1 rounded-lg text-[11px] font-black tracking-widest mb-2 uppercase ${tagColor}`}>
                    {log.source}
                  </span>
                  <div className={`${textColor} text-[15px] font-medium leading-relaxed font-mono`}>{log.message}</div>
                </div>
              </div>
            );
          })}
          
          {/* Processing Indicator */}
          {state.isProcessing && (
             <div className="leading-relaxed flex gap-3 animate-pulse p-4">
                <span className="text-stone-400 shrink-0 mt-1 text-xs font-bold">--:--:--</span>
                <div className="flex-1">
                   <div className="text-emerald-600 text-[15px] font-mono typing-indicator font-bold">
                     {state.processingMessage || 'AI Core is evaluating...'}
                   </div>
                </div>
             </div>
          )}

          <div ref={logEndRef} />
        </div>
      </div>
    </div>
  );
}
