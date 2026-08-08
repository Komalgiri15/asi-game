import { ReactNode } from 'react';
import { useGame } from '../context/GameContext';
import { ProfileReference as ProfileReferenceType } from '../types/game';

interface AppFrameProps {
  children: ReactNode;
  showHeader?: boolean;
}

import { motion } from 'framer-motion';
import bgImg from '../assets/bg.png';
import { VoiceoverToggle } from '../context/VoiceoverContext';

export function AppFrame({ children, showHeader = true }: AppFrameProps) {
  const { phase } = useGame();
  const isFullBleed = !showHeader;

  return (
    <div className={`app-layout${isFullBleed ? ' app-layout--hub' : ''}`}>
      <div
        className="app-layout__bg"
        style={{ backgroundImage: `url(${bgImg})` }}
        aria-hidden="true"
      />
      <div className="app-layout__scrim" aria-hidden="true" />
      <div
        className="app-frame"
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          background: 'transparent',
          overflow: 'hidden',
          border: isFullBleed ? 'none' : '12px solid var(--teal-primary)',
          borderRadius: isFullBleed ? 0 : '16px',
          margin: isFullBleed ? 0 : '8px',
          boxSizing: 'border-box',
        }}
      >
      {!isFullBleed && (
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0, pointerEvents: 'none' }}>
          <div className="bg-shape shape-1" />
          <div className="bg-shape shape-2" />
          <div className="bg-shape shape-3" />
        </div>
      )}
      
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
        {isFullBleed && <VoiceoverToggle className="voiceover-toggle--floating" />}
        {showHeader && <AppHeader />}
        <div className="app-body">
          <motion.div
            key={phase}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            style={{ width: '100%', height: '100%' }}
          >
            {children}
          </motion.div>
        </div>
      </div>
    </div>
    </div>
  );
}

/** @deprecated */
export const GameFrame = AppFrame;

function AppHeader() {
  const { module, moduleIndex, totalModules, score, progress, maxProgress, phase } = useGame();

  if (phase === 'title' || phase === 'summary') return null;

  const progressPercent = Math.min(100, (progress / maxProgress) * 100);

  return (
    <header className="app-header">
      <div className="header-brand">
        <span className="header-brand-name">Acuity Analytics</span>
        <span className="header-brand-divider" aria-hidden="true" />
        <span className="header-module">Module {moduleIndex + 1} of {totalModules}</span>
      </div>
      <div className="header-title">{module?.title}</div>
      <div className="header-metrics">
        <VoiceoverToggle className="voiceover-toggle--header" />
        <div className="header-progress">
          <div className="header-progress-track">
            <div className="header-progress-fill" style={{ width: `${progressPercent}%` }} />
          </div>
          <span className="header-progress-label">{Math.round(progressPercent)}% complete</span>
        </div>
        <div className="header-score">
          <span className="header-score-label">Score</span>
          <span className="header-score-value">{score}</span>
        </div>
      </div>
    </header>
  );
}

interface ActionButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'coral' | 'teal';
  disabled?: boolean;
  size?: 'md' | 'lg';
}

export function ActionButton({
  label,
  onClick,
  variant = 'primary',
  disabled,
  size = 'md',
}: ActionButtonProps) {
  return (
    <button
      type="button"
      className={`action-btn action-btn--${variant} action-btn--${size}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}

/** @deprecated */
export const GameButton = ActionButton;

interface FeedbackBannerProps {
  type: 'success' | 'error' | 'info';
  message: string;
}

export function FeedbackBanner({ type, message }: FeedbackBannerProps) {
  return (
    <div className={`feedback-banner feedback-banner--${type}`} role="alert">
      {message}
    </div>
  );
}

interface ProfileReferenceProps {
  reference: ProfileReferenceType;
  compact?: boolean;
}

export function ProfileReferencePanel({ reference, compact = false }: ProfileReferenceProps) {
  return (
    <div className={`profile-ref ${compact ? 'profile-ref--compact' : ''}`}>
      {!compact && (
        <div className="profile-ref-meta">
          <span className={`profile-ref-tag profile-ref-tag--${reference.variant}`}>
            {reference.label}
          </span>
          <h3 className="profile-ref-title">{reference.title}</h3>
          <p className="profile-ref-caption">{reference.caption}</p>
        </div>
      )}
      <div className="profile-ref-viewer">
        {compact && (
          <span className={`profile-ref-tag profile-ref-tag--${reference.variant} profile-ref-tag--overlay`}>
            {reference.label}
          </span>
        )}
        <div className="image-frame image-frame--reference">
          <img src={reference.image} alt={reference.title} className="profile-ref-image" />
        </div>
      </div>
      {!compact && (
        <ul className="profile-ref-callouts">
          {reference.callouts.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
