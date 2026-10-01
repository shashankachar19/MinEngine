import { useSimulation } from '../store/SimContext';
import { ShieldCheck, Download, BarChart3, Clock, X, RotateCcw } from 'lucide-react';
import { useMemo } from 'react';

export default function ImpactReportModal() {
  const { state, closeImpactReport } = useSimulation();

  const totalWorkers = 42;
  const exposedWorkers = 17;
  const coordCycleTime = '45.5s';
  const replanningTime = '11.5s';

  if (state.step < 4 || !state.showImpactReport) return null;

  const metrics = [
    {
      label: 'Incident Assessment',
      simType: 'Multi-agent analysis',
      result: `~${coordCycleTime} simulated coordination cycle`,
      resultColor: 'text-emerald-600',
    },
    {
      label: 'Personnel Exposure',
      simType: 'Simulated personnel telemetry',
      result: `${exposedWorkers} potentially exposed`,
      resultColor: 'text-amber-600',
    },
    {
      label: 'Personnel Accountability',
      simType: 'Simulated GPS/RTLS',
      result: `${totalWorkers}/${totalWorkers} accounted`,
      resultColor: 'text-emerald-600',
    },
    {
      label: 'Route Replanning',
      simType: 'Deterministic route engine',
      result: `~${replanningTime} AI-assisted replanning`,
      resultColor: 'text-cyan-600',
    },
    {
      label: 'Active Incidents',
      simType: 'Multi-incident simulation',
      result: '2 concurrent incidents',
      resultColor: 'text-red-500',
    },
    {
      label: 'Resource Reallocation',
      simType: 'AI-assisted coordination',
      result: 'Ambulances reassigned',
      resultColor: 'text-emerald-600',
    },
    {
      label: 'Human Approval',
      simType: 'Safety-critical action',
      result: 'Required & Logged',
      resultColor: 'text-cyan-600',
    },
  ];

  const handleDownloadPDF = () => {
    // Generate a printable report
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const now = new Date();
    const dateStr = now.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
    const timeStr = now.toLocaleTimeString('en-GB', { hour12: false });

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>minEngine Crisis Impact Report</title>
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;900&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'Outfit', sans-serif; background: #fff; color: #1c1917; padding: 48px; }
          .header { display: flex; align-items: center; justify-content: space-between; border-bottom: 3px solid #10b981; padding-bottom: 24px; margin-bottom: 32px; }
          .logo { font-size: 28px; font-weight: 900; letter-spacing: -0.5px; }
          .logo span { color: #047857; }
          .meta { font-size: 12px; color: #78716c; font-family: 'JetBrains Mono', monospace; text-align: right; }
          .success { background: #ecfdf5; border: 2px solid #10b981; border-radius: 12px; padding: 20px 24px; margin-bottom: 32px; }
          .success h2 { color: #047857; font-size: 18px; font-weight: 800; margin-bottom: 4px; }
          .success p { color: #065f46; font-size: 14px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 32px; }
          th { text-align: left; padding: 10px 12px; font-size: 11px; font-weight: 900; text-transform: uppercase; letter-spacing: 2px; color: #78716c; border-bottom: 2px solid #e7e5e4; }
          td { padding: 14px 12px; font-size: 14px; border-bottom: 1px solid #f5f5f4; }
          .manual { color: #dc2626; font-weight: 600; }
          .ai { color: #047857; font-weight: 700; }
          .impact { color: #0891b2; font-weight: 700; font-size: 13px; }
          .stats { display: flex; gap: 16px; margin-bottom: 32px; }
          .stat { flex: 1; text-align: center; padding: 20px; border-radius: 12px; border: 2px solid #e7e5e4; }
          .stat .num { font-size: 32px; font-weight: 900; font-family: 'JetBrains Mono', monospace; }
          .stat .label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #78716c; margin-top: 4px; }
          .emerald .num { color: #047857; }
          .red .num { color: #dc2626; }
          .blue .num { color: #0369a1; }
          .footer { border-top: 2px solid #e7e5e4; padding-top: 20px; font-size: 11px; color: #a8a29e; text-align: center; }
          @media print { body { padding: 24px; } }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">MIN<span>ENGINE.</span></div>
          <div class="meta">
            Crisis Impact Report<br/>
            ${dateStr} — ${timeStr}<br/>
            Simulated Sandur Open-Cast Mining Scenario — Bellary, Karnataka
          </div>
        </div>

        <div class="success">
          <h2>✅ SIMULATED CRISIS CONTAINED</h2>
          <p>${totalWorkers}/${totalWorkers} simulated personnel accounted for. Response plan verified in simulation.</p>
        </div>

        <table>
          <thead>
            <tr>
              <th>Metric</th>
              <th>minEngine Simulation</th>
              <th>Observed Result</th>
            </tr>
          </thead>
          <tbody>
            ${metrics.map(m => `
              <tr>
                <td style="font-weight:600">${m.label}</td>
                <td class="manual" style="color:#78716c">${m.simType}</td>
                <td class="ai">${m.result}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div class="stats">
          <div class="stat emerald"><div class="num">${coordCycleTime}</div><div class="label">Simulated Coordination Cycle</div></div>
          <div class="stat blue"><div class="num">${replanningTime}</div><div class="label">Simulated Route Replanning</div></div>
          <div class="stat emerald"><div class="num">${totalWorkers}/${totalWorkers}</div><div class="label">Simulated Personnel Accounted</div></div>
        </div>

        <div class="footer">
          <strong>Simulation Note:</strong> All incidents, personnel, telemetry, timings and outcomes shown in this report are generated within the minEngine prototype simulation and are not measurements from a live mine deployment.
        </div>
      </body>
      </html>
    `);
    printWindow.document.close();
    setTimeout(() => { printWindow.print(); }, 500);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center font-sans">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={closeImpactReport} />
      
      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-4xl mx-4 bg-white border border-stone-200 rounded-[2rem] shadow-[0_40px_100px_rgba(0,0,0,0.15)] animate-in zoom-in-95 fade-in duration-500 overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-10 py-8 border-b border-stone-200 bg-stone-50/80">
          <div className="flex items-center gap-6">
            <div className="p-4 bg-white shadow-sm border border-stone-100 rounded-3xl">
              <BarChart3 className="w-10 h-10 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-3xl font-black text-stone-900 tracking-tight">Crisis Impact Report</h2>
              <p className="text-xl text-stone-500 font-medium mt-1">Multi-Agent Coordination Simulation</p>
            </div>
          </div>
          <button onClick={closeImpactReport} className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white border border-stone-200 shadow-sm hover:bg-stone-50 text-stone-500 hover:text-stone-900 transition-all">
            <X className="w-7 h-7" strokeWidth={2.5} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-10 py-10 custom-scrollbar space-y-10">
          
          {/* Success Banner */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-3xl px-8 py-6 flex items-center gap-6 shadow-sm relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/0 via-emerald-400/20 to-emerald-400/0 -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
            <ShieldCheck className="w-14 h-14 text-emerald-600 shrink-0 relative z-10" />
            <div className="relative z-10">
              <h3 className="text-2xl font-black text-emerald-800 tracking-tight uppercase">SIMULATED CRISIS CONTAINED</h3>
              <p className="text-lg text-emerald-600 font-medium mt-2">{totalWorkers}/{totalWorkers} simulated personnel accounted for. Response plan verified in simulation.</p>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="overflow-hidden rounded-2xl border border-stone-200 shadow-sm relative group">
            <table className="w-full text-lg">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-200">
                  <th className="text-left px-8 py-5 text-sm font-black text-stone-500 uppercase tracking-widest">Metric</th>
                  <th className="text-left px-8 py-5 text-sm font-black text-stone-500 uppercase tracking-widest">minEngine Simulation</th>
                  <th className="text-right px-8 py-5 text-sm font-black text-stone-500 uppercase tracking-widest">Observed Result</th>
                </tr>
              </thead>
              <tbody>
                {metrics.map((m, i) => (
                  <tr key={i} className="border-b last:border-b-0 border-stone-100 hover:bg-stone-50/80 transition-colors">
                    <td className="px-8 py-6 text-stone-800 font-bold text-[17px]">{m.label}</td>
                    <td className="px-8 py-6 text-stone-500 font-mono font-medium text-[15px]">{m.simType}</td>
                    <td className={`px-8 py-6 text-right font-black text-[16px] ${m.resultColor}`}>{m.result}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-emerald-50 border border-emerald-100 rounded-3xl p-8 text-center shadow-sm relative overflow-hidden group hover:-translate-y-1 transition-transform">
              <div className="absolute top-0 left-0 w-full h-1 bg-emerald-400" />
              <div className="text-5xl font-black font-mono text-emerald-600 group-hover:scale-105 transition-transform">{coordCycleTime}</div>
              <div className="text-[12px] font-black text-emerald-800/70 uppercase tracking-widest mt-3">Simulated Coordination Cycle</div>
            </div>
            <div className="bg-cyan-50 border border-cyan-100 rounded-3xl p-8 text-center shadow-sm relative overflow-hidden group hover:-translate-y-1 transition-transform">
              <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400" />
              <div className="text-5xl font-black font-mono text-cyan-600 group-hover:scale-105 transition-transform">{replanningTime}</div>
              <div className="text-[12px] font-black text-cyan-800/70 uppercase tracking-widest mt-3">Simulated Route Replanning</div>
            </div>
            <div className="bg-stone-50 border border-stone-200 rounded-3xl p-8 text-center shadow-sm relative overflow-hidden group hover:-translate-y-1 transition-transform">
              <div className="absolute top-0 left-0 w-full h-1 bg-stone-300" />
              <div className="text-5xl font-black font-mono text-stone-600 group-hover:scale-105 transition-transform">{totalWorkers}/{totalWorkers}</div>
              <div className="text-[12px] font-black text-stone-800/70 uppercase tracking-widest mt-3">Simulated Personnel Accounted</div>
            </div>
          </div>
          
          {/* Disclaimer */}
          <div className="text-[11px] text-stone-400 text-center font-medium leading-relaxed px-10">
            <strong>Simulation Note:</strong> All incidents, personnel, telemetry, timings and outcomes shown in this report are generated within the minEngine prototype simulation and are not measurements from a live mine deployment.
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="px-10 py-7 border-t border-stone-200 bg-stone-50 flex gap-6">
          <button
            onClick={handleDownloadPDF}
            className="group relative flex-1 py-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-mono text-lg font-black tracking-widest uppercase transition-all flex items-center justify-center gap-3 shadow-[0_8px_20px_rgba(16,185,129,0.2)] hover:shadow-[0_12px_25px_rgba(16,185,129,0.3)] hover:-translate-y-1 active:translate-y-[2px] overflow-hidden"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            <Download className="w-6 h-6 relative z-10 group-hover:scale-110 transition-transform" />
            <span className="relative z-10">Download Report (PDF)</span>
          </button>
          <button
            onClick={() => window.location.reload()}
            className="group relative px-10 py-6 bg-white border-2 border-stone-200 hover:border-stone-300 hover:bg-stone-100 text-stone-600 hover:text-stone-900 rounded-2xl font-mono text-lg font-black tracking-widest uppercase transition-all flex items-center justify-center gap-3 shadow-sm hover:-translate-y-1 active:translate-y-[2px] overflow-hidden"
          >
            <RotateCcw className="w-6 h-6 group-hover:-rotate-90 transition-transform duration-500" />
            <span>Reset Demo</span>
          </button>
        </div>
      </div>
    </div>
  );
}
