import { useSimulation } from '../store/SimContext';
import { ShieldCheck, Download, BarChart3, Clock, X, RotateCcw } from 'lucide-react';
import { useMemo } from 'react';

export default function ImpactReportModal() {
  const { state, closeImpactReport } = useSimulation();

  const aiResponseTime = useMemo(() => (Math.random() * 2.5 + 3.2).toFixed(1), []); // e.g. 4.7

  if (state.step < 4 || !state.showImpactReport) return null;

  const metrics = [
    {
      label: 'Detection → Response Time',
      manual: '~12 minutes',
      ai: `${aiResponseTime} seconds`,
      impact: '↓ 99.3% faster',
      impactColor: 'text-emerald-400',
    },
    {
      label: 'Casualties',
      manual: '2–5 (estimated)',
      ai: '0',
      impact: '↓ 100% reduction',
      impactColor: 'text-emerald-400',
    },
    {
      label: 'AI Compute Latency',
      manual: 'N/A',
      ai: '124 ms',
      impact: '↓ Ultra-low latency',
      impactColor: 'text-emerald-400',
    },
    {
      label: 'Evacuation Route Replanning',
      manual: '8–15 minutes (radio)',
      ai: '1.8 seconds (auto)',
      impact: '↓ Autonomous',
      impactColor: 'text-cyan-400',
    },
    {
      label: 'Personnel Accountability',
      manual: 'Manual headcount',
      ai: 'Real-time IoT tracking',
      impact: 'Instant verification',
      impactColor: 'text-cyan-400',
    },
    {
      label: 'Multi-Incident Coordination',
      manual: 'Single-threaded',
      ai: 'Parallel agent system',
      impact: '↓ Concurrent handling',
      impactColor: 'text-cyan-400',
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
            Sandur Open-Cast Mine, Bellary
          </div>
        </div>

        <div class="success">
          <h2>✅ CRISIS CONTAINED — 0 Casualties Recorded</h2>
          <p>All 42 personnel accounted for. Site secured. No environmental damage.</p>
        </div>

        <table>
          <thead>
            <tr>
              <th>Metric</th>
              <th>Manual</th>
              <th>minEngine AI</th>
              <th>Impact</th>
            </tr>
          </thead>
          <tbody>
            ${metrics.map(m => `
              <tr>
                <td style="font-weight:600">${m.label}</td>
                <td class="manual">${m.manual}</td>
                <td class="ai">${m.ai}</td>
                <td class="impact">${m.impact}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div class="stats">
          <div class="stat emerald"><div class="num">124ms</div><div class="label">AI Compute Latency</div></div>
          <div class="stat blue"><div class="num">45ms</div><div class="label">Network Override</div></div>
          <div class="stat red"><div class="num">4m 12s</div><div class="label">Total Evacuation</div></div>
        </div>

        <div class="footer">
          Generated by minEngine AI Crisis Command System — Sandur Open-Cast Iron Ore Mine, Bellary District
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
              <p className="text-xl text-stone-500 font-medium mt-1">Manual Response vs. minEngine AI Coordination</p>
            </div>
          </div>
          <button onClick={closeImpactReport} className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white border border-stone-200 shadow-sm hover:bg-stone-50 text-stone-500 hover:text-stone-900 transition-all">
            <X className="w-7 h-7" strokeWidth={2.5} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-10 py-10 custom-scrollbar space-y-10">
          
          {/* Success Banner */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-3xl px-8 py-6 flex items-center gap-6 shadow-sm">
            <ShieldCheck className="w-14 h-14 text-emerald-600 shrink-0" />
            <div>
              <h3 className="text-2xl font-black text-emerald-800 tracking-tight">CRISIS CONTAINED — 0 Casualties Recorded</h3>
              <p className="text-lg text-emerald-600 font-medium mt-2">All 42 personnel accounted for. Site secured. No environmental damage.</p>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="overflow-hidden rounded-2xl border border-stone-200 shadow-sm">
            <table className="w-full text-lg">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-200">
                  <th className="text-left px-8 py-5 text-sm font-black text-stone-500 uppercase tracking-widest">Metric</th>
                  <th className="text-center px-6 py-5 text-sm font-black text-red-500 uppercase tracking-widest">Manual</th>
                  <th className="text-center px-6 py-5 text-sm font-black text-emerald-600 uppercase tracking-widest">minEngine AI</th>
                  <th className="text-right px-8 py-5 text-sm font-black text-cyan-600 uppercase tracking-widest">Impact</th>
                </tr>
              </thead>
              <tbody>
                {metrics.map((m, i) => (
                  <tr key={i} className="border-b last:border-b-0 border-stone-100 hover:bg-stone-50/50 transition-colors">
                    <td className="px-8 py-6 text-stone-800 font-bold text-[17px]">{m.label}</td>
                    <td className="px-6 py-6 text-center text-red-500 font-mono font-bold text-[17px]">{m.manual}</td>
                    <td className="px-6 py-6 text-center text-emerald-600 font-mono font-bold text-[17px]">{m.ai}</td>
                    <td className={`px-8 py-6 text-right font-black text-[16px] ${m.impactColor.replace('400', '600')}`}>{m.impact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-emerald-50 border border-emerald-100 rounded-3xl p-8 text-center shadow-sm">
              <div className="text-6xl font-black font-mono text-emerald-600">124ms</div>
              <div className="text-[14px] font-black text-emerald-800/70 uppercase tracking-widest mt-3">AI Compute Latency</div>
            </div>
            <div className="bg-cyan-50 border border-cyan-100 rounded-3xl p-8 text-center shadow-sm">
              <div className="text-6xl font-black font-mono text-cyan-600">45ms</div>
              <div className="text-[14px] font-black text-cyan-800/70 uppercase tracking-widest mt-3">Network Override</div>
            </div>
            <div className="bg-stone-50 border border-stone-200 rounded-3xl p-8 text-center shadow-sm">
              <div className="text-6xl font-black font-mono text-stone-600">4m 12s</div>
              <div className="text-[14px] font-black text-stone-800/70 uppercase tracking-widest mt-3">Total Evacuation</div>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="px-10 py-7 border-t border-stone-200 bg-stone-50 flex gap-6">
          <button
            onClick={handleDownloadPDF}
            className="flex-1 py-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-mono text-lg font-black tracking-widest uppercase transition-all flex items-center justify-center gap-3 shadow-[0_8px_20px_rgba(16,185,129,0.2)] hover:shadow-[0_12px_25px_rgba(16,185,129,0.3)] hover:-translate-y-1 active:translate-y-[2px]"
          >
            <Download className="w-6 h-6" />
            Download Report (PDF)
          </button>
          <button
            onClick={() => window.location.reload()}
            className="px-10 py-6 bg-white border-2 border-stone-200 hover:border-stone-300 hover:bg-stone-100 text-stone-600 hover:text-stone-900 rounded-2xl font-mono text-lg font-black tracking-widest uppercase transition-all flex items-center justify-center gap-3 shadow-sm hover:-translate-y-1 active:translate-y-[2px]"
          >
            <RotateCcw className="w-6 h-6" />
            Reset Demo
          </button>
        </div>
      </div>
    </div>
  );
}
