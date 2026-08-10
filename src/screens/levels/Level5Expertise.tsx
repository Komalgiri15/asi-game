import { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { motion } from 'framer-motion';
import { useVoiceover } from '../../hooks/useVoiceover';


const REFINEMENTS = [
  { id: 'design', label: 'Slide design' },
  { id: 'hierarchy', label: 'Visual hierarchy' },
  { id: 'placement', label: 'Content placement' },
  { id: 'formatting', label: 'Formatting consistency' },
  { id: 'branding', label: 'Branding standards' },
  { id: 'chart', label: 'Chart selection' },
  { id: 'story', label: 'Storytelling' }
];

export function Level5Expertise() {
  const { advanceLevel, addInsightPoints, unlockBadge, unlockGoodie, updateRefinement } = useGame();
  const [refinements, setRefinements] = useState<Record<string, boolean>>({});
  const [delivered, setDelivered] = useState(false);

  const { speak } = useVoiceover("Level 5. Add Human Expertise. Apply the final polish to make this slide ready for the deal room.");

  const handleToggle = (key: string) => {
    if (!refinements[key]) {
      setRefinements(prev => ({ ...prev, [key]: true }));
      updateRefinement(key, true);
    }
  };

  const appliedCount = Object.keys(refinements).length;
  const canDeliver = appliedCount > 0;
  const allApplied = appliedCount === REFINEMENTS.length;

  const handleDeliver = () => {
    if (delivered) return;
    setDelivered(true);
    
    addInsightPoints(20);
    unlockBadge('human-touch');
    unlockGoodie('refinement-checklist');

    if (allApplied) {
      addInsightPoints(5); // bonus
      unlockBadge('no-shortcuts'); // bonus
    }

    addInsightPoints(15);
    unlockBadge('deal-room-ready');
    unlockGoodie('best-practices-toolkit');
    
    speak("Profile Delivered! Congratulations, you have mastered the A F A best practices.");
    
    advanceLevel();
  };

  return (
    <div className="flex flex-col min-h-full max-w-4xl mx-auto py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Level 5: Add Human Expertise</h2>
        <p className="text-slate-300 leading-relaxed text-sm">
          AI output is a draft, not a final deliverable. Human refinement of design and storytelling is what makes it meet audience expectations and Acuity's quality standards.
        </p>
      </div>

      <div className="bg-slate-900 rounded-xl p-6 border border-slate-700 shadow-lg flex-1 flex flex-col gap-6 overflow-visible min-h-0">
        {/* Mock Slide Preview */}
        <div className="flex-1 w-full bg-slate-800 rounded-xl border border-slate-700 p-6 grid place-items-center relative overflow-hidden">
          <div className="absolute top-4 left-4 text-xs font-bold text-slate-500 tracking-widest uppercase">Mock Slide Draft</div>
          
          <div className={`transition-all duration-1000 bg-white overflow-hidden relative flex flex-col ${
            refinements.design ? 'w-full max-w-2xl aspect-video rounded-2xl p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] border border-slate-200' : 'w-[80%] aspect-[4/3] p-4 rounded-sm shadow-md bg-slate-50'
          }`}>
            
            {/* Header Area */}
            <div className={`transition-all duration-700 flex flex-col ${
              refinements.hierarchy 
                ? 'border-b border-slate-200 pb-4 mb-6' 
                : 'mb-4'
            }`}>
              <div className="flex justify-between items-start">
                <div>
                  <div className={`font-black tracking-tight transition-all duration-700 ${
                    refinements.branding ? 'text-transparent bg-clip-text bg-gradient-to-r from-teal-700 to-cyan-600' : 'text-slate-800'
                  } ${refinements.hierarchy ? 'text-3xl' : 'text-lg'}`}>
                    Unilever PLC
                  </div>
                  {refinements.story && (
                    <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-sm font-medium text-slate-500 mt-2">
                      Transforming the portfolio for higher growth margins
                    </motion.div>
                  )}
                </div>
                {refinements.branding && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white font-black text-lg shadow-lg">
                    U
                  </motion.div>
                )}
              </div>
            </div>

            {/* Content Area */}
            <div className={`flex-1 transition-all duration-700 ${
              refinements.placement 
                ? 'grid grid-cols-5 gap-6' 
                : 'flex flex-col gap-3'
            }`}>
              
              {/* Left Column / Top Block */}
              <div className={`transition-all duration-700 flex flex-col justify-center ${
                refinements.placement ? 'col-span-2' : ''
              }`}>
                <div className={`transition-all duration-700 h-full flex flex-col justify-center ${
                  refinements.design 
                    ? 'bg-gradient-to-br from-slate-50 to-slate-100 p-5 rounded-2xl border border-slate-200 shadow-sm' 
                    : 'bg-slate-200 p-3'
                }`}>
                  {refinements.formatting ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Q3 Performance</div>
                      </div>
                      <div className="text-3xl font-black text-slate-800">
                        €15.2<span className="text-lg text-slate-400 ml-1">bn</span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                        Financials are robust with Q3 growth driven by exceptional pricing power and brand strength.
                      </p>
                    </motion.div>
                  ) : (
                    <span className="text-xs text-slate-800 font-mono">financials: good. Q3 up. pricing.</span>
                  )}
                </div>
              </div>

              {/* Right Column / Bottom Block */}
              <div className={`transition-all duration-700 flex items-center justify-center ${
                refinements.placement ? 'col-span-3' : 'flex-1'
              }`}>
                <div className={`w-full h-full transition-all duration-700 flex flex-col justify-end ${
                  refinements.design 
                    ? 'bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] relative overflow-hidden' 
                    : 'bg-slate-200 p-3'
                }`}>
                  {refinements.chart ? (
                    <div className="w-full h-full flex items-end justify-between gap-3 pt-6 relative z-10">
                      {[40, 55, 45, 75, 60, 90].map((height, i) => (
                        <div key={i} className="w-full relative group h-full flex flex-col justify-end">
                          <motion.div 
                            initial={{ height: 0 }}
                            animate={{ height: `${height}%` }}
                            transition={{ delay: i * 0.1, duration: 0.5, type: 'spring' }}
                            className={`w-full rounded-t-sm ${
                              refinements.branding 
                                ? i === 5 ? 'bg-gradient-to-t from-teal-500 to-cyan-400 shadow-[0_0_15px_rgba(45,212,191,0.5)]' : 'bg-slate-200'
                                : 'bg-slate-400'
                            }`}
                          ></motion.div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-slate-500 text-xs italic m-auto font-mono">[Insert chart data here]</div>
                  )}
                  
                  {refinements.design && refinements.chart && (
                    <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-50/50 to-transparent pointer-events-none"></div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Refinement Toggles */}
        <div className="w-full flex flex-col">
          <h3 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-4">Refine the Draft</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
            {REFINEMENTS.map(r => {
              const isApplied = refinements[r.id];
              return (
                <button
                  key={r.id}
                  onClick={() => handleToggle(r.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center justify-between shadow-sm group ${
                    isApplied 
                      ? 'bg-teal-500/10 border-teal-500/30 text-teal-200' 
                      : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300 hover:-translate-y-0.5'
                  }`}
                >
                  <span className={`text-xs font-bold leading-relaxed ${isApplied ? 'opacity-90' : 'opacity-100'}`}>
                    {r.label}
                  </span>
                  <div className={`w-10 h-6 rounded-full p-1 transition-colors ${isApplied ? 'bg-teal-500' : 'bg-slate-700 group-hover:bg-slate-600'}`}>
                    <motion.div 
                      className="w-4 h-4 bg-white rounded-full shadow-md"
                      animate={{ x: isApplied ? 16 : 0 }}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: canDeliver ? 1 : 0 }}
            className="mt-auto"
          >
            {allApplied && (
              <div className="bg-teal-900/30 border border-teal-700/50 text-teal-200 p-4 rounded-lg mb-4 text-xs">
                <strong>Coach's Note:</strong> The most effective use of AFA is as a research partner that enhances human expertise, not a substitute for it.
              </div>
            )}
            
            <button 
              onClick={handleDeliver}
              disabled={!canDeliver}
              className={`w-full font-bold py-4 rounded-lg transition-colors shadow-lg flex justify-center items-center gap-2 ${
                canDeliver ? 'bg-teal-600 hover:bg-teal-500 text-white' : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
              }`}
            >
              Deliver Profile
            </button>
          </motion.div>
        </div>
      </div>
      
      <div className="mt-6 bg-slate-800/50 border border-slate-700 p-6 rounded-lg text-sm text-slate-300 leading-relaxed">
        <strong>Remember:</strong> AFA can generate content and structure, but presentation outputs should be treated as drafts. Design, hierarchy, placement, formatting, branding, chart choice and storytelling usually need manual refinement to meet audience expectations and Acuity's quality standards. Creating a profile takes more than gathering information — it means understanding the business, judging relevance and credibility, spotting key insights and applying analytical judgment.
      </div>
    </div>
  );
}
