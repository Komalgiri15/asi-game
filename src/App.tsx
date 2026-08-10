import { GameProvider, useGame } from './context/GameContext';
import { AppFrame } from './components/AppFrame';
import { StageCanvas } from './components/StageCanvas';

import { IntroScreen } from './screens/levels/IntroScreen';
import { Level0GenericPrompt } from './screens/levels/Level0GenericPrompt';
import { Level1Purpose } from './screens/levels/Level1Purpose';
import { Level2Scope } from './screens/levels/Level2Scope';
import { Level3Evidence } from './screens/levels/Level3Evidence';
import { Level4Validate } from './screens/levels/Level4Validate';
import { Level5Expertise } from './screens/levels/Level5Expertise';
import { GameFinish } from './screens/levels/GameFinish';

function AppRouter() {
  const { phase, currentLevel } = useGame();

  if (phase === 'intro') {
    return (
      <AppFrame>
        <IntroScreen />
      </AppFrame>
    );
  }

  if (phase === 'finished') {
    return (
      <AppFrame>
        <GameFinish />
      </AppFrame>
    );
  }

  // Phase is 'playing'
  const LevelComponent = [
    Level0GenericPrompt,
    Level1Purpose,
    Level2Scope,
    Level3Evidence,
    Level4Validate,
    Level5Expertise
  ][currentLevel] || Level0GenericPrompt;

  return (
    <AppFrame>
      <LevelComponent />
    </AppFrame>
  );
}

export default function App() {
  return (
    <StageCanvas>
      <GameProvider>
        <AppRouter />
      </GameProvider>
    </StageCanvas>
  );
}
