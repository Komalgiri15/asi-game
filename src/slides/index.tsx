import {
  SlideContainer,
  SlideHeader,
  BulletList,
  PromptBox,
  ImagePlaceholder,
  ProTip,
  Checklist,
} from '../components/SlideLayout';

export function IntroSlide() {
  return (
    <SlideContainer className="slide-intro">
      <div className="intro-content">
        <div className="intro-badge">Acuity Agent Fleet Assistant</div>
        <SlideHeader
          title="Creating Better Company Profiles with AFA"
          subtitle="Learn how to communicate effectively with AI to produce research-ready, investment-grade company profiles."
        />
        <div className="intro-cards">
          <div className="intro-card">
            <span className="intro-card-num">01</span>
            <strong>Purpose-Driven Prompts</strong>
            <p>Define audience, decisions, and focus areas</p>
          </div>
          <div className="intro-card">
            <span className="intro-card-num">02</span>
            <strong>Scoped Research</strong>
            <p>Specify sources, periods, and deliverable format</p>
          </div>
          <div className="intro-card">
            <span className="intro-card-num">03</span>
            <strong>Evidence & Validation</strong>
            <p>Require facts, sources, and human review</p>
          </div>
        </div>
        <p className="intro-note">Click <strong>Next</strong> to begin the module.</p>
      </div>
    </SlideContainer>
  );
}

export function BasicPromptSlide() {
  return (
    <SlideContainer>
      <SlideHeader
        section="Getting Started"
        title="Generic Prompts Produce Generic Results"
        subtitle="AFA is a powerful research companion — but effectiveness depends on how you use it."
      />
      <div className="two-column">
        <div className="column-main">
          <PromptBox
            label="Typical Generic Prompt"
            variant="bad"
            text='Create a one pager profile in PPT format of Unilever Plc with 4 quadrants: 1) company business model, 2) key brands by business segment, 3) key management, 4) key news and events.'
          />
          <p className="body-text">
            This will typically generate a <em>basic overview</em> — business, products, and high-level details.
            Useful as a starting point, but often lacking the depth required for professional research.
          </p>
        </div>
        <div className="column-side">
          <div className="info-panel">
            <h3>Think of AFA as your research assistant</h3>
            <BulletList
              items={[
                'Business model & competitive positioning',
                'Financial performance & growth drivers',
                'Key risks & material developments',
                'Management, strategy & investment profile',
              ]}
            />
          </div>
        </div>
      </div>
    </SlideContainer>
  );
}

export function BasicOutputSlide() {
  return (
    <SlideContainer>
      <SlideHeader
        section="Getting Started"
        title="Expected Output from a Basic Prompt"
        subtitle="Reference: UNILEVER PLC — M&A INVESTMENT COMMITTEE PROFILE"
      />
      <div className="two-column image-layout">
        <ImagePlaceholder
          src="/assets/unilever-basic-profile.png"
          alt="UNILEVER PLC — M&A INVESTMENT COMMITTEE PROFILE"
          caption="Basic one-pager output — high-level overview without investment-grade depth"
        />
        <div className="column-side">
          <div className="warning-panel">
            <h3>Limitations of Basic Output</h3>
            <BulletList
              items={[
                'Marketing language instead of facts',
                'Missing reporting periods & sources',
                'No separation of facts vs. interpretation',
                'Insufficient depth for deal committees',
                'News may include irrelevant noise',
              ]}
            />
          </div>
          <p className="body-text compact">
            The clearer your instructions, the more relevant and actionable the output will be.
          </p>
        </div>
      </div>
    </SlideContainer>
  );
}

export function PurposeSlide() {
  return (
    <SlideContainer>
      <SlideHeader
        section="Best Practice 1"
        title="Start with the Purpose, Not Just the Company Name"
        subtitle="Tell AFA how the profile will be used — audience, decisions, and topics that matter most."
      />
      <div className="compare-grid">
        <PromptBox
          label="Instead of"
          variant="bad"
          text="Create a one-page profile of Company X."
        />
        <PromptBox
          label="Use"
          variant="good"
          text="Prepare a one-page company profile of Company X for an investment committee, focusing on financial performance, competitive position, growth drivers, and key risks."
        />
      </div>
      <div className="highlight-bar">
        AFA focuses on information most relevant to your research objective rather than generating a generic overview.
      </div>
    </SlideContainer>
  );
}

export function ScopeSlide() {
  return (
    <SlideContainer>
      <SlideHeader
        section="Best Practice 2"
        title="Define the Scope and Sources for Your Research"
        subtitle="The more specific your instructions, the more reliable the output."
      />
      <div className="two-column scope-layout">
        <div>
          <h3 className="panel-title">Clearly define scope</h3>
          <BulletList
            items={[
              'Reporting period & "as of" date',
              'Geographic coverage',
              'Currency and units (e.g., USD millions)',
              'Types of news to include or exclude',
            ]}
          />
          <h3 className="panel-title">Prioritize trusted sources</h3>
          <BulletList
            items={[
              'Company filings & annual reports',
              'Investor presentations',
              'Earnings call transcripts',
              'SEC filings (10-K, 10-Q, 8-K)',
              'Company official website',
            ]}
          />
        </div>
        <div>
          <ProTip>
            Upload a reference company profile from the same or similar industry. A sample helps AFA match structure, detail level, writing style, and focus areas.
          </ProTip>
          <PromptBox
            label="Example Prompt"
            variant="good"
            text="Prepare a one-page company profile of Company X using the latest reported fiscal year and most recent quarter available as of July 2026. Present financial figures in USD millions. Use information primarily from the annual report, investor presentations, earnings transcripts, and SEC filings. Structure similar to the attached sample."
          />
        </div>
      </div>
    </SlideContainer>
  );
}

export function EvidenceSlide() {
  return (
    <SlideContainer>
      <SlideHeader
        section="Best Practice 3"
        title="Ask for Evidence and Facts, Not Just Conclusions"
        subtitle="Support key observations with relevant facts and sources. Distinguish reported data from estimates and interpretation."
      />
      <div className="two-column">
        <div className="instruction-panel">
          <h3>Key instruction to include</h3>
          <blockquote className="instruction-quote">
            For each key financial figure, provide the reporting period, source, and whether the figure is reported or calculated. Flag any conflicting or unavailable information.
          </blockquote>
          <BulletList
            items={[
              'Company-reported information',
              'Third-party commentary',
              'Estimates & calculated figures',
              'Analyst interpretation (clearly labeled)',
            ]}
          />
        </div>
        <div className="benefits-panel">
          <h3>Resulting deliverable includes</h3>
          <ul className="benefit-list">
            <li><span>✓</span> Structured research guidelines</li>
            <li><span>✓</span> Primary-source validation</li>
            <li><span>✓</span> Reporting period references</li>
            <li><span>✓</span> Facts separated from interpretation</li>
            <li><span>✓</span> Investment committee alignment</li>
          </ul>
        </div>
      </div>
    </SlideContainer>
  );
}

export function FinalPromptSlide() {
  return (
    <SlideContainer>
      <SlideHeader
        section="Best Practice 3"
        title="The Final Prompt — Putting It All Together"
        subtitle="A structured prompt designed for M&A deal investment committee requirements."
      />
      <div className="final-prompt-layout">
        <PromptBox
          label="Final Prompt"
          variant="good"
          text={`Prepare a one-page company profile PPT of Unilever PLC for an M&A deal investment committee. Use the latest available annual report, investor presentations, earnings transcripts, regulatory filings, and the company's website as sources. Present financial figures in USD using the latest reported fiscal year and most recent quarter available.

Four quadrants:
1. Company's business model — use facts, no opinions or marketing language
2. Key brands — categorize by business segment
3. Key Management — MD, CEO, CFO, CMO with designation and tenure
4. Key news and events — material developments from last 6–12 months relevant to business performance, strategic direction, or investment profile

For all key facts provide the reporting period and source link in a Word doc. Separate factual information from interpretation and flag conflicting or unavailable information.`}
        />
      </div>
    </SlideContainer>
  );
}

export function FinalOutputSlide() {
  return (
    <SlideContainer>
      <SlideHeader
        section="Best Practice 3"
        title="Improved Output with a Structured Prompt"
        subtitle="Reference: Unilever PLC One Pager Profile (Fixed PPT)"
      />
      <div className="two-column image-layout">
        <ImagePlaceholder
          src="/assets/unilever-final-profile.png"
          alt="Unilever PLC One pager profile fixed ppt"
          caption="Investment-ready one-pager with facts, sources, and structured quadrants"
        />
        <div className="column-side">
          <div className="success-panel">
            <h3>What improved</h3>
            <BulletList
              items={[
                'Fact-based business model description',
                'Brands organized by segment',
                'Management with tenure details',
                'Material news only (6–12 months)',
                'Source links & reporting periods',
                'Facts vs. interpretation separated',
              ]}
            />
          </div>
          <p className="body-text compact">
            Same principles apply beyond one-pagers — refine based on your research objectives and deliverable requirements.
          </p>
        </div>
      </div>
    </SlideContainer>
  );
}

export function ValidateSlide() {
  const reviewItems = [
    'Is the company description accurate and aligned with current operations?',
    'Are reporting period, geography, currency, and key facts correct?',
    'Do financial figures align with annual reports and filings?',
    'Are business segments, products, and end markets adequately covered?',
    'Have major growth drivers and strategic initiatives been captured?',
    'Are recent developments, M&A, partnerships, and management changes reflected?',
    'Is news relevant and free from unnecessary noise?',
    'Does the profile provide a balanced view?',
    'Are conclusions supported by evidence?',
    'Are dependencies (customer concentration, supplier reliance, geo exposure) highlighted?',
    'Does it reflect industry dynamics and competitive landscape?',
    'Are material gaps, inconsistencies, or unsupported statements present?',
  ];

  return (
    <SlideContainer>
      <SlideHeader
        section="Best Practice 4"
        title="Validate and Review the Output Before Use"
        subtitle="A well-written profile is not necessarily a well-validated one."
      />
      <Checklist items={reviewItems} columns={2} />
      <div className="remember-bar">
        Always verify key facts, challenge assumptions, and ensure the analysis reflects true business context before relying on the output.
      </div>
    </SlideContainer>
  );
}

export function EnhanceSlide() {
  return (
    <SlideContainer>
      <SlideHeader
        section="Best Practice 5"
        title="Enhance AI-Generated Presentations with Human Expertise"
        subtitle="Treat presentation outputs as drafts — not final deliverables."
      />
      <div className="two-column">
        <div>
          <h3 className="panel-title">Elements requiring manual refinement</h3>
          <BulletList
            items={[
              'Slide design & visual hierarchy',
              'Content placement & formatting consistency',
              'Branding standards',
              'Chart selection & data visualization',
              'Storytelling & narrative flow',
            ]}
          />
        </div>
        <div className="insight-panel">
          <h3>The analyst's role remains essential</h3>
          <p>
            Creating a company profile requires understanding the business, evaluating credibility,
            identifying key insights, and applying sound analytical judgment.
          </p>
          <p className="emphasis">
            AFA accelerates research and streamlines repetitive tasks — but subject matter expertise
            is required to challenge assumptions, verify findings, and ensure accuracy.
          </p>
        </div>
      </div>
    </SlideContainer>
  );
}

export function ConclusionSlide() {
  return (
    <SlideContainer className="slide-conclusion">
      <SlideHeader
        section="Conclusion"
        title="AFA as Your Research Partner"
      />
      <div className="takeaway-grid">
        <div className="takeaway-card">
          <span className="takeaway-icon">🎯</span>
          <strong>Start with purpose</strong>
          <p>Define audience, decisions, and focus</p>
        </div>
        <div className="takeaway-card">
          <span className="takeaway-icon">📋</span>
          <strong>Scope & sources</strong>
          <p>Specify period, currency, and trusted filings</p>
        </div>
        <div className="takeaway-card">
          <span className="takeaway-icon">📊</span>
          <strong>Demand evidence</strong>
          <p>Facts, sources, and clear interpretation</p>
        </div>
        <div className="takeaway-card">
          <span className="takeaway-icon">✅</span>
          <strong>Validate always</strong>
          <p>Human review before any deliverable use</p>
        </div>
        <div className="takeaway-card">
          <span className="takeaway-icon">✨</span>
          <strong>Refine & enhance</strong>
          <p>Polish design, narrative, and quality</p>
        </div>
      </div>
      <p className="conclusion-statement">
        The most effective use of AFA is as a research partner that enhances human expertise — not a substitute for it.
      </p>
    </SlideContainer>
  );
}
