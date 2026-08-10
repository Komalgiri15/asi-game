import { createContext, useCallback, useContext, useMemo, useState, ReactNode } from 'react';
import { GameState, GamePhase } from '../types/game';
import { LEVELS } from '../data/dealRoomData';

interface GameContextValue extends GameState {
  totalLevels: number;
  addInsightPoints: (points: number) => void;
  advanceLevel: () => void;
  unlockBadge: (badgeId: string) => void;
  unlockGoodie: (goodieId: string) => void;
  updatePromptPieces: (category: 'purpose' | 'scope' | 'evidence', pieces: string[]) => void;
  updateValidationCheck: (checkId: string, value: boolean) => void;
  updateRefinement: (refId: string, value: boolean) => void;
  startGame: () => void;
  finishGame: () => void;
  restartGame: () => void;
}

const initialState: GameState = {
  phase: 'intro',
  currentLevel: 0,
  insightPoints: 0,
  badges: [],
  unlockedGoodies: [],
  promptPieces: {
    purpose: [],
    scope: [],
    evidence: [],
  },
  validationChecks: {},
  refinements: {},
};

const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GameState>(initialState);

  const addInsightPoints = useCallback((points: number) => {
    setState((s) => ({ ...s, insightPoints: s.insightPoints + points }));
  }, []);

  const advanceLevel = useCallback(() => {
    setState((s) => {
      const nextLevel = s.currentLevel + 1;
      if (nextLevel >= LEVELS.length) {
        return { ...s, phase: 'finished' as GamePhase };
      }
      return { ...s, currentLevel: nextLevel };
    });
  }, []);

  const unlockBadge = useCallback((badgeId: string) => {
    setState((s) => ({
      ...s,
      badges: s.badges.includes(badgeId) ? s.badges : [...s.badges, badgeId],
    }));
  }, []);

  const unlockGoodie = useCallback((goodieId: string) => {
    setState((s) => ({
      ...s,
      unlockedGoodies: s.unlockedGoodies.includes(goodieId) ? s.unlockedGoodies : [...s.unlockedGoodies, goodieId],
    }));
  }, []);

  const updatePromptPieces = useCallback((category: 'purpose' | 'scope' | 'evidence', pieces: string[]) => {
    setState((s) => ({
      ...s,
      promptPieces: {
        ...s.promptPieces,
        [category]: pieces,
      }
    }));
  }, []);

  const updateValidationCheck = useCallback((checkId: string, value: boolean) => {
    setState((s) => ({
      ...s,
      validationChecks: {
        ...s.validationChecks,
        [checkId]: value
      }
    }));
  }, []);

  const updateRefinement = useCallback((refId: string, value: boolean) => {
    setState((s) => ({
      ...s,
      refinements: {
        ...s.refinements,
        [refId]: value
      }
    }));
  }, []);

  const startGame = useCallback(() => {
    setState({ ...initialState, phase: 'playing' });
  }, []);

  const finishGame = useCallback(() => {
    setState((s) => ({ ...s, phase: 'finished' }));
  }, []);

  const restartGame = useCallback(() => {
    setState(initialState);
  }, []);

  const value = useMemo<GameContextValue>(
    () => ({
      ...state,
      totalLevels: LEVELS.length,
      addInsightPoints,
      advanceLevel,
      unlockBadge,
      unlockGoodie,
      updatePromptPieces,
      updateValidationCheck,
      updateRefinement,
      startGame,
      finishGame,
      restartGame,
    }),
    [
      state,
      addInsightPoints,
      advanceLevel,
      unlockBadge,
      unlockGoodie,
      updatePromptPieces,
      updateValidationCheck,
      updateRefinement,
      startGame,
      finishGame,
      restartGame,
    ],
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}
