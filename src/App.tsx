import { GameProvider, useGame } from './context/GameContext';
import { IntroScreen } from './screens/IntroScreen';
import { BriefingScreen } from './screens/BriefingScreen';
import { ChallengeScreen } from './screens/ChallengeScreen';
import { ModuleCompleteScreen } from './screens/ModuleCompleteScreen';
import { ReferenceScreen } from './screens/ReferenceScreen';
import { SummaryScreen } from './screens/SummaryScreen';
import { TitleScreen } from './screens/TitleScreen';

function AppRouter() {
  const { phase, completeIntro } = useGame();

  switch (phase) {
    case 'intro':
      return <IntroScreen onComplete={completeIntro} />;
    case 'title':
      return <TitleScreen />;
    case 'briefing':
      return <BriefingScreen />;
    case 'reference':
      return <ReferenceScreen />;
    case 'challenge':
      return <ChallengeScreen />;
    case 'module-complete':
      return <ModuleCompleteScreen />;
    case 'summary':
      return <SummaryScreen />;
    default:
      return <TitleScreen />;
  }
}

import { AnimatePresence } from 'framer-motion';

export default function App() {
  return (
    <div className="app-shell">
      <div className="storyline-root">
        <GameProvider>
          <AnimatePresence mode="wait">
            <AppRouter />
          </AnimatePresence>
        </GameProvider>
      </div>
    </div>
  );
}
