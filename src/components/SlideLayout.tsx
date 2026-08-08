import { ReactNode } from 'react';

interface SlideContainerProps {
  children: ReactNode;
  className?: string;
}

export function SlideContainer({ children, className = '' }: SlideContainerProps) {
  return (
    <div className={`slide-frame ${className}`}>{children}</div>
  );
}

interface NavButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost';
}

export function NavButton({ label, onClick, disabled, variant = 'primary' }: NavButtonProps) {
  return (
    <button
      type="button"
      className={`nav-btn nav-btn--${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}

interface SlideHeaderProps {
  section?: string;
  title: string;
  subtitle?: string;
}

export function SlideHeader({ section, title, subtitle }: SlideHeaderProps) {
  return (
    <header className="slide-header">
      {section && <span className="slide-section">{section}</span>}
      <h1 className="slide-title">{title}</h1>
      {subtitle && <p className="slide-subtitle">{subtitle}</p>}
    </header>
  );
}

interface PromptBoxProps {
  label: string;
  text: string;
  variant?: 'bad' | 'good' | 'neutral';
}

export function PromptBox({ label, text, variant = 'neutral' }: PromptBoxProps) {
  return (
    <div className={`prompt-box prompt-box--${variant}`}>
      <span className="prompt-label">{label}</span>
      <p className="prompt-text">{text}</p>
    </div>
  );
}

interface ImagePlaceholderProps {
  src?: string;
  alt: string;
  caption: string;
}

export function ImagePlaceholder({ src, alt, caption }: ImagePlaceholderProps) {
  return (
    <figure className="image-placeholder">
      {src ? (
        <img src={src} alt={alt} className="reference-image" />
      ) : (
        <div className="image-fallback">
          <span className="image-fallback-icon" aria-hidden="true">📄</span>
          <span className="image-fallback-text">{alt}</span>
          <span className="image-fallback-hint">Add image to /public/assets/</span>
        </div>
      )}
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

interface ChecklistProps {
  items: string[];
  columns?: 1 | 2;
}

export function Checklist({ items, columns = 1 }: ChecklistProps) {
  return (
    <ul className={`checklist checklist--cols-${columns}`}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

interface BulletListProps {
  items: string[];
}

export function BulletList({ items }: BulletListProps) {
  return (
    <ul className="bullet-list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

interface ProTipProps {
  children: ReactNode;
}

export function ProTip({ children }: ProTipProps) {
  return (
    <aside className="pro-tip">
      <span className="pro-tip-badge">Pro Tip</span>
      <p>{children}</p>
    </aside>
  );
}

interface SlideNavProps {
  currentIndex: number;
  totalSlides: number;
  onPrev: () => void;
  onNext: () => void;
  canPrev: boolean;
  canNext: boolean;
}

export function SlideNav({ currentIndex, totalSlides, onPrev, onNext, canPrev, canNext }: SlideNavProps) {
  return (
    <footer className="slide-nav">
      <NavButton label="← Previous" onClick={onPrev} disabled={!canPrev} variant="secondary" />
      <div className="slide-progress">
        <div className="slide-progress-track">
          <div
            className="slide-progress-fill"
            style={{ width: `${((currentIndex + 1) / totalSlides) * 100}%` }}
          />
        </div>
        <span className="slide-counter">
          {currentIndex + 1} / {totalSlides}
        </span>
      </div>
      <NavButton label="Next →" onClick={onNext} disabled={!canNext} />
    </footer>
  );
}
