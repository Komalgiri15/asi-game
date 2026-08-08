import { GameProvider, useGame } from './context/GameContext';
import { VoiceoverProvider } from './context/VoiceoverContext';
import { IntroScreen } from './screens/IntroScreen';
import { BriefingScreen } from './screens/BriefingScreen';
import { ChallengeScreen } from './screens/ChallengeScreen';
import { ModuleCompleteScreen } from './screens/ModuleCompleteScreen';
import { ReferenceScreen } from './screens/ReferenceScreen';
import { SummaryScreen } from './screens/SummaryScreen';
import { LevelHubScreen } from './screens/LevelHubScreen';
import { IntroVideoScreen } from './screens/IntroVideoScreen';

function AppRouter() {
  const { phase, completeIntro } = useGame();

  switch (phase) {
    case 'intro-video':
      return <IntroVideoScreen />;
    case 'intro':
      return <IntroScreen onComplete={completeIntro} />;
    case 'title':
      return <LevelHubScreen />;
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
      return <LevelHubScreen />;
  }
}

import { AnimatePresence } from 'framer-motion';
import { StageCanvas } from './components/StageCanvas';

export default function App() {
  return (
    <StageCanvas>
      <VoiceoverProvider>
        <GameProvider>
          <AnimatePresence mode="wait">
            <AppRouter />
          </AnimatePresence>
        </GameProvider>
      </VoiceoverProvider>
    </StageCanvas>
  );
}
