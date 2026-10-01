import Header from './Header';
import GISMap from './GISMap';
import WelcomeModal from './WelcomeModal';
import HoverBottomNav from './HoverBottomNav';
import ResourcePanel from './ResourcePanel';
import RightSidebarResizable from './RightSidebarResizable';
import ImpactReportModal from './ImpactReportModal';
import { useSimulation } from '../store/SimContext';

export default function CommandCenter() {
  const { missionStarted } = useSimulation();

  return (
    <div className="h-screen w-screen bg-stone-100 overflow-hidden font-sans text-stone-900 flex items-center justify-center p-3 relative">
      
      {/* Cinematic Start Screen */}
      <WelcomeModal />

      {/* Main Dashboard - Bento Grid */}
      {missionStarted && (
        <div className="relative z-10 w-full h-full grid grid-cols-[72px_1fr_420px] grid-rows-[64px_1fr] gap-3">
          
          {/* Header (Top Banner - spans full width) */}
          <div className="col-span-3 bg-white/95 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/60">
            <Header />
          </div>

          {/* Left Sidebar (Ultra-Thin Icon Rail) */}
          <div className="row-span-1 col-span-1 bg-white/95 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300 backdrop-blur-xl rounded-2xl border border-white/60 z-20">
            <ResourcePanel />
          </div>

          {/* Center Map */}
          <div className="row-span-1 col-span-1 bg-white/95 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300 backdrop-blur-xl rounded-2xl relative border border-white/60">
            <GISMap />
            {/* Command Overlay Floats on Map */}
            <HoverBottomNav />
          </div>

          {/* Right Sidebar (AI Logs) */}
          <div className="row-span-1 col-span-1 min-h-0 bg-white/95 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/60">
            <RightSidebarResizable />
          </div>

        </div>
      )}

      {/* Full-Screen Impact Report Modal */}
      <ImpactReportModal />
    </div>
  );
}

