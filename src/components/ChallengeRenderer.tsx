import { useEffect, useState } from 'react';
import { CHALLENGES } from '../data/modules';
import { useGame } from '../context/GameContext';
import { MultiSelectQuiz } from './MultiSelectQuiz';
import { PickOneQuiz } from './PickOneQuiz';
import { PromptBuildQuiz } from './PromptBuildQuiz';
import { SpotMissingQuiz } from './SpotMissingQuiz';
import { MascotHint } from './MascotHint';
import { FeedbackBanner, ActionButton } from './AppFrame';
import { Challenge, getPassScore, isAllOrNothingChallenge } from '../types/game';

export function ChallengeRenderer() {
  const { moduleIndex, completeChallenge, module } = useGame();
  const challenge = CHALLENGES[moduleIndex];
  const [attempt, setAttempt] = useState(0);
  const [failResult, setFailResult] = useState<{ earned: number; required: number } | null>(null);

  useEffect(() => {
    setAttempt(0);
    setFailResult(null);
  }, [moduleIndex]);

  if (!challenge || !module) return null;

  const passScore = getPassScore(challenge);
  const allOrNothing = isAllOrNothingChallenge(challenge);

  const handleComplete = (points: number) => {
    if (points >= passScore) {
      setFailResult(null);
      completeChallenge(points);
      return;
    }
    setFailResult({ earned: points, required: passScore });
  };

  const handleRetry = () => {
    setFailResult(null);
    setAttempt((prev) => prev + 1);
  };

  return (
    <div className="challenge-layout">
      <div className="challenge-main">
        {failResult && (
          <FeedbackBanner
            type="error"
            message={
              allOrNothing
                ? 'Not quite — you need the correct answer to clear this level. Give it another shot!'
                : `Clearance not granted — score ${failResult.earned}/${challenge.points}. You need at least ${failResult.required} pts to pass this level.`
            }
          />
        )}

        {failResult ? (
          <div className="challenge-retry">
            <ActionButton label="Retry Assessment" onClick={handleRetry} variant="coral" size="lg" />
          </div>
        ) : (
          <ChallengeSwitch
            key={`${moduleIndex}-${attempt}`}
            challenge={challenge}
            onComplete={handleComplete}
          />
        )}
      </div>

      <aside className="challenge-sidebar">
        <div className="challenge-pass-pill">
          <span className="challenge-pass-label">
            {allOrNothing ? 'Full marks' : 'Pass score'}
          </span>
          <span className="challenge-pass-value">{passScore}</span>
          <span className="challenge-pass-max">/ {challenge.points} pts</span>
        </div>
        <MascotHint hint={module.tip} />
      </aside>
    </div>
  );
}

function ChallengeSwitch({
  challenge,
  onComplete,
}: {
  challenge: Challenge;
  onComplete: (points: number) => void;
}) {
  switch (challenge.type) {
    case 'pick-one':
      return <PickOneQuiz challenge={challenge} onComplete={onComplete} />;
    case 'multi-select':
      return <MultiSelectQuiz challenge={challenge} onComplete={onComplete} />;
    case 'spot-missing':
      return <SpotMissingQuiz challenge={challenge} onComplete={onComplete} />;
    case 'prompt-build':
      return <PromptBuildQuiz challenge={challenge} onComplete={onComplete} />;
    default:
      return null;
  }
}
