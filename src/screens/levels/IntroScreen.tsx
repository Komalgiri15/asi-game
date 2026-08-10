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
        className="z-10 flex flex-col items-center justify-center text-center max-w-4xl px-6 h-full py-12"
      >
        <div className="text-teal-400 font-extrabold tracking-widest uppercase text-sm mb-4">Acuity Deal Room</div>
        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-tight">
          The Profile Path
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
          Rise from Trainee Analyst to Trusted Advisor by building a research-ready company profile for the M&A committee.
        </p>

        <div className="mb-8 w-full max-w-5xl mx-auto">
          <h2 className="text-slate-400 font-extrabold uppercase tracking-widest text-[11px] mb-3">Learning Goals</h2>
          <p className="text-slate-300 text-sm font-medium mb-6">Master the five AFA best practices for research-ready profiles:</p>
          
          <div className="overflow-hidden w-full relative">
            <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none"></div>
            
            <motion.div 
              animate={{ x: [0, "-50%"] }} 
              transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
              className="flex gap-4 w-max px-4"
            >
              {[
                { title: "Purpose", desc: "Start with the purpose, not just the company name." },
                { title: "Scope", desc: "Define the scope and sources for the research." },
                { title: "Evidence", desc: "Ask for evidence and facts, not just opinions." },
                { title: "Validate", desc: "Validate and review the output before use." },
                { title: "Expertise", desc: "Enhance AI output with human expertise." },
                // Duplicate for seamless loop
                { title: "Purpose", desc: "Start with the purpose, not just the company name." },
                { title: "Scope", desc: "Define the scope and sources for the research." },
                { title: "Evidence", desc: "Ask for evidence and facts, not just opinions." },
                { title: "Validate", desc: "Validate and review the output before use." },
                { title: "Expertise", desc: "Enhance AI output with human expertise." }
              ].map((goal, i) => (
                <div 
                  key={i} 
                  className="bg-[#131C31]/90 backdrop-blur-md border border-white/5 rounded-2xl p-5 text-left flex flex-col shadow-xl w-72 shrink-0 hover:border-teal-500/30 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500/20 to-cyan-500/20 border border-teal-500/20 text-teal-400 flex items-center justify-center text-sm font-black shrink-0">
                      {(i % 5) + 1}
                    </div>
                    <div className="font-extrabold text-white text-sm tracking-wide">{goal.title}</div>
                  </div>
                  <div className="text-xs text-slate-400 leading-relaxed font-medium">
                    {goal.desc}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

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
