export type SlideId =
  | 'intro'
  | 'basic-prompt'
  | 'basic-output'
  | 'purpose'
  | 'scope'
  | 'evidence'
  | 'final-prompt'
  | 'final-output'
  | 'validate'
  | 'enhance'
  | 'conclusion';

export interface SlideMeta {
  id: SlideId;
  title: string;
  section?: string;
}

export const SLIDES: SlideMeta[] = [
  { id: 'intro', title: 'Welcome', section: 'Introduction' },
  { id: 'basic-prompt', title: 'Generic Prompts', section: 'Getting Started' },
  { id: 'basic-output', title: 'Basic Output', section: 'Getting Started' },
  { id: 'purpose', title: 'Start with Purpose', section: 'Best Practice 1' },
  { id: 'scope', title: 'Define Scope & Sources', section: 'Best Practice 2' },
  { id: 'evidence', title: 'Ask for Evidence', section: 'Best Practice 3' },
  { id: 'final-prompt', title: 'Final Prompt', section: 'Best Practice 3' },
  { id: 'final-output', title: 'Improved Output', section: 'Best Practice 3' },
  { id: 'validate', title: 'Validate & Review', section: 'Best Practice 4' },
  { id: 'enhance', title: 'Human Expertise', section: 'Best Practice 5' },
  { id: 'conclusion', title: 'Key Takeaways', section: 'Conclusion' },
];
