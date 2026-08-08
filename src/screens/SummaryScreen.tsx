import { ActionButton, AppFrame } from '../components/AppFrame';
import { basicProfile, improvedProfile } from '../data/modules';
import { useGame } from '../context/GameContext';
import { getProficiencyLevel } from '../types/game';

export function SummaryScreen() {
  const { score, progress, maxProgress, competencies, restartAssessment } = useGame();
  const level = getProficiencyLevel(score);

  return (
    <AppFrame showHeader={false}>
      <div className="screen summary-screen">
        <div className="summary-header">
          <span className="landing-eyebrow">Operation Complete</span>
          <h2 className="summary-title">AFA Operative Training Debrief</h2>
          <p className="summary-subtitle">
            Review your operative clearance results and the Unilever PLC reference intel below.
          </p>
        </div>

        <div className="summary-metrics">
          <div className="summary-metric">
            <span className="summary-metric-label">Proficiency level</span>
            <span className="summary-metric-value summary-metric-value--level">{level}</span>
          </div>
          <div className="summary-metric">
            <span className="summary-metric-label">Final score</span>
            <span className="summary-metric-value">{score}</span>
          </div>
          <div className="summary-metric">
            <span className="summary-metric-label">Progress</span>
            <span className="summary-metric-value">{progress}/{maxProgress}</span>
          </div>
          <div className="summary-metric">
            <span className="summary-metric-label">Competencies</span>
            <span className="summary-metric-value">{competencies.length}/6</span>
          </div>
        </div>

        <div className="competency-grid">
          {competencies.map((c) => (
            <div key={c.id} className="competency-card">
              <span className="competency-card-code">{c.code}</span>
              <strong>{c.name}</strong>
              <p>{c.description}</p>
            </div>
          ))}
        </div>

        <div className="summary-comparison">
          <h3 className="summary-comparison-title">Unilever PLC — Output Comparison</h3>
          <div className="summary-comparison-grid">
            <figure>
              <figcaption>Generic prompt</figcaption>
              <div className="image-frame image-frame--summary">
                <img src={basicProfile} alt="Basic Unilever profile output" />
              </div>
            </figure>
            <figure>
              <figcaption>Structured prompt</figcaption>
              <div className="image-frame image-frame--summary">
                <img src={improvedProfile} alt="Improved Unilever profile output" />
              </div>
            </figure>
          </div>
        </div>

        <aside className="callout callout--info summary-disclaimer">
          <span className="callout-label">Reminder</span>
          <p>
            AFA accelerates research and information gathering. Human review, source validation,
            and analytical judgment remain essential before any deliverable is used.
          </p>
        </aside>

        <div className="screen-footer">
          <ActionButton label="Retake Assessment" onClick={restartAssessment} variant="coral" size="lg" />
        </div>
      </div>
    </AppFrame>
  );
}

/** @deprecated */
export const VictoryScreen = SummaryScreen;
