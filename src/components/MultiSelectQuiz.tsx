import { useState } from 'react';
import { FeedbackBanner, ActionButton } from './AppFrame';
import { MultiSelectChallenge } from '../types/game';

interface MultiSelectQuizProps {
  challenge: MultiSelectChallenge;
  onComplete: (points: number) => void;
}

export function MultiSelectQuiz({ challenge, onComplete }: MultiSelectQuizProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [submitted, setSubmitted] = useState(false);

  const toggle = (id: string) => {
    if (submitted) return;
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSubmit = () => {
    if (submitted) return;
    setSubmitted(true);

    const correctIds = challenge.options.filter((o) => o.correct).map((o) => o.id);
    const correctSelected = correctIds.filter((id) => selected.has(id)).length;
    const wrongSelected = [...selected].filter((id) => !correctIds.includes(id)).length;
    const accuracy = Math.max(0, correctSelected - wrongSelected) / challenge.requiredCount;
    const points = Math.round(challenge.points * Math.min(1, accuracy));

    setTimeout(() => onComplete(points), 1400);
  };

  const getOptionState = (id: string, correct: boolean) => {
    if (!submitted) return selected.has(id) ? 'selected' : '';
    if (correct) return 'correct';
    if (selected.has(id)) return 'wrong';
    return '';
  };

  return (
    <div className="challenge multi-select">
      <h2 className="challenge-question">{challenge.question}</h2>
      <p className="challenge-instruction">{challenge.instruction}</p>
      <div className="chip-grid">
        {challenge.options.map((opt) => (
          <button
            key={opt.id}
            type="button"
            className={`chip-option ${getOptionState(opt.id, opt.correct)}`}
            onClick={() => toggle(opt.id)}
            disabled={submitted}
          >
            <span className="chip-check">{selected.has(opt.id) ? '✓' : ''}</span>
            {opt.text}
          </button>
        ))}
      </div>
      {submitted && (
        <FeedbackBanner
          type={selected.size >= challenge.requiredCount ? 'success' : 'info'}
          message={
            selected.size >= challenge.requiredCount
              ? 'Nice work! Primary sources and scope elements identified.'
              : 'Some selections were off — review the briefing tip and try to remember for next time.'
          }
        />
      )}
      {!submitted && (
        <div className="challenge-actions">
          <ActionButton
            label={`Confirm Selection (${selected.size})`}
            onClick={handleSubmit}
            disabled={selected.size === 0}
            size="lg"
            variant="coral"
          />
        </div>
      )}
    </div>
  );
}
