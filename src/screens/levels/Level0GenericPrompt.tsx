import { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { useVoiceover } from '../../hooks/useVoiceover';

export function Level0GenericPrompt() {
  const { advanceLevel, addInsightPoints } = useGame();
  const [step, setStep] = useState<'brief' | 'prompt' | 'feedback'>('brief');

  useVoiceover(
    step === 'brief' 
      ? "Welcome to the Deal Room. Your first task is to prepare a one-page company profile of Unilever PLC."
      : "Let's see what A F A gives us with a generic prompt..."
  );

  const handleRun = () => {
    setStep('feedback');
    addInsightPoints(10); // Small reward for starting
  };

  if (step === 'brief') {
    return (
      <div className="flex flex-col min-h-full max-w-2xl mx-auto py-10 justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="bg-[#131C31]/80 backdrop-blur-xl rounded-3xl p-10 border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden"
        >
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-500/10 rounded-full blur-[80px] pointer-events-none"></div>
          
          <div className="bg-teal-500/10 border border-teal-500/20 text-teal-300 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest mb-6 inline-block">Mission Brief</div>
          
          <h2 className="text-3xl font-extrabold text-white mb-6 leading-tight">Build a one-page company profile of Unilever PLC for an M&amp;A investment committee.</h2>
          
          <p className="text-base text-slate-400 leading-relaxed mb-8">
            AFA can be a powerful research companion, but its effectiveness depends on how it is used. Think of AFA as your knowledgeable research assistant. The clearer your instructions, the more relevant and insightful the output will be.
          </p>

          <div className="bg-teal-500/10 border border-teal-500/20 text-teal-100 p-5 rounded-xl mb-10 text-[13px] flex items-start gap-3 backdrop-blur-md">
            <div className="text-teal-400 font-extrabold mt-0.5">Coach</div>
            <div className="leading-relaxed opacity-90">Over five stops you'll sharpen one best practice at a time — and watch your prompt and your profile get stronger.</div>
          </div>

          <button 
            onClick={() => setStep('prompt')}
            className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-extrabold uppercase tracking-widest text-xs py-4 rounded-xl transition-all shadow-lg hover:shadow-cyan-500/25"
          >
            Meet AFA
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full max-w-2xl mx-auto py-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#131C31]/80 backdrop-blur-md rounded-2xl p-8 border border-white/5 shadow-2xl flex-1 flex flex-col relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500 via-amber-500 to-amber-500"></div>
        
        <h3 className="text-[10px] font-extrabold text-amber-500 uppercase tracking-widest mb-4">The Generic Prompt Trap</h3>
        
        <div className="bg-[#090E17] p-6 rounded-xl font-mono text-slate-400 mb-8 border border-white/5 leading-relaxed text-[13px] shadow-inner">
          "Create a one pager profile in PPT format of Unilever Plc with 4 quadrants — 1 company's business model, 2 key brands business segment, 3 Key Management, 4 Key news and events."
        </div>

        {step === 'prompt' ? (
          <button 
            onClick={handleRun}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-extrabold uppercase tracking-widest text-xs py-4 px-6 rounded-xl transition-all w-full mt-auto shadow-lg hover:shadow-cyan-500/25"
          >
            <Play size={16} className="fill-current" />
            Run in AFA
          </button>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-auto"
          >
            <div className="bg-amber-500/10 border border-amber-500/20 text-amber-100 p-5 rounded-xl mb-6 text-[13px] flex items-start gap-3 backdrop-blur-md">
              <div className="text-amber-400 font-extrabold mt-0.5">Coach</div>
              <div className="leading-relaxed opacity-90">This is a useful starting point, but it may not have the depth and insights required for professional research. Instead of just asking for a profile, let's tell AFA the purpose.</div>
            </div>
            
            <button 
              onClick={advanceLevel}
              className="w-full bg-slate-800 hover:bg-slate-700 border border-white/5 text-white font-extrabold uppercase tracking-widest text-xs py-4 px-6 rounded-xl transition-all shadow-xl hover:shadow-2xl hover:border-white/10"
            >
              Level up my prompt
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
