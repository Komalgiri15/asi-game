import { useGame } from '../context/GameContext';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';

export function RightRailPanels() {
  return (
    <aside className="w-[400px] flex flex-col gap-4 relative z-10 shrink-0">
      <PromptBuilderPanel />
      <ProfilePreviewPanel />
    </aside>
  );
}

function PromptBuilderPanel() {
  const { promptPieces, currentLevel } = useGame();
  
  // The prompt visually grows. 
  // Let's gather all pieces to display.
  const pieces = [
    ...(currentLevel === 0 ? ['Create a one pager profile in PPT format of Unilever Plc with 4 quadrants.'] : []),
    ...promptPieces.purpose,
    ...promptPieces.scope,
    ...promptPieces.evidence
  ];

  return (
    <div className="flex-1 flex flex-col bg-[#131C31] rounded-2xl border border-white/5 shadow-xl overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/5">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
        </div>
        <h3 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest ml-2">AFA Prompt Builder</h3>
      </div>
      
      <div className="flex-1 bg-[#090E17] p-5 overflow-y-auto font-mono text-[13px] relative custom-scrollbar leading-relaxed">
        {pieces.length === 0 && currentLevel > 0 ? (
          <div className="text-slate-600 italic">Waiting for input...</div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {pieces.map((piece, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-teal-200/90"
                >
                  <span className="text-teal-500/50 mr-2 select-none">❯</span>{piece}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}

function ProfilePreviewPanel() {
  const { currentLevel, validationChecks, refinements } = useGame();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-200, 200], [4, -4]);
  const rotateY = useTransform(x, [-200, 200], [-4, 4]);

  function handleMouseMove(e: React.MouseEvent) {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.x + rect.width / 2;
    const centerY = rect.y + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div 
      style={{ rotateX, rotateY, perspective: 1200 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="flex-[1.5] flex flex-col bg-[#131C31] rounded-2xl border border-white/5 shadow-2xl overflow-hidden relative"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[80px] pointer-events-none"></div>
      
      <div className="flex items-center gap-2 px-5 py-4 shrink-0">
        <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]"></div>
        <h3 className="text-[10px] font-extrabold text-slate-300 uppercase tracking-widest">Profile Preview</h3>
      </div>
      
      <div className="flex-1 px-5 pb-5 overflow-hidden flex flex-col" style={{ transformStyle: 'preserve-3d' }}>
        <motion.div 
          style={{ translateZ: 30 }}
          className="flex-1 bg-gradient-to-br from-white to-slate-100 rounded-xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden relative flex flex-col border border-white/60"
        >
        <div className="absolute inset-0 p-5 overflow-y-auto">
          {currentLevel === 0 && (
             <div className="animate-pulse">
                <div className="h-6 w-3/4 bg-slate-200 rounded mb-4"></div>
                <div className="space-y-2">
                  <div className="h-3 w-full bg-slate-100 rounded"></div>
                  <div className="h-3 w-full bg-slate-100 rounded"></div>
                  <div className="h-3 w-2/3 bg-slate-100 rounded"></div>
                </div>
                <div className="mt-6 text-xs text-slate-400 text-center border-t pt-4">
                  "Unilever is a world-leading consumer goods company with iconic brands loved globally. Revenue is strong and growing. The company has excellent management and a bright future ahead."
                </div>
             </div>
          )}

          {currentLevel > 0 && currentLevel < 3 && (
             <div>
                <h4 className="text-sm font-bold text-slate-800 mb-2 border-b pb-1">Unilever PLC Profile</h4>
                <div className="grid grid-cols-2 gap-4 mt-4">
                   <div className="h-20 bg-slate-100 rounded border border-slate-200"></div>
                   <div className="h-20 bg-slate-100 rounded border border-slate-200"></div>
                </div>
             </div>
          )}

          {currentLevel >= 3 && (
             <div className={`transition-all duration-500 ${refinements['design'] ? 'font-serif' : 'font-sans'}`}>
                <header className={`mb-4 pb-2 border-b-2 ${refinements['design'] ? 'border-teal-800' : 'border-slate-300'}`}>
                  <h4 className={`text-sm font-bold ${refinements['design'] ? 'text-teal-900' : 'text-slate-800'}`}>
                    UNILEVER PLC {currentLevel >= 5 ? '— M&A INVESTMENT COMMITTEE PROFILE' : ''}
                  </h4>
                  {validationChecks['c2'] && <div className="text-[10px] text-slate-500 mt-1">As of Q3 2023 | Figures in USD</div>}
                </header>

                <div className="grid grid-cols-2 gap-3">
                  {/* Q1: Business Model */}
                  <div className="bg-slate-50 p-2 rounded border border-slate-200 transition-colors duration-500" style={{ backgroundColor: validationChecks['c3'] ? '#f0fdf4' : '' }}>
                    <h5 className="text-[10px] font-bold text-slate-600 mb-1">BUSINESS MODEL</h5>
                    <div className="text-[9px] text-slate-500">
                      {validationChecks['c3'] ? 'Reported turnover €60.1bn (2022). Operates across Beauty, Personal Care, Home Care, Nutrition, Ice Cream.' : 'Revenue is strong and growing.'}
                    </div>
                  </div>
                  {/* Q2: Brands */}
                  <div className="bg-slate-50 p-2 rounded border border-slate-200">
                    <h5 className="text-[10px] font-bold text-slate-600 mb-1">BRANDS BY SEGMENT</h5>
                    <div className="text-[9px] text-slate-500">
                      {refinements['structure'] ? 'Organized by 5 Business Groups. 14 billion-euro brands.' : 'Has iconic brands loved globally.'}
                    </div>
                  </div>
                  {/* Q3: Management */}
                  <div className="bg-slate-50 p-2 rounded border border-slate-200 transition-colors duration-500" style={{ backgroundColor: validationChecks['c9'] ? '#f0fdf4' : '' }}>
                    <h5 className="text-[10px] font-bold text-slate-600 mb-1">KEY MANAGEMENT</h5>
                    <div className="text-[9px] text-slate-500">
                      {validationChecks['c9'] ? 'Hein Schumacher (CEO, appt 2023), Fernando Fernandez (CFO, appt 2024).' : 'Excellent management team.'}
                    </div>
                  </div>
                  {/* Q4: News */}
                  <div className="bg-slate-50 p-2 rounded border border-slate-200 transition-colors duration-500" style={{ backgroundColor: validationChecks['c6'] ? '#f0fdf4' : '' }}>
                    <h5 className="text-[10px] font-bold text-slate-600 mb-1">MATERIAL NEWS (6-12M)</h5>
                    <div className="text-[9px] text-slate-500">
                      {validationChecks['c6'] ? 'Announced Action Plan (Oct 2023). Ice Cream separation planned.' : 'Bright future ahead.'}
                    </div>
                  </div>
                </div>

                {currentLevel >= 4 && validationChecks['c2'] && (
                  <div className="mt-6 text-[8px] text-slate-400 border-t pt-3 transition-opacity duration-500 opacity-100 uppercase tracking-widest font-medium">
                    Sources: FY22 Annual Report, Q3 2023 Earnings Release, Company Website.
                  </div>
                )}
             </div>
          )}
        </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
