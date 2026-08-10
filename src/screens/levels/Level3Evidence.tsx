import { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { motion } from 'framer-motion';


const QUADRANTS = [
  { id: 'q1', title: 'Quadrant 1 — Business model', instruction: 'use facts, no opinions or marketing language.' },
  { id: 'q2', title: 'Quadrant 2 — Key brands', instruction: 'categorise them by business segment.' },
  { id: 'q3', title: 'Quadrant 3 — Key management', instruction: 'MD, CEO, CFO, CMO — with designation and tenure.' },
  { id: 'q4', title: 'Quadrant 4 — Key news & events', instruction: 'only material developments from the last 6–12 months relevant to performance, strategy or investment profile.' }
];

const FINAL_PROMPT = `Prepare a one-page company profile PPT of Unilever PLC for an M&A deal investment committee. Use the latest available annual report, investor presentations, earnings transcripts, regulatory filings, and the company’s website as sources. Present financial figures in USD $ using the latest reported fiscal year and most recent quarter available. Need four quadrants — 1) company’s business model (facts, no opinions or marketing language); 2) key brands (categorised by business segment); 3) key management: MD, CEO, CFO, CMO with designation and tenure; 4) key news and events (only material developments from the last 6–12 months relevant to the company’s business performance, strategic direction, or investment profile). For all key facts provide the reporting period and source link in a Word doc. Separate factual information from interpretation and flag any conflicting or unavailable information.`;

export function Level3Evidence() {
  const { advanceLevel, addInsightPoints, unlockBadge, unlockGoodie, updatePromptPieces } = useGame();
  
  const [step, setStep] = useState<'evidence' | 'quadrants' | 'reveal'>('evidence');
  const [evidenceAdded, setEvidenceAdded] = useState(false);
  const [addedQuadrants, setAddedQuadrants] = useState<string[]>([]);

  const handleAddEvidence = () => {
    setEvidenceAdded(true);
    addInsightPoints(5); // Partial
    updatePromptPieces('evidence', [
      'For each key financial figure, provide the reporting period, source, and whether the figure is reported or calculated. Flag any conflicting or unavailable information.'
    ]);
  };

  const handleAddQuadrant = (id: string) => {
    if (!addedQuadrants.includes(id)) {
      const newAdded = [...addedQuadrants, id];
      setAddedQuadrants(newAdded);
      
      const promptUpdates = newAdded.map(qid => {
        const q = QUADRANTS.find(x => x.id === qid);
        return `${q?.title}: ${q?.instruction}`;
      });
      updatePromptPieces('evidence', [
        'For each key financial figure, provide the reporting period, source, and whether the figure is reported or calculated. Flag any conflicting or unavailable information.',
        ...promptUpdates
      ]);

      if (newAdded.length === QUADRANTS.length) {
        setStep('reveal');
        unlockBadge('evidence-hunter');
        unlockBadge('prompt-architect');
        unlockGoodie('master-prompt');
        addInsightPoints(25); // the big payoff
        
        // Override the ENTIRE prompt in RightRail by hacking the pieces to just contain the Final Prompt
        updatePromptPieces('purpose', []);
        updatePromptPieces('scope', []);
        updatePromptPieces('evidence', [FINAL_PROMPT]);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-full max-w-2xl mx-auto py-8">
      <div className="mb-6 flex flex-col items-start">
        <div className="bg-teal-500/10 border border-teal-500/20 text-teal-300 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest mb-3">Level 3</div>
        <h2 className="text-xl font-extrabold text-white mb-2 leading-tight">Demand evidence, not opinions</h2>
        <p className="text-slate-400 text-sm leading-relaxed max-w-xl">
          Force AFA to rely on hard facts rather than subjective language, and structure the output into the 4 requested quadrants.
        </p>
      </div>

      <div className="bg-[#131C31]/80 backdrop-blur-md rounded-2xl p-8 border border-white/5 shadow-2xl flex-1 flex flex-col relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-emerald-500 to-teal-500"></div>

        {step === 'evidence' && (
          <div className="flex flex-col h-full justify-center">
            <h3 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-4">Quality Rule Toggle</h3>
            <button
              onClick={handleAddEvidence}
              className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-300 shadow-sm ${
                evidenceAdded
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                  : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
              }`}
            >
              <span className="font-extrabold text-sm tracking-wide">
                {evidenceAdded ? 'STRICT: rely on reported data' : 'LOOSE: allow subjective summaries'}
              </span>
              <div className={`w-10 h-6 rounded-full p-1 transition-colors ${evidenceAdded ? 'bg-emerald-500' : 'bg-rose-500'}`}>
                <motion.div 
                  className="w-4 h-4 bg-white rounded-full shadow-md"
                  animate={{ x: evidenceAdded ? 16 : 0 }}
                />
              </div>
            </button>

            {evidenceAdded && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 flex flex-col items-center">
                <div className="bg-teal-900/30 border border-teal-700/50 text-teal-200 p-4 rounded-lg text-sm mb-8">
                  <strong>Coach's Note:</strong> Asking for facts, sources and reporting periods — and separating fact from interpretation — improves the depth, accuracy and usability of the profile.
                </div>
                <button 
                  onClick={() => setStep('quadrants')}
                  className="w-full max-w-md bg-teal-600 hover:bg-teal-500 text-white font-bold py-4 px-6 rounded-lg transition-colors shadow-lg"
                >
                  Build the four quadrants
                </button>
              </motion.div>
            )}
          </div>
        )}

        {step === 'quadrants' && (
          <>
            <h3 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-4">Build the 4 Quadrants</h3>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {QUADRANTS.map(q => {
                const isSelected = addedQuadrants.includes(q.id);
                return (
                  <button
                    key={q.id}
                    onClick={() => handleAddQuadrant(q.id)}
                    disabled={isSelected}
                    className={`p-3 rounded-xl border text-left transition-all duration-300 transform hover:-translate-y-0.5 ${
                      isSelected
                        ? 'bg-teal-500/10 border-teal-500/20 text-teal-300 opacity-60 shadow-none translate-y-0'
                        : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-200 cursor-pointer shadow-lg shadow-black/20'
                    }`}
                  >
                    <div className="text-[9px] font-extrabold uppercase tracking-widest opacity-60 mb-1">{q.title}</div>
                    <div className="text-xs font-bold">{q.instruction}</div>
                  </button>
                );
              })}
            </div>
          </>
        )}

        {step === 'reveal' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col h-full"
          >
            <div className="bg-slate-950 p-6 rounded-xl border border-emerald-500/50 text-emerald-100 font-mono text-sm leading-relaxed mb-8 shadow-inner relative">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/20 to-transparent pointer-events-none"></div>
              {FINAL_PROMPT}
            </div>

            <div className="mt-auto">
              <div className="bg-teal-500/10 border border-teal-500/20 text-teal-100 p-5 rounded-xl mb-6 text-[13px] flex items-start gap-3 backdrop-blur-md">
                <div className="text-teal-400 font-extrabold mt-0.5">Coach</div>
                <div className="leading-relaxed opacity-90">By explicitly structuring the output and demanding evidence, you've transformed a weak prompt into a powerful research directive.</div>
              </div>
            
              <button 
                onClick={advanceLevel}
                className="w-full bg-slate-800 hover:bg-slate-700 border border-white/5 text-white font-extrabold uppercase tracking-widest text-xs py-4 px-6 rounded-xl transition-all shadow-xl hover:shadow-2xl hover:border-white/10"
              >
                Continue
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
