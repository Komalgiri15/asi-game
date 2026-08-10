import { useState, useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import { motion } from 'framer-motion';
import { useVoiceover } from '../../hooks/useVoiceover';

const CHIPS = [
  { id: 'financial', text: 'financial performance', type: 'focus' },
  { id: 'competitive', text: 'competitive position', type: 'focus' },
  { id: 'growth', text: 'growth drivers', type: 'focus' },
  { id: 'risks', text: 'key risks', type: 'focus' },
  { id: 'audience', text: 'for an investment committee', type: 'audience' }
];

export function Level1Purpose() {
  const { advanceLevel, addInsightPoints, unlockBadge, unlockGoodie, updatePromptPieces } = useGame();
  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const [completed, setCompleted] = useState(false);
  const { speak } = useVoiceover("Level 1. Start with the purpose, not just the company name. A F A produces more relevant, tailored output when it knows how the profile will be used.");

  const handleChipClick = (id: string) => {
    if (completed || selectedChips.includes(id)) return;
    
    const newSelected = [...selectedChips, id];
    setSelectedChips(newSelected);
    
    // Build the prompt text for the Right Rail
    const audienceStr = newSelected.includes('audience') ? 'for an investment committee' : '[audience]';
    
    const focusSelected = CHIPS.filter(c => c.type === 'focus' && newSelected.includes(c.id)).map(c => c.text);
    const focusStr = focusSelected.length > 0 
      ? focusSelected.join(', ').replace(/, ([^,]*)$/, ' and $1') // simple sentence join
      : '[focus areas]';

    updatePromptPieces('purpose', [
      `Prepare a one-page company profile of Unilever PLC ${audienceStr}, focusing on ${focusStr}.`
    ]);
    
    // Reward points for interaction
    addInsightPoints(20 / CHIPS.length);
    
    if (newSelected.length === CHIPS.length) {
      setCompleted(true);
      unlockBadge('purpose-setter');
      unlockGoodie('purpose-prompt');
      speak("Coach's Note: By stating the audience and the decisions it supports, you help A F A focus on what's most relevant.");
    }
  };

  // Set initial prompt piece
  useEffect(() => {
    updatePromptPieces('purpose', [
      `Prepare a one-page company profile of Unilever PLC [audience], focusing on [focus areas].`
    ]);
  }, []);

  return (
    <div className="flex flex-col min-h-full max-w-2xl mx-auto py-8">
      <div className="mb-6 flex flex-col items-start">
        <div className="bg-teal-500/10 border border-teal-500/20 text-teal-300 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest mb-3">Level 1</div>
        <h2 className="text-xl font-extrabold text-white mb-2 leading-tight">Start with the purpose, not just the company name</h2>
        <p className="text-slate-400 text-sm leading-relaxed max-w-xl">
          AFA produces more relevant, tailored output when it knows how the profile will be used — the audience, the decisions it supports, and the topics that matter most.
        </p>
      </div>

      <div className="bg-[#131C31]/80 backdrop-blur-md rounded-2xl p-8 border border-white/5 shadow-2xl flex-1 flex flex-col relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500"></div>
        <div className="mb-8">
          <p className="text-slate-500 text-[10px] font-extrabold uppercase tracking-widest mb-3">Start here:</p>
          <div className="bg-[#090E17] p-4 rounded-xl font-mono text-[13px] text-slate-500 border border-white/5 line-through decoration-rose-500/50">
            Create a one-page profile of Company X.
          </div>
        </div>

        <h3 className="text-base font-bold text-slate-200 mb-5">Add the missing direction — who is it for, and what should it focus on?</h3>
        
        <div className="flex flex-wrap gap-3 mb-8">
          {CHIPS.map(chip => {
            const isSelected = selectedChips.includes(chip.id);
            return (
              <button
                key={chip.id}
                onClick={() => handleChipClick(chip.id)}
                disabled={isSelected}
                className={`text-left px-5 py-2.5 rounded-full font-bold text-[13px] transition-all duration-300 shadow-lg transform hover:-translate-y-0.5 ${
                  isSelected 
                    ? 'bg-teal-900/20 border-teal-500/20 text-teal-400/50 opacity-50 cursor-default shadow-none translate-y-0' 
                    : chip.type === 'audience' 
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 border-indigo-400/30 text-white cursor-pointer shadow-indigo-500/20'
                      : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-200 cursor-pointer backdrop-blur-sm shadow-black/20'
                } border`}
              >
                {chip.text}
              </button>
            );
          })}
        </div>

        {completed && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-auto"
          >
            <div className="bg-teal-500/10 border border-teal-500/20 text-teal-100 p-5 rounded-xl mb-6 text-[13px] flex items-start gap-3 backdrop-blur-md">
              <div className="text-teal-400 font-extrabold mt-0.5">Coach</div>
              <div className="leading-relaxed opacity-90">By stating the audience and the decisions it supports, you help AFA focus on what's most relevant — not a generic company overview.</div>
            </div>
            
            <button 
              onClick={advanceLevel}
              className="w-full bg-slate-800 hover:bg-slate-700 border border-white/5 text-white font-extrabold uppercase tracking-widest text-xs py-4 px-6 rounded-xl transition-all shadow-xl hover:shadow-2xl hover:border-white/10"
            >
              Continue
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
