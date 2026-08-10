import { useState, useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import { motion } from 'framer-motion';
import { ChevronRight, Database, CheckCircle2 } from 'lucide-react';
import { useVoiceover } from '../../hooks/useVoiceover';

const DIALS = [
  { key: 'period', label: 'Reporting period', target: 'latest reported fiscal year + most recent quarter available', options: ['latest reported fiscal year + most recent quarter available', 'All time'] },
  { key: 'currency', label: 'Currency & units', target: 'USD millions', options: ['USD millions', 'EUR millions', 'Local currency'] },
  { key: 'asOf', label: '"As of" date', target: 'July 2026', options: ['July 2026', 'Today', 'December 2025'] },
  { key: 'geography', label: 'Geographic coverage', target: "set to the profile's objective", options: ["set to the profile's objective", 'Global', 'Europe only'] }
];

const SOURCES = [
  { id: 'filings', text: 'Company Filings' },
  { id: 'presentations', text: 'Investor Presentations' },
  { id: 'transcripts', text: 'Earnings Call Transcripts' },
  { id: 'sec', text: 'SEC filings (10-Ks, 10-Qs, 8-Ks)' },
  { id: 'website', text: "the company's official website" }
];

export function Level2Scope() {
  const { advanceLevel, addInsightPoints, unlockBadge, unlockGoodie, updatePromptPieces } = useGame();
  
  const [dials, setDials] = useState<Record<string, string>>({});
  const [step, setStep] = useState<'dials' | 'sources'>('dials');
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [proTipUsed] = useState(false);

  useVoiceover(
    step === 'dials' 
      ? "Level 2. Define the scope and sources for the research. Set the reporting period and company scope."
      : "Now, select the most reliable sources of truth."
  );

  const handleDial = (key: string, value: string) => {
    if (!dials[key]) addInsightPoints(2); // Partial IP
    setDials(prev => ({ ...prev, [key]: value }));
  };

  const handleSource = (id: string) => {
    if (!selectedSources.includes(id)) {
      setSelectedSources([...selectedSources, id]);
      addInsightPoints(4); // Partial IP
    }
  };

  const isDialsComplete = DIALS.every(d => dials[d.key]);
  const isSourcesComplete = selectedSources.length === SOURCES.length;
  
  useEffect(() => {
    // Live update prompt builder
    let scopeText = [];
    if (dials.period || dials.currency || dials.asOf) {
      scopeText.push(`Prepare a one-page company profile of company X using the latest reported fiscal year and most recent quarter available as of July 2026. Present financial figures in USD millions.`);
    }
    
    if (selectedSources.length > 0) {
      scopeText.push(`Use information primarily from the company’s annual report, investor presentations, earnings transcripts, and SEC filings.`);
    }

    if (proTipUsed) {
      scopeText.push(`Structure the output similar to the attached company profile sample and highlight the business model, competitive positioning, financial performance, growth drivers, and key risks.`);
    }

    updatePromptPieces('scope', scopeText);
  }, [dials, selectedSources, proTipUsed]);

  useEffect(() => {
    if (isDialsComplete && step === 'dials') {
      // Just visually transition to sources if we were building it that way
      // But user must click "Next: choose sources"
    }
    if (isDialsComplete && isSourcesComplete) {
      unlockBadge('scope-pro');
      if (proTipUsed) {
        unlockBadge('pro-tipper');
        addInsightPoints(5); // Pro tip bonus
      }
      unlockGoodie('scope-quick-card');
      addInsightPoints(5);
    }
  }, [isDialsComplete, isSourcesComplete, step, proTipUsed]);

  return (
    <div className="flex flex-col min-h-full max-w-2xl mx-auto py-8">
      <div className="mb-6 flex flex-col items-start">
        <div className="bg-teal-500/10 border border-teal-500/20 text-teal-300 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest mb-3">Level 2</div>
        <h2 className="text-xl font-extrabold text-white mb-2 leading-tight">Define the scope and sources</h2>
        <p className="text-slate-400 text-sm leading-relaxed max-w-xl">
          Set clear boundaries (period, geography, currency) and prioritise trusted primary sources to prevent hallucinated or outdated information.
        </p>
      </div>

      <div className="bg-[#131C31]/80 backdrop-blur-md rounded-2xl p-8 border border-white/5 shadow-2xl flex-1 flex flex-col relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500"></div>

        {step === 'dials' ? (
          <>
            <h3 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-4">Set Boundaries</h3>
            <div className="space-y-6 mb-8">
              {DIALS.map(dial => (
                <div key={dial.key} className="bg-white/5 p-4 rounded-xl border border-white/5">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">{dial.label}</label>
                  <div className="flex flex-wrap gap-2">
                    {dial.options.map(opt => (
                      <button 
                        key={opt}
                        onClick={() => handleDial(dial.key, opt)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          dials[dial.key] === opt 
                            ? 'bg-teal-600/20 border-teal-500/50 text-teal-300 shadow-md' 
                            : 'bg-slate-800 border-transparent text-slate-300 hover:bg-slate-700'
                        } border`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {isDialsComplete && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-auto">
                <div className="bg-teal-500/10 border border-teal-500/20 text-teal-100 p-5 rounded-xl mb-6 text-[13px] flex items-start gap-3 backdrop-blur-md">
                  <div className="text-teal-400 font-extrabold mt-0.5">Coach</div>
                  <div className="leading-relaxed opacity-90">Excellent. Bounding the scope and prioritizing official filings prevents AFA from hallucinating or pulling outdated facts.</div>
                </div>
                <button 
                  onClick={() => setStep('sources')}
                  className="w-full bg-white hover:bg-slate-200 text-slate-900 font-bold py-4 px-6 rounded-xl transition-all shadow-xl"
                >
                  Next: Choose Sources
                </button>
              </motion.div>
            )}
          </>
        ) : (
          <div className="flex flex-col h-full">
            <h3 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-4">Trusted Sources to Prioritise</h3>
            <div className="flex gap-6 mb-8">
              <div className="flex-1 space-y-2">
                {SOURCES.map(src => {
                  const isSelected = selectedSources.includes(src.id);
                  if (isSelected) return null;
                  return (
                    <button
                      key={src.id}
                      onClick={() => handleSource(src.id)}
                      className="w-full text-left p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-xs font-medium cursor-pointer flex items-center justify-between group transition-all"
                    >
                      {src.text}
                      <ChevronRight size={14} className="text-slate-500 group-hover:text-teal-400" />
                    </button>
                  );
                })}
              </div>

              <div className="flex-1 bg-[#090E17] rounded-xl border border-white/5 p-4 flex flex-col shadow-inner">
                <h4 className="text-[10px] font-extrabold text-teal-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Database size={12} /> Priority Bin
                </h4>
                <div className="space-y-2 flex-1">
                  {selectedSources.map(id => {
                    const src = SOURCES.find(s => s.id === id);
                    return (
                      <motion.div 
                        initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
                        key={id} 
                        className="p-2.5 rounded-lg bg-teal-500/10 border border-teal-500/20 text-teal-200 text-xs font-medium flex items-center gap-2"
                      >
                        <CheckCircle2 size={14} className="text-teal-400" />
                        {src?.text}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>

            {isSourcesComplete && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-auto"
              >
                <div className="bg-teal-500/10 border border-teal-500/20 text-teal-100 p-5 rounded-xl text-[13px] flex items-start gap-3 backdrop-blur-md mb-6">
                  <div className="text-teal-400 font-extrabold mt-0.5">Coach</div>
                  <div className="leading-relaxed opacity-90">Pointing AFA at trusted primary sources — and giving it a sample to match — is what turns a generic draft into a research-ready one.</div>
                </div>

                <button 
                  onClick={advanceLevel}
                  className="w-full bg-slate-800 hover:bg-slate-700 border border-white/5 text-white font-extrabold uppercase tracking-widest text-xs py-4 px-6 rounded-xl transition-all shadow-xl hover:shadow-2xl hover:border-white/10"
                >
                  Continue to Level 3
                </button>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
