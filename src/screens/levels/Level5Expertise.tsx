import { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { motion } from 'framer-motion';


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
          
          <div className={`transition-all duration-700 bg-white shadow-2xl overflow-hidden relative flex flex-col ${
            refinements.design ? 'w-[90%] aspect-video rounded-md p-6' : 'w-full aspect-[4/3] p-4 rounded-sm'
          }`}>
            <div className={`transition-all duration-700 ${refinements.hierarchy ? 'border-b-2 border-slate-900 pb-2 mb-4' : 'mb-2'}`}>
              <div className={`font-bold transition-all duration-700 ${
                refinements.branding ? 'text-teal-700' : 'text-black'
              } ${refinements.hierarchy ? 'text-2xl' : 'text-lg'}`}>Unilever PLC</div>
              {refinements.story && <div className="text-sm text-slate-500 mt-1">Transforming the portfolio for higher growth margins</div>}
            </div>

            <div className={`flex-1 transition-all duration-700 ${refinements.placement ? 'grid grid-cols-2 gap-4' : 'flex flex-col gap-2'}`}>
              <div className={`bg-slate-100 p-3 transition-all ${refinements.formatting ? 'rounded-lg text-sm leading-relaxed' : 'text-xs'}`}>
                {refinements.formatting ? 'Financials are robust with Q3 growth driven by pricing power.' : 'financials: good. Q3 up. pricing.'}
              </div>
              <div className="bg-slate-100 p-3 flex items-center justify-center">
                {refinements.chart ? (
                  <div className="flex items-end gap-2 h-full py-4">
                    <div className="w-4 bg-teal-200 h-1/3"></div>
                    <div className="w-4 bg-teal-400 h-2/3"></div>
                    <div className="w-4 bg-teal-600 h-full"></div>
                  </div>
                ) : (
                  <div className="text-slate-400 text-xs italic">[Insert chart]</div>
                )}
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
