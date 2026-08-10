import { ReactNode, useState } from 'react';
import { useGame } from '../context/GameContext';
import { LEVELS, BADGES, GOODIES } from '../data/dealRoomData';
import { getRank } from '../types/game';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Gift, Check, Volume2, VolumeX } from 'lucide-react';
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
  const { insightPoints, badges, unlockedGoodies, currentLevel, phase, isMuted, toggleMute } = useGame();
  const rank = getRank(currentLevel, phase);
  const [showBadges, setShowBadges] = useState(false);
  const [showGoodies, setShowGoodies] = useState(false);

  return (
    <header className="h-16 flex items-center justify-between px-6 z-20 shrink-0 bg-[#0B1120] border-b border-white/5">
      {/* Branding */}
      <div className="flex items-center gap-4 shrink-0 w-64">
        <div className="font-bold text-lg tracking-tight text-white flex items-center gap-2.5">
          <div className="w-5 h-5 bg-gradient-to-br from-teal-500 to-cyan-600 rounded flex items-center justify-center shadow-sm">
            <div className="w-2 h-2 bg-white rounded-sm opacity-90"></div>
          </div>
          <span>Acuity <span className="text-slate-400 font-light ml-0.5">Deal Room</span></span>
        </div>
      </div>
      
      {/* Professional Progress Indicator */}
      {phase === 'playing' && (
        <div className="flex-1 max-w-md mx-auto flex items-center gap-4 hidden lg:flex opacity-90">
          <div className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden flex shadow-inner">
            <motion.div 
              className="h-full bg-teal-500"
              initial={{ width: 0 }}
              animate={{ width: `${(currentLevel / (LEVELS.length - 1)) * 100}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            ></motion.div>
          </div>
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest whitespace-nowrap">
            Phase {currentLevel + 1} of {LEVELS.length}
          </span>
        </div>
      )}

      {/* Metrics and Controls */}
      <div className="flex items-center gap-5 shrink-0 justify-end w-auto lg:w-[400px]">
        
        {/* Rank */}
        <div className="flex flex-col items-end justify-center">
          <span className="text-[9px] font-semibold text-slate-500 uppercase tracking-widest mb-0.5">Current Rank</span>
          <span className="text-[13px] font-bold text-teal-400 leading-none">{rank}</span>
        </div>

        <div className="h-8 w-[1px] bg-white/10 mx-1"></div>

        {/* Insight Score */}
        <div className="flex flex-col items-end justify-center">
          <span className="text-[9px] font-semibold text-slate-500 uppercase tracking-widest mb-0.5">Insight Score</span>
          <span className="text-[13px] font-bold text-white leading-none">{insightPoints}</span>
        </div>

        <div className="h-8 w-[1px] bg-white/10 mx-1"></div>

        {/* Action Icons */}
        <div className="flex items-center gap-1 relative">
          <button 
            onClick={toggleMute}
            className={`flex items-center justify-center w-8 h-8 rounded transition-colors ${isMuted ? 'text-slate-500 hover:text-slate-300' : 'text-slate-300 hover:text-white hover:bg-white/5'}`}
            title={isMuted ? "Unmute Voiceover" : "Mute Voiceover"}
          >
            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>
          
          <button 
            onClick={() => { setShowBadges(!showBadges); setShowGoodies(false); }}
            className={`flex items-center justify-center w-8 h-8 rounded transition-colors relative ${showBadges ? 'text-teal-400 bg-white/5' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}
            title="Badges"
          >
            <Award size={15} />
            {badges.length > 0 && <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-teal-500 rounded-full border border-[#0B1120]"></span>}
          </button>
          
          <button 
            onClick={() => { setShowGoodies(!showGoodies); setShowBadges(false); }}
            className={`flex items-center justify-center w-8 h-8 rounded transition-colors relative ${showGoodies ? 'text-teal-400 bg-white/5' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}
            title="Toolkit"
          >
            <Gift size={15} />
            {unlockedGoodies.length > 0 && <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-teal-500 rounded-full border border-[#0B1120]"></span>}
          </button>

          {/* Modals/Dropdowns */}
          <AnimatePresence>
            {showBadges && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                className="absolute top-12 right-12 w-64 bg-[#131C31] border border-white/10 rounded-lg shadow-2xl p-4 z-50"
              >
                <h4 className="text-[10px] font-bold text-slate-400 uppercase mb-3 border-b border-white/5 pb-2">Unlocked Badges</h4>
                {badges.length === 0 ? (
                  <div className="text-xs text-slate-500 italic">No badges yet. Keep playing!</div>
                ) : (
                  <div className="space-y-3">
                    {badges.map(bId => {
                      const b = BADGES[bId];
                      return (
                        <div key={b.id} className="flex items-start gap-3">
                          <div className="mt-0.5 text-teal-400"><Award size={14} /></div>
                          <div>
                            <div className="text-xs font-bold text-slate-200">{b.name}</div>
                            <div className="text-[10px] text-slate-400 mt-0.5 leading-snug">{b.description}</div>
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
                className="absolute top-12 right-0 w-80 bg-[#131C31] border border-white/10 rounded-lg shadow-2xl p-4 z-50"
              >
                <h4 className="text-[10px] font-bold text-slate-400 uppercase mb-3 border-b border-white/5 pb-2">Analyst Toolkit</h4>
                {unlockedGoodies.length === 0 ? (
                  <div className="text-xs text-slate-500 italic">No goodies yet. Complete levels to earn templates!</div>
                ) : (
                  <div className="space-y-3">
                    {unlockedGoodies.map(gId => {
                      const g = GOODIES[gId];
                      return (
                        <div key={g.id} className="bg-[#0B1120] rounded-md p-3 border border-white/5">
                          <div className="flex items-center gap-2 text-teal-400 font-bold mb-1">
                            <Gift size={12} /> <span className="text-xs">{g.name}</span>
                          </div>
                          <div className="text-[10px] text-slate-400 mb-2 leading-snug">{g.description}</div>
                          <div className="text-[10px] font-mono bg-[#131C31] p-2 rounded text-slate-300 whitespace-pre-wrap border border-white/5">
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
