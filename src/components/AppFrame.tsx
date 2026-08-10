import { ReactNode, useState } from 'react';
import { useGame } from '../context/GameContext';
import { LEVELS, BADGES, GOODIES } from '../data/dealRoomData';
import { getRank } from '../types/game';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Gift, Check } from 'lucide-react';
import { RightRailPanels } from './RightRailPanels';

interface AppFrameProps {
  children: ReactNode;
}

export function AppFrame({ children }: AppFrameProps) {
  const { phase, currentLevel } = useGame();
  
  if (phase === 'intro') {
    return <div className="h-full w-full relative">{children}</div>;
  }
  
  return (
    <div className="bg-[#0B1120] text-slate-100 h-full w-full absolute inset-0 flex flex-col font-sans overflow-hidden">
      <TopHUD />
      <div className="flex flex-1 overflow-hidden p-4 gap-4 max-w-[1600px] mx-auto w-full">
        <LeftNav />
        <main className="flex-[2] relative overflow-hidden bg-[#131C31] rounded-2xl border border-white/5 shadow-2xl flex flex-col">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-transparent pointer-events-none"></div>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentLevel}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex-1 min-h-0 flex flex-col w-full"
            >
              <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar relative z-10 min-h-0">
                {children}
              </div>
            </motion.div>
          </AnimatePresence>
        </main>
        {phase === 'playing' && <RightRailPanels />}
      </div>
    </div>
  );
}

function TopHUD() {
  const { insightPoints, badges, unlockedGoodies, currentLevel, phase } = useGame();
  const rank = getRank(currentLevel, phase);
  const [showBadges, setShowBadges] = useState(false);
  const [showGoodies, setShowGoodies] = useState(false);

  return (
    <header className="h-14 flex items-center justify-between px-8 z-20 shrink-0">
      <div className="flex items-center gap-4">
        <div className="font-extrabold text-lg tracking-tight text-white flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-md shadow-lg shadow-teal-500/20 flex items-center justify-center">
            <div className="w-3 h-3 bg-[#0B1120] rounded-sm"></div>
          </div>
          <span>Acuity<span className="text-slate-400 font-medium ml-1">Deal Room</span></span>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3 bg-white/5 px-4 py-1.5 rounded-full border border-white/5 backdrop-blur-md">
          <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Rank</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-cyan-300 font-extrabold">{rank}</span>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="text-right leading-none">
            <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500 drop-shadow-sm">{insightPoints}</div>
            <div className="text-[9px] text-slate-500 uppercase tracking-widest font-bold mt-1">Insight Pts</div>
          </div>
        </div>

        <div className="flex items-center gap-2 border-l border-white/10 pl-6 relative">
          <button 
            onClick={() => { setShowBadges(!showBadges); setShowGoodies(false); }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors ${showBadges ? 'bg-slate-700 text-amber-300' : 'hover:bg-slate-800 text-slate-300'}`}
          >
            <Award size={18} className={badges.length > 0 ? 'text-amber-400' : 'text-slate-500'} />
            <span className="text-sm font-medium">{badges.length}</span>
          </button>
          
          <button 
            onClick={() => { setShowGoodies(!showGoodies); setShowBadges(false); }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors ${showGoodies ? 'bg-slate-700 text-teal-300' : 'hover:bg-slate-800 text-slate-300'}`}
          >
            <Gift size={18} className={unlockedGoodies.length > 0 ? 'text-teal-400' : 'text-slate-500'} />
            <span className="text-sm font-medium">{unlockedGoodies.length}</span>
          </button>

          {/* Modals/Dropdowns */}
          <AnimatePresence>
            {showBadges && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                className="absolute top-12 right-12 w-64 bg-slate-800 border border-slate-600 rounded-lg shadow-xl p-4 z-50"
              >
                <h4 className="text-xs font-bold text-slate-400 uppercase mb-3 border-b border-slate-700 pb-2">Unlocked Badges</h4>
                {badges.length === 0 ? (
                  <div className="text-sm text-slate-500 italic">No badges yet. Keep playing!</div>
                ) : (
                  <div className="space-y-3">
                    {badges.map(bId => {
                      const b = BADGES[bId];
                      return (
                        <div key={b.id} className="flex items-start gap-3">
                          <div className="mt-0.5 text-amber-400"><Award size={16} /></div>
                          <div>
                            <div className="text-sm font-bold text-slate-200">{b.name}</div>
                            <div className="text-xs text-slate-400">{b.description}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            )}
            
            {showGoodies && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                className="absolute top-12 right-0 w-80 bg-slate-800 border border-slate-600 rounded-lg shadow-xl p-4 z-50"
              >
                <h4 className="text-xs font-bold text-slate-400 uppercase mb-3 border-b border-slate-700 pb-2">Toolkit / Goodies</h4>
                {unlockedGoodies.length === 0 ? (
                  <div className="text-sm text-slate-500 italic">No goodies yet. Complete levels to earn templates!</div>
                ) : (
                  <div className="space-y-4">
                    {unlockedGoodies.map(gId => {
                      const g = GOODIES[gId];
                      return (
                        <div key={g.id} className="bg-slate-900 rounded p-3 border border-slate-700">
                          <div className="flex items-center gap-2 text-teal-300 font-bold mb-1">
                            <Gift size={14} /> <span className="text-sm">{g.name}</span>
                          </div>
                          <div className="text-xs text-slate-400 mb-2">{g.description}</div>
                          <div className="text-xs font-mono bg-slate-950 p-2 rounded text-slate-300 whitespace-pre-wrap">
                            {g.content}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}

function LeftNav() {
  const { currentLevel, phase } = useGame();
  
  if (phase !== 'playing') return null;

  return (
    <aside className="w-64 bg-[#131C31] border border-white/5 rounded-2xl p-6 flex flex-col shadow-xl">
      <div className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest mb-8">Mission Path</div>
      <nav className="flex-1 relative">
        <div className="absolute left-3 top-2 bottom-6 w-0.5 bg-slate-800/50 z-0"></div>
        <ul className="space-y-8 relative z-10">
          {LEVELS.map((level, i) => {
            const isCompleted = i < currentLevel;
            const isActive = i === currentLevel;
            const isLocked = i > currentLevel;
            
            let dotColor = "bg-[#0B1120] border-slate-700";
            let textColor = "text-slate-500";
            let glow = "";
            
            if (isActive) {
              dotColor = "bg-[#0B1120] border-teal-400";
              textColor = "text-white";
              glow = "shadow-[0_0_15px_rgba(45,212,191,0.4)]";
            } else if (isCompleted) {
              dotColor = "bg-teal-900/50 border-teal-700";
              textColor = "text-slate-300";
            }

            return (
              <li key={level.id} className={`flex items-start gap-4 transition-all duration-300 ${isLocked ? 'opacity-40' : ''} ${isActive ? 'scale-105 transform origin-left' : ''}`}>
                <div className={`mt-1 w-6 h-6 rounded-full flex items-center justify-center border-2 ${dotColor} ${glow} relative z-10 transition-all duration-300`}>
                  {isCompleted ? <Check size={12} className="text-teal-400" /> : <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-teal-400' : 'bg-transparent'}`}></div>}
                </div>
                <div className="flex-1 pt-0.5">
                  <div className={`text-sm font-bold leading-tight mb-1 transition-colors ${textColor}`}>{level.title}</div>
                  {isActive && (
                    <motion.div initial={{opacity:0, height:0}} animate={{opacity:1, height:'auto'}} className="text-[10px] text-slate-400 leading-relaxed font-medium">
                      {level.intent}
                    </motion.div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
