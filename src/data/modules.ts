import basicProfile from '../assets/image1.png';
import improvedProfile from '../assets/image2.png';
import { Challenge, Competency, Module } from '../types/game';

export const COMPETENCIES: Record<string, Competency> = {
  'prompt-analysis': {
    id: 'prompt-analysis',
    name: 'Prompt Analysis',
    code: 'PA',
    description: 'Distinguish generic from investment-grade prompts',
  },
  'purpose-definition': {
    id: 'purpose-definition',
    name: 'Purpose Definition',
    code: 'PD',
    description: 'Define audience, objective, and focus areas',
  },
  'source-prioritization': {
    id: 'source-prioritization',
    name: 'Source Prioritization',
    code: 'SP',
    description: 'Scope research with trusted primary sources',
  },
  'evidence-validation': {
    id: 'evidence-validation',
    name: 'Evidence Validation',
    code: 'EV',
    description: 'Identify gaps in facts, sources, and reporting',
  },
  'prompt-construction': {
    id: 'prompt-construction',
    name: 'Prompt Construction',
    code: 'PC',
    description: 'Structure a committee-ready AFA prompt',
  },
  'output-review': {
    id: 'output-review',
    name: 'Output Review',
    code: 'OR',
    description: 'Apply validation checks before deliverable use',
  },
};

export const MODULES: Module[] = [
  {
    id: 1,
    title: 'Evaluating Prompt Quality',
    subtitle: 'Module 1 — Generic vs. structured prompting',
    briefing:
      'An M&A deal team requires a Unilever PLC profile for an investment committee. A generic AFA prompt may produce a high-level overview, but often lacks the depth, sourcing, and structure required for professional due diligence.',
    tip: 'Compare the reference output against investment committee standards before selecting your response.',
    progressWeight: 100,
    competency: COMPETENCIES['prompt-analysis'],
    reference: {
      image: basicProfile,
      title: 'UNILEVER PLC — M&A INVESTMENT COMMITTEE PROFILE',
      label: 'Reference Output — Generic Prompt',
      caption: 'Output from a basic prompt: useful starting point, but limited investment-grade depth.',
      variant: 'basic',
      callouts: [
        'High-level business description without source attribution',
        'Financial figures present but reporting context is thin',
        'Management section lacks structured tenure data',
        'News coverage may include non-material developments',
      ],
    },
  },
  {
    id: 2,
    title: 'Defining Research Purpose',
    subtitle: 'Module 2 — Audience and objective',
    briefing:
      'AFA delivers more relevant output when the profile purpose is explicit — intended audience, decisions supported, and analytical focus areas should be defined upfront.',
    tip: 'Start with purpose, not just the company name. Specify investment committee context, financial performance, risks, and competitive positioning.',
    progressWeight: 100,
    competency: COMPETENCIES['purpose-definition'],
  },
  {
    id: 3,
    title: 'Scoping Sources & Parameters',
    subtitle: 'Module 3 — Research boundaries',
    briefing:
      'Reliable profiles require clearly defined scope: reporting period, geographic coverage, currency, and prioritized primary sources such as filings, earnings materials, and investor presentations.',
    tip: 'Instruct AFA to use annual reports, regulatory filings, earnings transcripts, and the company website. Specify USD presentation and an "as of" date.',
    progressWeight: 100,
    competency: COMPETENCIES['source-prioritization'],
  },
  {
    id: 4,
    title: 'Requiring Evidence & Facts',
    subtitle: 'Module 4 — Facts vs. interpretation',
    briefing:
      'Investment committees require fact-based analysis. Key figures need reporting periods, sources, and clear separation between reported data, estimates, and analyst interpretation.',
    tip: 'Instruct AFA to provide reporting period and source for each key figure, and flag conflicting or unavailable information.',
    progressWeight: 100,
    competency: COMPETENCIES['evidence-validation'],
  },
  {
    id: 5,
    title: 'Constructing the Final Prompt',
    subtitle: 'Module 5 — Unilever PLC case study',
    briefing:
      'Review the improved one-pager produced from a structured prompt. Then assemble the prompt components in the correct sequence for an M&A investment committee deliverable.',
    tip: 'Include audience, sources, USD figures, four quadrants, source links in a supporting document, and instructions to separate facts from interpretation.',
    progressWeight: 150,
    competency: COMPETENCIES['prompt-construction'],
    reference: {
      image: improvedProfile,
      title: 'UNILEVER PLC — ONE-PAGER PROFILE',
      label: 'Reference Output — Structured Prompt',
      caption: 'Investment-ready profile with facts, sources, structured quadrants, and management tenure.',
      variant: 'improved',
      callouts: [
        'Fact-based business model with reporting period and USD figures',
        'Brands organized by business segment with turnover context',
        'Management table with designation, appointment date, and tenure',
        'Material news limited to developments relevant to investment profile',
      ],
    },
  },
  {
    id: 6,
    title: 'Validating AI-Generated Output',
    subtitle: 'Module 6 — Pre-submission review',
    briefing:
      'A well-written profile is not necessarily a well-validated one. Before use, verify accuracy against primary sources and ensure balanced, evidence-backed analysis.',
    tip: 'Validate financial figures, reporting periods, material news relevance, and unsupported claims before submitting any deliverable.',
    progressWeight: 150,
    competency: COMPETENCIES['output-review'],
  },
];

/** @deprecated use MODULES */
export const MISSIONS = MODULES;

export const CHALLENGES: Challenge[] = [
  {
    type: 'pick-one',
    question: 'Which prompt is most likely to produce investment-grade research for an M&A committee?',
    options: [
      {
        id: 'a',
        text: 'Create a one pager profile in PPT format of Unilever Plc with 4 quadrants.',
        correct: false,
        feedback: 'Too generic — no audience, sources, reporting period, or analytical focus defined.',
      },
      {
        id: 'b',
        text: 'Prepare a one-page Unilever PLC profile for an M&A investment committee, focusing on financial performance, competitive position, growth drivers, and key risks. Use latest filings and present figures in USD.',
        correct: true,
        feedback: 'Correct. Purpose, audience, focus areas, sources, and currency are all specified.',
      },
      {
        id: 'c',
        text: 'Tell me everything about Unilever — brands, history, and competitors.',
        correct: false,
        feedback: 'Open-ended request with no structure, audience, or deliverable format.',
      },
    ],
    points: 150,
  },
  {
    type: 'multi-select',
    question: 'Which elements belong in a purpose-driven investment committee prompt?',
    instruction: 'Select all that apply:',
    options: [
      { id: 'a', text: 'Intended audience (e.g., M&A investment committee)', correct: true },
      { id: 'b', text: 'Company tagline and brand slogans', correct: false },
      { id: 'c', text: 'Key focus areas: financials, competition, risks, growth', correct: true },
      { id: 'd', text: 'Decisions the profile should support', correct: true },
      { id: 'e', text: 'Request for creative marketing language', correct: false },
      { id: 'f', text: 'Deliverable format (one-page PPT)', correct: true },
    ],
    requiredCount: 4,
    points: 150,
  },
  {
    type: 'multi-select',
    question: 'Which sources and parameters should AFA prioritize?',
    instruction: 'Select all that apply:',
    options: [
      { id: 'a', text: 'Annual report & regulatory filings (10-K, 10-Q)', correct: true },
      { id: 'b', text: 'Random blog posts and Wikipedia', correct: false },
      { id: 'c', text: 'Investor presentations & earnings call transcripts', correct: true },
      { id: 'd', text: 'Company official website', correct: true },
      { id: 'e', text: 'Unverified social media commentary', correct: false },
      { id: 'f', text: 'Reporting period, currency (USD), and "as of" date', correct: true },
    ],
    requiredCount: 4,
    points: 150,
  },
  {
    type: 'spot-missing',
    question: 'Identify the gaps in this AI-generated profile excerpt',
    sampleLabel: 'AI-Generated Profile Excerpt',
    sampleText:
      '"Unilever is a world-leading consumer goods company with iconic brands loved globally. Revenue is strong and growing. The company has excellent management and a bright future ahead."',
    options: [
      { id: 'a', text: 'Uses marketing language instead of facts', correct: true },
      { id: 'b', text: 'Missing reporting period for financial figures', correct: true },
      { id: 'c', text: 'No source citations provided', correct: true },
      { id: 'd', text: 'Includes too many SEC filing references', correct: false },
      { id: 'e', text: 'Facts not separated from interpretation', correct: true },
      { id: 'f', text: 'Currency and units clearly specified', correct: false },
    ],
    requiredCount: 4,
    points: 175,
  },
  {
    type: 'prompt-build',
    question: 'Assemble the final Unilever PLC prompt',
    instruction: 'Select prompt components in the correct order (1 → 6):',
    pieces: [
      { id: 'p1', text: 'Prepare a one-page company profile PPT of Unilever PLC for an M&A deal investment committee.', order: 1 },
      { id: 'p2', text: 'Use latest annual report, investor presentations, earnings transcripts, regulatory filings, and company website.', order: 2 },
      { id: 'p3', text: 'Present financial figures in USD using latest fiscal year and most recent quarter.', order: 3 },
      { id: 'p4', text: 'Four quadrants: business model (facts only), brands by segment, key management with tenure, material news (6–12 months).', order: 4 },
      { id: 'p5', text: 'Provide reporting period and source link for all key facts in a Word doc.', order: 5 },
      { id: 'p6', text: 'Separate facts from interpretation; flag conflicting or unavailable information.', order: 6 },
    ],
    points: 200,
  },
  {
    type: 'multi-select',
    question: 'Which validation checks are most critical before using an AI-generated profile?',
    instruction: 'Select the four most important checks:',
    options: [
      { id: 'a', text: 'Financial figures align with annual reports and filings', correct: true },
      { id: 'b', text: 'Slide font matches company branding', correct: false },
      { id: 'c', text: 'Reporting period, geography, and currency are correct', correct: true },
      { id: 'd', text: 'Profile provides a balanced view, not only positive developments', correct: true },
      { id: 'e', text: 'Conclusions are supported by evidence, not assumptions', correct: true },
      { id: 'f', text: 'Every paragraph uses bullet points', correct: false },
    ],
    requiredCount: 4,
    points: 175,
  },
];

export { basicProfile, improvedProfile };
