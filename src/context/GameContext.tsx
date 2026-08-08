import { createContext, useCallback, useContext, useMemo, useState, ReactNode } from 'react';
import { MODULES } from '../data/modules';
import { Competency, GameState } from '../types/game';

interface GameContextValue extends GameState {
  module: (typeof MODULES)[number] | null;
  totalModules: number;
  maxProgress: number;
  completeIntroVideo: () => void;
  completeIntro: () => void;
  startAssessment: () => void;
  advanceFromBriefing: () => void;
  advanceFromReference: () => void;
  completeChallenge: (pointsEarned: number) => void;
  advanceFromModuleComplete: () => void;
  restartAssessment: () => void;
  /** @deprecated */
  mission: (typeof MODULES)[number] | null;
  totalMissions: number;
  maxXp: number;
  startGame: () => void;
  advanceFromMissionComplete: () => void;
  restartGame: () => void;
  xp: number;
  streak: number;
  badges: Competency[];
  missionIndex: number;
}

const MAX_PROGRESS = MODULES.reduce((sum, m) => sum + m.progressWeight, 0);

const initialState: GameState = {
  phase: 'intro-video',
  moduleIndex: 0,
  score: 0,
  progress: 0,
  competencies: [],
  challengeComplete: false,
};

const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GameState>(initialState);

  const completeIntroVideo = useCallback(() => {
    setState((s) => ({ ...s, phase: 'title' }));
  }, []);

  const completeIntro = useCallback(() => {
    setState((s) => ({ ...s, phase: 'title' }));
  }, []);

  const startAssessment = useCallback(() => {
    setState({ ...initialState, phase: 'briefing', moduleIndex: 0 });
  }, []);

  const advanceFromBriefing = useCallback(() => {
    setState((s) => {
      const mod = MODULES[s.moduleIndex];
      return {
        ...s,
        phase: mod.reference ? 'reference' : 'challenge',
        challengeComplete: false,
      };
    });
  }, []);

  const advanceFromReference = useCallback(() => {
    setState((s) => ({ ...s, phase: 'challenge', challengeComplete: false }));
  }, []);

  const completeChallenge = useCallback((pointsEarned: number) => {
    setState((s) => {
      const mod = MODULES[s.moduleIndex];
      const competency = mod.competency;
      const hasCompetency = competency
        ? s.competencies.some((c) => c.id === competency.id)
        : false;
      const competencies: Competency[] =
        competency && !hasCompetency ? [...s.competencies, competency] : s.competencies;

      return {
        ...s,
        phase: 'module-complete',
        score: s.score + pointsEarned,
        progress: s.progress + mod.progressWeight,
        competencies,
        challengeComplete: true,
      };
    });
  }, []);

  const advanceFromModuleComplete = useCallback(() => {
    setState((s) => {
      const nextIndex = s.moduleIndex + 1;
      if (nextIndex >= MODULES.length) {
        return { ...s, phase: 'summary' };
      }
      return { ...s, phase: 'briefing', moduleIndex: nextIndex, challengeComplete: false };
    });
  }, []);

  const restartAssessment = useCallback(() => {
    setState({ ...initialState, phase: 'intro' });
  }, []);

  const value = useMemo<GameContextValue>(
    () => ({
      ...state,
      module: state.phase === 'title' || state.phase === 'intro' ? null : MODULES[state.moduleIndex] ?? null,
      totalModules: MODULES.length,
      maxProgress: MAX_PROGRESS,
      completeIntroVideo,
      completeIntro,
      startAssessment,
      advanceFromBriefing,
      advanceFromReference,
      completeChallenge,
      advanceFromModuleComplete,
      restartAssessment,
      mission: state.phase === 'title' ? null : MODULES[state.moduleIndex] ?? null,
      totalMissions: MODULES.length,
      maxXp: MAX_PROGRESS,
      startGame: startAssessment,
      advanceFromMissionComplete: advanceFromModuleComplete,
      restartGame: restartAssessment,
      xp: state.progress,
      streak: 0,
      badges: state.competencies,
      missionIndex: state.moduleIndex,
    }),
    [
      state,
      completeIntroVideo,
      completeIntro,
      startAssessment,
      advanceFromBriefing,
      advanceFromReference,
      completeChallenge,
      advanceFromModuleComplete,
      restartAssessment,
    ],
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}
