import { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useVoiceover } from '../../hooks/useVoiceover';

const CHECKS = [
  { id: 'c1', text: 'Is the company description accurate and aligned with current operations?' },
  { id: 'c2', text: 'Are reporting period, geography, currency and key facts correct?' },
  { id: 'c3', text: 'Do financial figures align with annual reports, filings and other primary sources?' },
  { id: 'c4', text: 'Are business segments, products, services and end markets adequately covered?' },
  { id: 'c5', text: 'Have major growth drivers and strategic initiatives been captured?' },
  { id: 'c6', text: 'Are recent developments, acquisitions, partnerships, management changes or regulatory updates accurate?' },
  { id: 'c7', text: 'Are news and event summaries relevant and free from unnecessary noise?' },
  { id: 'c8', text: 'Is the view balanced — not only positive developments?' },
  { id: 'c9', text: 'Are conclusions supported by evidence rather than assumptions or opinions?' },
  { id: 'c10', text: 'Are key dependencies (customer concentration, supplier reliance, geographic exposure) highlighted?' },
  { id: 'c11', text: 'Does the profile reflect industry dynamics and the competitive landscape?' },
  { id: 'c12', text: 'Are any material information gaps, inconsistencies or unsupported statements present?' }
];

export function Level4Validate() {
  const { advanceLevel, addInsightPoints, unlockBadge, unlockGoodie, updateValidationCheck, validationChecks } = useGame();
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [finished, setFinished] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const { speak } = useVoiceover("Level 4. Validate and review the output before use. Cross-check these claims against our trusted sources before approving.");

  const ITEMS_PER_PAGE = 4;
  const totalPages = Math.ceil(CHECKS.length / ITEMS_PER_PAGE);
  const currentChecks = CHECKS.slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE);

  const completedCount = Object.keys(validationChecks).length;
  const isAllChecked = completedCount === CHECKS.length;

  const handleCheck = (id: string) => {
    if (!checkedItems.includes(id)) {
      setCheckedItems([...checkedItems, id]);
      updateValidationCheck(id, true);
    }
  };

  const allOpened = checkedItems.length === CHECKS.length;

  const canGoNextPage = currentChecks.every(check => validationChecks[check.id]);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleContinue = () => {
    if (finished) return;
    setFinished(true);

    addInsightPoints(20);
    unlockBadge('the-validator');
    unlockGoodie('validation-checklist');
    
    speak("Coach's Note: Never blindly trust AI output. If a claim contradicts your source of truth, remove or correct it.");

    if (allOpened) {
      addInsightPoints(5); // bonus
      unlockBadge('thorough-reviewer'); // bonus
    }

    advanceLevel();
  };

  return (
    <div className="flex flex-col min-h-full max-w-4xl mx-auto py-8">
      <div className="mb-6 flex flex-col items-start">
        <div className="bg-teal-500/10 border border-teal-500/20 text-teal-300 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest mb-3">Level 4</div>
        <h2 className="text-xl font-extrabold text-white mb-2 leading-tight">Validate and review the output before use</h2>
        <p className="text-slate-400 text-sm leading-relaxed max-w-xl">
          A well-written profile is not necessarily a well-validated one. Verify accuracy, completeness, balance and evidence before relying on the output.
        </p>
      </div>

      <div className="bg-[#131C31]/80 backdrop-blur-md rounded-2xl p-8 border border-white/5 shadow-2xl flex-1 flex flex-col relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 via-cyan-500 to-indigo-500"></div>

        <div className="flex items-center justify-between mb-6">
          <h3 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Guided Review Pass</h3>
          <div className="text-[10px] font-extrabold px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-teal-400">
            {completedCount} / {CHECKS.length} VERIFIED
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-3 mb-6 min-h-[300px]">
          {currentChecks.map(check => {
            const isChecked = validationChecks[check.id] || false;
            return (
              <div key={check.id} className="relative group">
                <button
                  onClick={() => handleCheck(check.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-start gap-3 shadow-sm ${
                    isChecked 
                      ? 'bg-teal-500/10 border-teal-500/30 text-teal-200' 
                      : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300 hover:-translate-y-0.5'
                  }`}
                >
                  <div className={`mt-0.5 shrink-0 w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                    isChecked ? 'bg-teal-500 text-[#131C31]' : 'border-2 border-slate-500 text-transparent group-hover:border-slate-400'
                  }`}>
                    <Check size={14} className={isChecked ? 'opacity-100' : 'opacity-0'} strokeWidth={3} />
                  </div>
                  <div className="flex-1">
                    <div className={`text-xs font-bold leading-relaxed ${isChecked ? 'opacity-90' : 'opacity-100'}`}>
                      {check.text}
                    </div>
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-auto pt-4 border-t border-white/5"
        >
          {isAllChecked ? (
            <div className="flex flex-col gap-4">
              <div className="bg-teal-500/10 border border-teal-500/20 text-teal-100 p-5 rounded-xl text-[13px] flex items-start gap-3 backdrop-blur-md">
                <div className="text-teal-400 font-extrabold mt-0.5">Coach</div>
                <div className="leading-relaxed opacity-90">All verified! AFA is a powerful research partner, but your professional judgment is what makes the output reliable.</div>
              </div>
              <button 
                onClick={handleContinue}
                className="w-full bg-slate-800 hover:bg-slate-700 border border-white/5 text-white font-extrabold uppercase tracking-widest text-xs py-4 px-6 rounded-xl transition-all shadow-xl hover:shadow-2xl hover:border-white/10"
              >
                Continue
              </button>
            </div>
          ) : currentPage < totalPages - 1 ? (
            <div className="flex flex-col gap-4">
              <div className="bg-amber-500/10 border border-amber-500/20 text-amber-100 p-5 rounded-xl text-[13px] flex items-start gap-3 backdrop-blur-md">
                <div className="text-amber-400 font-extrabold mt-0.5 uppercase tracking-widest text-[10px]">Page {currentPage + 1} of {totalPages}</div>
                <div className="leading-relaxed opacity-90">Verify these items to continue to the next set.</div>
              </div>
              <button 
                onClick={handleNextPage}
                disabled={!canGoNextPage}
                className={`w-full font-extrabold uppercase tracking-widest text-xs py-4 px-6 rounded-xl transition-all shadow-xl ${
                  canGoNextPage 
                    ? 'bg-slate-800 hover:bg-slate-700 border border-white/5 text-white hover:shadow-2xl hover:border-white/10'
                    : 'bg-slate-800/50 text-slate-500 border border-white/5 cursor-not-allowed'
                }`}
              >
                Next Items
              </button>
            </div>
          ) : (
            <div className="bg-amber-500/10 border border-amber-500/20 text-amber-100 p-5 rounded-xl text-[13px] flex items-start gap-3 backdrop-blur-md">
              <div className="text-amber-400 font-extrabold mt-0.5 uppercase tracking-widest text-[10px]">Remember</div>
              <div className="leading-relaxed opacity-90">Review every section of the AI output. Select each checklist item above to verify the generated profile.</div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
