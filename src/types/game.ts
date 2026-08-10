export type GamePhase = 'intro' | 'playing' | 'finished';

export type Rank = 'Trainee Analyst' | 'Research Analyst' | 'Senior Analyst' | 'Lead Analyst' | 'Principal Analyst' | 'Trusted Advisor';

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string; // Could be an emoji or Lucide icon name
}

export interface Goodie {
  id: string;
  name: string;
  description: string;
  content: string; // The text or template
}

export interface GameState {
  phase: GamePhase;
  currentLevel: number; // 0 to 5
  insightPoints: number;
  badges: string[]; // array of Badge IDs
  unlockedGoodies: string[]; // array of Goodie IDs
  
  // Prompt builder state
  promptPieces: {
    purpose: string[];
    scope: string[];
    evidence: string[];
  };
  
  // Validation state (Level 4)
  validationChecks: Record<string, boolean>;

  // Refinement state (Level 5)
  refinements: Record<string, boolean>;
}

export interface LevelConfig {
  id: number;
  title: string;
  intent: string;
  briefing: string;
  badgeUnlock?: string;
  goodieUnlock?: string;
}

export function getRank(currentLevel: number, phase: GamePhase): Rank {
  if (phase === 'finished') return 'Trusted Advisor';
  if (currentLevel >= 5) return 'Principal Analyst'; // Completed L4
  if (currentLevel >= 4) return 'Lead Analyst';      // Completed L3
  if (currentLevel >= 3) return 'Senior Analyst';    // Completed L2
  if (currentLevel >= 2) return 'Research Analyst';  // Completed L1
  return 'Trainee Analyst';                          // Start
}
