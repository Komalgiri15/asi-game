import { useEffect, useRef, useState, useCallback } from 'react';
import { basicProfile, improvedProfile } from '../data/modules';

interface IntroScreenProps {
  onComplete: () => void;
}

type Stage =
  | 'typing-generic'    // typing the bad prompt
  | 'show-generic'      // full image of generic output
  | 'typing-improved'   // typing the good prompt
  | 'show-improved'     // full image of improved output
  | 'exit';             // fade out

const GENERIC_PROMPT = `Create a one pager profile in PPT format of Unilever Plc with 4 quadrants.`;

const IMPROVED_PROMPT = `Prepare a one-page Unilever PLC profile for an M&A investment committee. Focus on: financial performance, competitive position, growth drivers, key risks. Use latest annual report, investor presentations, earnings transcripts, regulatory filings. Present all figures in USD, latest fiscal year and most recent quarter. Four quadrants: business model (facts only), brands by segment, key management with tenure, material news (6–12 months). Provide source links in a Word doc. Separate facts from interpretation; flag conflicting or unavailable information.`;

const TYPING_SPEED_GENERIC = 28;   // ms per char — fast but readable
const TYPING_SPEED_IMPROVED = 12;  // faster for the longer prompt

export function IntroScreen({ onComplete }: IntroScreenProps) {
  const [stage, setStage] = useState<Stage>('typing-generic');
  const [typedText, setTypedText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const indexRef = useRef(0);

  const handleComplete = useCallback(() => {
    setIsExiting(true);
    timerRef.current = setTimeout(onComplete, 500);
  }, [onComplete]);

  // Blink cursor
  useEffect(() => {
    const id = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  // Typing engine
  useEffect(() => {
    const prompt = stage === 'typing-generic' ? GENERIC_PROMPT : IMPROVED_PROMPT;
    const speed = stage === 'typing-generic' ? TYPING_SPEED_GENERIC : TYPING_SPEED_IMPROVED;

    if (stage !== 'typing-generic' && stage !== 'typing-improved') return;

    setTypedText('');
    indexRef.current = 0;

    function typeNext() {
      if (indexRef.current > prompt.length) {
        // Done typing — pause then show image
        timerRef.current = setTimeout(() => {
          setStage(stage === 'typing-generic' ? 'show-generic' : 'show-improved');
        }, 600);
        return;
      }
      setTypedText(prompt.slice(0, indexRef.current));
      indexRef.current++;
      timerRef.current = setTimeout(typeNext, speed);
    }

    timerRef.current = setTimeout(typeNext, 400);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [stage]);

  // Auto-advance from image views
  useEffect(() => {
    if (stage === 'show-generic') {
      timerRef.current = setTimeout(() => setStage('typing-improved'), 2800);
      return () => { if (timerRef.current) clearTimeout(timerRef.current); };
    }
    if (stage === 'show-improved') {
      timerRef.current = setTimeout(() => handleComplete(), 3200);
      return () => { if (timerRef.current) clearTimeout(timerRef.current); };
    }
  }, [stage, handleComplete]);

  const isTyping = stage === 'typing-generic' || stage === 'typing-improved';
  const isGeneric = stage === 'typing-generic' || stage === 'show-generic';

  return (
    <div
      className={`intro2 ${isExiting ? 'intro2--exit' : ''}`}
      onClick={() => {
        if (timerRef.current) clearTimeout(timerRef.current);
        if (stage === 'typing-generic') { setStage('show-generic'); return; }
        if (stage === 'show-generic')   { setStage('typing-improved'); return; }
        if (stage === 'typing-improved'){ setStage('show-improved'); return; }
        if (stage === 'show-improved')  { handleComplete(); return; }
      }}
    >
      {/* ── Top bar ── */}
      <div className="intro2-topbar">
        <span className="intro2-brand">Acuity Analytics · AFA</span>
        <span className="intro2-title">Company Profile Best Practices</span>
        <div className="intro2-steps">
          <span className={`intro2-step ${isGeneric ? 'intro2-step--active' : 'intro2-step--done'}`}>
            <span className="intro2-step-dot" />
            Generic prompt
          </span>
          <span className="intro2-step-line" />
          <span className={`intro2-step ${!isGeneric ? 'intro2-step--active' : ''}`}>
            <span className="intro2-step-dot" />
            Structured prompt
          </span>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="intro2-body">

        {/* Typing prompt panel — shown during typing stages */}
        {isTyping && (
          <div className="intro2-terminal-wrap intro2-fadein">
            <div className="intro2-terminal">
              <div className="intro2-terminal-header">
                <span className="intro2-dot intro2-dot--red" />
                <span className="intro2-dot intro2-dot--yellow" />
                <span className="intro2-dot intro2-dot--green" />
                <span className="intro2-terminal-title">
                  {stage === 'typing-generic' ? 'AFA Prompt — Basic' : 'AFA Prompt — Structured'}
                </span>
              </div>
              <div className="intro2-terminal-body">
                <span className="intro2-prompt-prefix">{'> '}</span>
                <span className="intro2-prompt-text">{typedText}</span>
                <span
                  className="intro2-cursor"
                  style={{ opacity: cursorVisible ? 1 : 0 }}
                />
              </div>
              {stage === 'typing-generic' && (
                <div className="intro2-terminal-badge intro2-terminal-badge--warn">
                  ⚠ Generic — no audience, sources, structure, or reporting period
                </div>
              )}
              {stage === 'typing-improved' && (
                <div className="intro2-terminal-badge intro2-terminal-badge--good">
                  ✓ Investment-grade — purpose, sources, format, and evidence all defined
                </div>
              )}
            </div>
            <p className="intro2-hint">Click anywhere to skip typing</p>
          </div>
        )}

        {/* Full image — generic */}
        {stage === 'show-generic' && (
          <div className="intro2-image-view intro2-fadein">
            <div className="intro2-image-header intro2-image-header--generic">
              <span className="intro2-image-tag">Generic Prompt Output</span>
              <span className="intro2-image-caption">High-level overview — limited investment-grade depth</span>
            </div>
            <div className="intro2-image-frame">
              <img src={basicProfile} alt="Generic prompt output — Unilever PLC" />
            </div>
            <p className="intro2-hint">Click to continue →</p>
          </div>
        )}

        {/* Full image — improved */}
        {stage === 'show-improved' && (
          <div className="intro2-image-view intro2-fadein">
            <div className="intro2-image-header intro2-image-header--improved">
              <span className="intro2-image-tag">Structured Prompt Output</span>
              <span className="intro2-image-caption">Investment-ready — facts, sources, structured quadrants, management tenure</span>
            </div>
            <div className="intro2-image-frame intro2-image-frame--glow">
              <img src={improvedProfile} alt="Structured prompt output — Unilever PLC" />
            </div>
            <p className="intro2-hint">Click to begin →</p>
          </div>
        )}

      </div>

      {/* Skip button */}
      <button
        className="intro2-skip"
        onClick={(e) => { e.stopPropagation(); handleComplete(); }}
      >
        Skip intro
      </button>
    </div>
  );
}
