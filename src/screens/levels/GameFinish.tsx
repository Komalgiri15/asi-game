import { useGame } from '../../context/GameContext';
import { getRank } from '../../types/game';
import { BADGES } from '../../data/dealRoomData';
import { Award, CheckSquare, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { useVoiceover } from '../../hooks/useVoiceover';

export function GameFinish() {
  const { insightPoints, badges, restartGame, currentLevel, phase } = useGame();
  const rank = getRank(currentLevel, phase);

  useVoiceover(`Mission Accomplished. Your final rank is ${rank}. Excellent work.`);

  const BEST_PRACTICES = [
    'Start with the purpose, not just the company name.',
    'Define the scope and sources for your research.',
    'Ask for evidence and facts, not just conclusions or opinions.',
    'Validate and review the output before use.',
    'Enhance AI-generated presentations with human expertise.'
  ];

  return (
    <div className="flex flex-col min-h-full max-w-5xl mx-auto py-8">
      <div className="flex flex-col min-h-full py-10 items-center overflow-y-auto custom-scrollbar relative">
      {/* Confetti Background Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
        {/* We would render confetti here, currently abstracting it out with CSS magic or just empty for now */}
      </div>

      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', bounce: 0.5, duration: 0.8 }}
        className="text-center mb-12 z-10"
      >
        <div className="bg-gradient-to-r from-amber-400 to-amber-600 text-white font-extrabold px-6 py-2 rounded-full uppercase tracking-widest text-xs inline-block mb-6 shadow-lg shadow-amber-500/20">Profile Delivered!</div>
        <h1 className="text-5xl font-black text-white mb-6 tracking-tight">Mission Accomplished</h1>
        <div className="flex items-center justify-center gap-6">
          <div className="bg-[#131C31]/80 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/5 shadow-xl">
            <div className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest mb-1">Final Rank</div>
            <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-cyan-300">{rank}</div>
          </div>
          <div className="bg-[#131C31]/80 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/5 shadow-xl">
            <div className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest mb-1">Total Insight Points</div>
            <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500 drop-shadow-sm">{insightPoints}</div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-5 gap-8 mb-8 flex-1 min-h-0 w-full z-10">
        
        {/* Left Column: Recap & Coach */}
        <div className="col-span-3 bg-[#131C31]/80 backdrop-blur-md border border-white/5 rounded-3xl p-8 shadow-2xl flex flex-col overflow-y-auto custom-scrollbar">
          <h3 className="text-lg font-extrabold text-white mb-6 flex items-center gap-3">
            <CheckSquare className="text-teal-400" />
            Analyst Toolkit: Best Practices
          </h3>
          <div className="space-y-4 mb-8 flex-1">
            {BEST_PRACTICES.map((practice, idx) => (
              <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 text-slate-200 text-sm">
                <div className="bg-teal-500/20 text-teal-400 w-6 h-6 rounded-full flex items-center justify-center font-bold shrink-0">{idx + 1}</div>
                <div className="mt-0.5 leading-relaxed">{practice}</div>
              </div>
            ))}
          </div>
          <div className="bg-indigo-900/20 border border-indigo-500/20 p-6 rounded-2xl text-indigo-100 text-sm leading-relaxed">
            <strong>Coach's Wrap-up:</strong> Subject-matter expertise remains essential to challenge assumptions, verify findings, and ensure the final output is accurate, balanced and meaningful. AFA is a research partner that enhances human expertise — not a substitute for it.
          </div>
        </div>

        {/* Right Column: Badges & Goodies */}
        <div className="col-span-2 flex flex-col gap-6">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-[#131C31]/80 backdrop-blur-md rounded-3xl p-8 border border-white/5 shadow-2xl flex-1"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-rose-500"></div>
            <h3 className="text-lg font-extrabold text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center"><Award size={16} /></span>
              Your Badge Wall
            </h3>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              {Object.values(BADGES).map(badge => {
                const isEarned = badges.includes(badge.id);
                return (
                  <div key={badge.id} className={`p-4 rounded-xl border flex flex-col items-center text-center transition-all ${
                    isEarned ? 'bg-amber-500/10 border-amber-500/30 shadow-lg shadow-amber-500/10' : 'bg-white/5 border-white/5 opacity-50 grayscale'
                  }`}>
                    <Award size={28} className={isEarned ? 'text-amber-400 mb-2 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]' : 'text-slate-600 mb-2'} />
                    <div className="text-[11px] font-extrabold text-white mb-1 uppercase tracking-wider">{badge.name}</div>
                    <div className="text-[9px] text-slate-400">{badge.description}</div>
                  </div>
                );
              })}
            </div>

            <button 
              onClick={() => alert("Downloading your goodies zip file...")}
              className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-extrabold py-4 rounded-xl transition-all shadow-lg hover:shadow-cyan-500/25 uppercase tracking-widest text-xs"
            >
              <Download size={16} /> Download My Goodies
            </button>
          </motion.div>
        </div>
      </div>

      <div className="mt-12 flex gap-4 z-10">
        <button 
          onClick={restartGame}
          className="bg-slate-800 hover:bg-slate-700 text-white border border-white/5 font-extrabold text-xs uppercase tracking-widest py-3 px-8 rounded-full transition-all shadow-lg hover:shadow-xl"
        >
          Replay a Level
        </button>
        <button 
          onClick={restartGame}
          className="bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 font-extrabold text-xs uppercase tracking-widest py-3 px-8 rounded-full transition-all backdrop-blur-md"
        >
          Finish
        </button>
      </div>
      </div>
    </div>
  );
}
