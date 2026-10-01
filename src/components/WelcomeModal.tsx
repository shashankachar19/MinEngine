import { useState } from 'react';
import { useSimulation } from '../store/SimContext';
import { Play, Shield, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

// Liquid Glass SVG Filter
function CardGlassFilter() {
    return (
        <svg className="hidden" aria-hidden="true">
            <defs>
                <filter id="card-glass" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
                    <feTurbulence type="fractalNoise" baseFrequency="0.03 0.03" numOctaves="2" seed="3" result="turbulence" />
                    <feGaussianBlur in="turbulence" stdDeviation="3" result="blurredNoise" />
                    <feDisplacementMap in="SourceGraphic" in2="blurredNoise" scale="18" xChannelSelector="R" yChannelSelector="B" result="displaced" />
                    <feGaussianBlur in="displaced" stdDeviation="3" result="finalBlur" />
                    <feComposite in="finalBlur" in2="finalBlur" operator="over" />
                </filter>
            </defs>
        </svg>
    );
}

export default function WelcomeModal() {
  const { startMission, missionStarted } = useSimulation();
  const [step, setStep] = useState(1);
  const [isBooting, setIsBooting] = useState(false);

  if (missionStarted) return null;

  const handleBootSequence = () => {
    setIsBooting(true);
    setTimeout(() => {
      startMission();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden font-sans bg-stone-900">
      <CardGlassFilter />

      {/* Immersive Background */}
      <motion.img 
        initial={{ scale: 1.1, filter: 'blur(10px)' }}
        animate={{ scale: 1.05, filter: 'blur(4px)' }}
        transition={{ duration: 2, ease: "easeOut" }}
        src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=2000&q=80" 
        alt="Topographical Map" 
        className="absolute inset-0 w-full h-full object-cover brightness-50"
        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
      />
      <div className="absolute inset-0 bg-stone-900/60" />

      {/* Liquid Glass Main Card */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: isBooting ? 0 : 1, scale: isBooting ? 1.05 : 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-[550px] w-full mx-4"
      >
        <div className="absolute inset-0 rounded-[2.5rem] bg-white/70 backdrop-blur-3xl shadow-[0_40px_100px_rgba(0,0,0,0.5)] border border-white/80 overflow-hidden">
            {/* Liquid distortion effect overlay */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ filter: 'url(#card-glass)' }} />
            {/* Subtle glow */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/40 to-transparent" />
        </div>

        <div className="relative z-10 p-12 flex flex-col items-center">
          
          {isBooting ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center h-[340px] w-full"
            >
              <div className="relative mb-8">
                <Shield className="w-16 h-16 text-emerald-600 relative z-10" strokeWidth={1.5} />
                <div className="absolute inset-0 bg-emerald-400 blur-xl opacity-50 rounded-full animate-ping" />
              </div>
              <h2 className="text-2xl font-black tracking-widest text-stone-900 uppercase mb-4 text-center animate-pulse">
                System Booting...
              </h2>
              <div className="w-48 h-1.5 bg-stone-200/50 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full w-full animate-[slide-right_1.5s_ease-in-out_infinite] origin-left" style={{ animationName: 'progress' }} />
              </div>
              <style>{`
                @keyframes progress {
                  0% { transform: scaleX(0); }
                  50% { transform: scaleX(0.7); }
                  100% { transform: scaleX(1); }
                }
              `}</style>
            </motion.div>
          ) : step === 1 ? (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center w-full"
            >
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="mb-8 rounded-[1.5rem] bg-white/80 backdrop-blur-md p-5 shadow-lg border border-white/60"
              >
                <Shield className="w-14 h-14 text-emerald-600 drop-shadow-sm" strokeWidth={1.5} />
              </motion.div>

              <h1 className="text-4xl font-black tracking-tight text-stone-900 uppercase mb-2 text-center drop-shadow-sm">
                MIN<span className="text-emerald-600">ENGINE.</span>
              </h1>
              
              <div className="text-xs font-bold tracking-[0.15em] text-stone-500 uppercase mb-8 border-b border-stone-200/50 pb-4 text-center w-full">
                AI Crisis Command for High-Risk Sites
              </div>

              <div className="bg-white/50 backdrop-blur-sm w-full p-6 rounded-3xl mb-10 shadow-inner border border-white/80 flex flex-col items-center relative overflow-hidden group">
                 <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:10px_10px]" />
                 <span className="text-emerald-700 font-mono text-[10px] font-black tracking-widest uppercase mb-3 relative z-10">Core Protocol</span>
                 <p className="text-[17px] font-black tracking-widest uppercase text-stone-800 text-center leading-relaxed relative z-10">
                    Sense. Reason.<br/>Coordinate. Respond.
                 </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setStep(2)}
                className="relative px-8 py-5 bg-stone-900/95 hover:bg-black text-white transition-all duration-300 rounded-[1.25rem] overflow-hidden flex items-center justify-center gap-3 w-full shadow-[0_15px_30px_rgba(0,0,0,0.2)] border border-stone-700/50 group"
              >
                {/* Liquid hover sheen */}
                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
                <span className="font-mono text-[12px] tracking-widest font-black relative z-10 uppercase">
                  [ START MISSION ]
                </span>
                <ChevronRight className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" strokeWidth={3} />
              </motion.button>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col items-start w-full"
            >
              <div className="mb-8">
                 <h2 className="text-3xl font-black tracking-tight text-stone-900 mb-3 drop-shadow-sm">
                   Why minEngine?
                 </h2>
                 <div className="w-12 h-1.5 bg-emerald-500 rounded-full shadow-inner"></div>
              </div>

              <div className="space-y-5 text-stone-700 text-[15px] leading-relaxed font-medium mb-10 w-full">
                 <p className="text-stone-900 font-black text-xl leading-snug drop-shadow-sm">
                   Emergencies don't happen one at a time.
                 </p>
                 <p className="text-stone-600/90 font-medium">
                   When a hazard appears, responders need to know: <br/>
                   <span className="font-black text-emerald-900 bg-emerald-100/50 backdrop-blur px-3 py-1.5 rounded-lg inline-block mt-3 shadow-inner border border-emerald-200/50 leading-normal">What happened? Who is at risk? What resources are available? What should happen next?</span>
                 </p>
                 <p className="pt-5 border-t border-stone-200/50 text-stone-600/90 font-bold">
                   minEngine continuously reassesses the situation and dynamically replans as conditions change.
                 </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleBootSequence}
                className="relative px-8 py-5 bg-emerald-600 hover:bg-emerald-700 text-white transition-all duration-300 rounded-[1.25rem] overflow-hidden flex items-center justify-center gap-3 w-full shadow-[0_15px_30px_rgba(16,185,129,0.3)] border border-emerald-400/50 group"
              >
                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                <Play className="w-5 h-5 relative z-10" fill="currentColor" />
                <span className="font-mono text-[12px] tracking-widest font-black relative z-10 uppercase">
                  [ ENTER COMMAND CENTER ]
                </span>
              </motion.button>
            </motion.div>
          )}
        </div>
      </motion.div>
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
