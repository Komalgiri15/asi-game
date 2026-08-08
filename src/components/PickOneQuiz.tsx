import { useState } from 'react';
import { motion } from 'framer-motion';
import { FeedbackBanner, ActionButton } from './AppFrame';
import { PickOneChallenge } from '../types/game';
import { useAutoVoiceover } from '../hooks/useVoiceover';

interface PickOneQuizProps {
  challenge: PickOneChallenge;
  onComplete: (points: number) => void;
}

export function PickOneQuiz({ challenge, onComplete }: PickOneQuizProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useAutoVoiceover(challenge.question);

  const handleSubmit = () => {
    if (!selected || submitted) return;
    setSubmitted(true);
    const option = challenge.options.find((o) => o.id === selected);
    const points = option?.correct ? challenge.points : 0;
    setTimeout(() => onComplete(points), 1200);
  };

  const selectedOption = challenge.options.find((o) => o.id === selected);

  return (
    <div className="challenge pick-one">
      <h2 className="challenge-question">{challenge.question}</h2>
      <div className="option-grid">
        {challenge.options.map((opt) => {
          let state = '';
          if (submitted) {
            if (opt.correct) state = 'correct';
            else if (opt.id === selected) state = 'wrong';
          } else if (opt.id === selected) {
            state = 'selected';
          }

          return (
            <motion.button
              key={opt.id}
              type="button"
              className={`option-card ${state}`}
              onClick={() => !submitted && setSelected(opt.id)}
              disabled={submitted}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * challenge.options.indexOf(opt) }}
              whileHover={!submitted ? { scale: 1.02, boxShadow: "0 4px 20px rgba(0,0,0,0.1)" } : {}}
              whileTap={!submitted ? { scale: 0.98 } : {}}
            >
              <span className="option-marker">{opt.id.toUpperCase()}</span>
              <span className="option-text">{opt.text}</span>
            </motion.button>
          );
        })}
      </div>
      {submitted && selectedOption && (
        <FeedbackBanner
          type={selectedOption.correct ? 'success' : 'error'}
          message={selectedOption.feedback}
        />
      )}
      {!submitted && (
        <div className="challenge-actions">
          <ActionButton label="Submit Response" onClick={handleSubmit} disabled={!selected} size="lg" variant="coral" />
        </div>
      )}
    </div>
  );
}
