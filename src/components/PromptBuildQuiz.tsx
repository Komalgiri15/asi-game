import { useMemo, useState } from 'react';
import { FeedbackBanner, ActionButton } from './AppFrame';
import { PromptBuildChallenge } from '../types/game';

interface PromptBuildQuizProps {
  challenge: PromptBuildChallenge;
  onComplete: (points: number) => void;
}

export function PromptBuildQuiz({ challenge, onComplete }: PromptBuildQuizProps) {
  const shuffled = useMemo(
    () => [...challenge.pieces].sort(() => Math.random() - 0.5),
    [challenge.pieces],
  );

  const [remaining, setRemaining] = useState(shuffled);
  const [built, setBuilt] = useState<typeof challenge.pieces>([]);
  const [submitted, setSubmitted] = useState(false);
  const [wrongPick, setWrongPick] = useState(false);

  const nextOrder = built.length + 1;

  const handlePick = (piece: (typeof challenge.pieces)[number]) => {
    if (submitted) return;

    if (piece.order === nextOrder) {
      setBuilt((b) => [...b, piece]);
      setRemaining((r) => r.filter((p) => p.id !== piece.id));
      setWrongPick(false);
    } else {
      setWrongPick(true);
      setTimeout(() => setWrongPick(false), 600);
    }
  };

  const handleSubmit = () => {
    if (submitted || built.length !== challenge.pieces.length) return;
    setSubmitted(true);
    const perfect = built.every((p, i) => p.order === i + 1);
    const points = perfect ? challenge.points : Math.floor(challenge.points * 0.6);
    setTimeout(() => onComplete(points), 1200);
  };

  const isComplete = built.length === challenge.pieces.length;

  return (
    <div className="challenge prompt-build">
      <h2 className="challenge-question">{challenge.question}</h2>
      <p className="challenge-instruction">{challenge.instruction}</p>

      <div className="prompt-builder">
        <div className="prompt-built">
          <span className="prompt-built-label">Your Prompt</span>
          {built.length === 0 ? (
            <p className="prompt-empty">Click pieces below in order…</p>
          ) : (
            <ol className="prompt-steps">
              {built.map((p) => (
                <li key={p.id}>{p.text}</li>
              ))}
            </ol>
          )}
        </div>

        <div className="prompt-pool">
          <span className="prompt-pool-label">
            Available Pieces {wrongPick && <em className="shake-hint"> — wrong order!</em>}
          </span>
          <div className="piece-grid">
            {remaining.map((piece) => (
              <button
                key={piece.id}
                type="button"
                className={`prompt-piece ${wrongPick ? 'shake' : ''}`}
                onClick={() => handlePick(piece)}
                disabled={submitted}
              >
                {piece.text}
              </button>
            ))}
          </div>
        </div>
      </div>

      {submitted && (
        <FeedbackBanner
          type="success"
          message="Prompt assembled! This structure aligns with M&A investment committee requirements."
        />
      )}
      {!submitted && isComplete && (
        <div className="challenge-actions">
          <ActionButton label="Confirm Prompt Structure" onClick={handleSubmit} size="lg" variant="coral" />
        </div>
      )}
    </div>
  );
}
