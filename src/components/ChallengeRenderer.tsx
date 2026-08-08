import { CHALLENGES } from '../data/modules';
import { useGame } from '../context/GameContext';
import { MultiSelectQuiz } from './MultiSelectQuiz';
import { PickOneQuiz } from './PickOneQuiz';
import { PromptBuildQuiz } from './PromptBuildQuiz';
import { SpotMissingQuiz } from './SpotMissingQuiz';
import { Challenge } from '../types/game';

export function ChallengeRenderer() {
  const { moduleIndex, completeChallenge } = useGame();
  const challenge = CHALLENGES[moduleIndex];

  if (!challenge) return null;

  return <ChallengeSwitch challenge={challenge} onComplete={completeChallenge} />;
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
