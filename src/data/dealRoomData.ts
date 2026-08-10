import { Badge, Goodie, LevelConfig } from '../types/game';

export const BADGES: Record<string, Badge> = {
  'purpose-setter': { id: 'purpose-setter', name: 'Purpose-Setter', description: 'Built a purpose-driven prompt', icon: 'Target' },
  'scope-pro': { id: 'scope-pro', name: 'Scope & Sources Pro', description: 'Set scope and prioritized trusted sources', icon: 'Maximize' },
  'evidence-hunter': { id: 'evidence-hunter', name: 'Evidence Hunter', description: 'Added the evidence rule', icon: 'Search' },
  'prompt-architect': { id: 'prompt-architect', name: 'Prompt Architect', description: 'Assembled the complete Final Prompt', icon: 'Layout' },
  'the-validator': { id: 'the-validator', name: 'The Validator', description: 'Completed the review pass', icon: 'CheckCircle' },
  'human-touch': { id: 'human-touch', name: 'Human Touch', description: 'Refined the AI draft into a delivered profile', icon: 'User' },
  'deal-room-ready': { id: 'deal-room-ready', name: 'Deal-Room Ready', description: 'Delivered the profile to the committee', icon: 'Award' },
  'pro-tipper': { id: 'pro-tipper', name: 'Pro-Tipper', description: 'Used the reference-sample Pro Tip', icon: 'Star' },
  'thorough-reviewer': { id: 'thorough-reviewer', name: 'Thorough Reviewer', description: 'Opened all validation checks', icon: 'CheckSquare' },
  'no-shortcuts': { id: 'no-shortcuts', name: 'No Shortcuts', description: 'Applied all human-expertise refinements', icon: 'Layers' },
};

export const GOODIES: Record<string, Goodie> = {
  'purpose-prompt': { id: 'purpose-prompt', name: 'Purpose Prompt card', description: 'The purpose-driven prompt pattern, copy-ready.', content: 'Prepare a [format] of [Company] for [Audience] focusing on [Focus Areas].' },
  'scope-quick-card': { id: 'scope-quick-card', name: 'Scope & Sources quick card', description: 'Reporting period, geography, currency, "as of" date + trusted sources.', content: 'Use: Annual reports, Earnings transcripts, Company website.\nSet: Currency, Reporting period, "As of" date.' },
  'master-prompt': { id: 'master-prompt', name: 'Master Prompt template', description: 'The full Final Prompt, copy-ready and adaptable to any company.', content: 'Prepare a one-page profile for [Audience] focusing on [Focus]. Use [Sources], present figures in [Currency]. Organize into 4 quadrants. Provide reporting period and source links.' },
  'validation-checklist': { id: 'validation-checklist', name: 'Validation Checklist', description: 'The 12-point review checklist as a reusable job aid.', content: '- Verify financials against filings\n- Check reporting periods\n- Validate material news\n- Confirm facts vs interpretation' },
  'refinement-checklist': { id: 'refinement-checklist', name: 'Refinement Checklist', description: 'The human-expertise elements to lift any AI draft.', content: '- Apply Brand Typography & Colors\n- Synthesize Bullet Points\n- Check visual hierarchy' },
  'best-practices-toolkit': { id: 'best-practices-toolkit', name: 'Best-Practices Toolkit', description: 'One-pager of all five best practices.', content: '1. Start with Purpose\n2. Define Scope & Sources\n3. Demand Evidence\n4. Validate & Review\n5. Add Human Expertise' },
};

export const LEVELS: LevelConfig[] = [
  {
    id: 0,
    title: 'The Generic Prompt Trap',
    intent: 'Framing: clarity of instructions drives output quality',
    briefing: 'You are an analyst at Acuity. You need a one-pager on Unilever PLC for an M&A investment committee. See what happens when you use a basic prompt.'
  },
  {
    id: 1,
    title: 'Start With the Purpose',
    intent: 'Purpose, not just the company name',
    briefing: 'AFA needs explicit purpose. Define the intended audience, decisions supported, and analytical focus areas.',
  },
  {
    id: 2,
    title: 'Define Scope & Sources',
    intent: 'Scope and sources',
    briefing: 'Reliable profiles require clearly defined scope. Set the reporting period, geography, currency, and prioritize trusted primary sources.',
  },
  {
    id: 3,
    title: 'Demand Evidence, Not Opinions',
    intent: 'Evidence and facts',
    briefing: 'Investment committees require fact-based analysis. Add the evidence rule and build the four quadrants.',
  },
  {
    id: 4,
    title: 'Validate & Review',
    intent: 'Validate the output',
    briefing: 'Before use, verify accuracy against primary sources and ensure balanced, evidence-backed analysis.',
  },
  {
    id: 5,
    title: 'Add Human Expertise',
    intent: 'Enhance with human expertise',
    briefing: 'Refine the AI draft slide into a delivered profile by improving design, structure, and storytelling.',
  }
];
