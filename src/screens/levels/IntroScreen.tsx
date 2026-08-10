import { useGame } from '../../context/GameContext';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion';

export function IntroScreen() {
  const { startGame } = useGame();

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-slate-900 relative overflow-hidden">
      {/* Faint background grid hinting at a one-page profile */}
      <div className="absolute inset-0 pointer-events-none opacity-10 flex flex-col p-12 gap-8 justify-center">
        <div className="h-24 bg-slate-400 rounded w-full"></div>
        <div className="flex-1 grid grid-cols-2 gap-8">
           <div className="bg-slate-400 rounded h-full"></div>
           <div className="bg-slate-400 rounded h-full"></div>
           <div className="bg-slate-400 rounded h-full"></div>
           <div className="bg-slate-400 rounded h-full"></div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 flex flex-col items-center justify-center text-center max-w-3xl px-6 h-full"
      >
        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-tight">
          The Profile Path
        </h1>
        
        <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
          Level up your AFA prompting and judgment to build a research-ready company profile.
        </p>

        <button 
          onClick={startGame}
          className="group relative inline-flex items-center gap-3 bg-teal-500 hover:bg-teal-400 text-slate-900 font-black text-lg py-4 px-10 rounded-full transition-all duration-300 shadow-[0_0_40px_rgba(20,184,166,0.3)] hover:shadow-[0_0_60px_rgba(20,184,166,0.5)] transform hover:-translate-y-1"
        >
          <Play fill="currentColor" size={24} className="group-hover:scale-110 transition-transform" />
          Begin
        </button>
      </motion.div>
    </div>
  );
}
