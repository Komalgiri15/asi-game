export type GamePhase =
  | 'intro'
  | 'title'
  | 'briefing'
  | 'reference'
  | 'challenge'
  | 'module-complete'
  | 'summary';

export type ChallengeType = 'pick-one' | 'multi-select' | 'prompt-build' | 'spot-missing';

export interface Competency {
  id: string;
  name: string;
  code: string;
  description: string;
}

export interface ProfileReference {
  image: string;
  title: string;
  label: string;
  caption: string;
  callouts: string[];
  variant: 'basic' | 'improved';
}

export interface Module {
  id: number;
  title: string;
  subtitle: string;
  briefing: string;
  tip: string;
  progressWeight: number;
  competency?: Competency;
  reference?: ProfileReference;
}

export interface PickOneChallenge {
  type: 'pick-one';
  question: string;
  options: { id: string; text: string; correct: boolean; feedback: string }[];
  points: number;
}

export interface MultiSelectChallenge {
  type: 'multi-select';
  question: string;
  instruction: string;
  options: { id: string; text: string; correct: boolean }[];
  requiredCount: number;
  points: number;
}

export interface PromptBuildChallenge {
  type: 'prompt-build';
  question: string;
  instruction: string;
  pieces: { id: string; text: string; order: number }[];
  points: number;
}

export interface SpotMissingChallenge {
  type: 'spot-missing';
  question: string;
  sampleLabel: string;
  sampleText: string;
  options: { id: string; text: string; correct: boolean }[];
  requiredCount: number;
  points: number;
}

export type Challenge =
  | PickOneChallenge
  | MultiSelectChallenge
  | PromptBuildChallenge
  | SpotMissingChallenge;

export interface GameState {
  phase: GamePhase;
  moduleIndex: number;
  score: number;
  progress: number;
  competencies: Competency[];
  challengeComplete: boolean;
}

export type ProficiencyLevel = 'Developing' | 'Proficient' | 'Advanced' | 'Expert';

export function getProficiencyLevel(score: number): ProficiencyLevel {
  if (score >= 900) return 'Expert';
  if (score >= 650) return 'Advanced';
  if (score >= 350) return 'Proficient';
  return 'Developing';
}

/* Legacy aliases for gradual migration */
export type Badge = Competency;
export type Mission = Module;
export type Rank = ProficiencyLevel;
export const getRank = getProficiencyLevel;
