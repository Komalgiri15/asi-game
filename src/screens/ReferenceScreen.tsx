import { ActionButton, AppFrame, ProfileReferencePanel } from '../components/AppFrame';
import { useGame } from '../context/GameContext';

export function ReferenceScreen() {
  const { module, advanceFromReference } = useGame();

  if (!module?.reference) return null;

  return (
    <AppFrame>
      <div className="screen reference-screen">
        <div className="reference-header">
          <span className="section-label">{module.subtitle}</span>
          <h2 className="section-title">{module.reference.title}</h2>
        </div>

        <div className="reference-layout">
          <div className="reference-analysis">
            <p className="section-body">{module.reference.caption}</p>
            <ul className="analysis-list analysis-list--compact">
              {module.reference.callouts.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            {module.reference.variant === 'basic' ? (
              <aside className="callout callout--warning callout--compact">
                <span className="callout-label">Improvement opportunity</span>
                <p>Compare against investment committee standards for sourcing, structure, and depth.</p>
              </aside>
            ) : (
              <aside className="callout callout--info callout--compact">
                <span className="callout-label">Best practice example</span>
                <p>Structured prompt with defined audience, sources, and fact-based quadrants.</p>
              </aside>
            )}
          </div>

          <ProfileReferencePanel reference={module.reference} compact />
        </div>

        <div className="screen-footer">
          <ActionButton label="Continue to Exercise" onClick={advanceFromReference} variant="coral" size="lg" />
        </div>
      </div>
    </AppFrame>
  );
}
