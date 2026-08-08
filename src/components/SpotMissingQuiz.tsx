import { useState } from 'react';
import { FeedbackBanner, ActionButton } from './AppFrame';
import { SpotMissingChallenge } from '../types/game';
import { useAutoVoiceover } from '../hooks/useVoiceover';

interface SpotMissingQuizProps {
  challenge: SpotMissingChallenge;
  onComplete: (points: number) => void;
}

export function SpotMissingQuiz({ challenge, onComplete }: SpotMissingQuizProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [submitted, setSubmitted] = useState(false);

  useAutoVoiceover(
    `${challenge.question} ${challenge.sampleText} Click all issues you spot. ${challenge.requiredCount} to find.`,
  );

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
    const hits = correctIds.filter((id) => selected.has(id)).length;
    const points = Math.round(challenge.points * (hits / challenge.requiredCount));

    setTimeout(() => onComplete(points), 1400);
  };

  const getState = (id: string, correct: boolean) => {
    if (!submitted) return selected.has(id) ? 'selected' : '';
    if (correct && selected.has(id)) return 'correct';
    if (correct && !selected.has(id)) return 'missed';
    if (!correct && selected.has(id)) return 'wrong';
    return '';
  };

  return (
    <div className="challenge spot-missing">
      <h2 className="challenge-question">{challenge.question}</h2>
      <div className="sample-output">
        <span className="sample-label">{challenge.sampleLabel}</span>
        <p className="sample-text">{challenge.sampleText}</p>
      </div>
      <p className="challenge-instruction">
        Click all issues you spot ({challenge.requiredCount} to find):
      </p>
      <div className="chip-grid spot-missing-grid">
        {challenge.options.map((opt) => (
          <button
            key={opt.id}
            type="button"
            className={`chip-option ${getState(opt.id, opt.correct)}`}
            onClick={() => toggle(opt.id)}
            disabled={submitted}
          >
            {opt.text}
          </button>
        ))}
      </div>
      {submitted && (
        <FeedbackBanner
          type="info"
          message="Investment-grade profiles need facts, sources, reporting periods, and clear separation from interpretation."
        />
      )}
      {!submitted && (
        <div className="challenge-actions">
          <ActionButton
            label={`Submit Analysis (${selected.size})`}
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
