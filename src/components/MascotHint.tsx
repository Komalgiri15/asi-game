import { useEffect, useState } from 'react';
import mascotImg from '../assets/mascot.png';

interface MascotHintProps {
  hint: string;
}

export function MascotHint({ hint }: MascotHintProps) {
  const [open, setOpen] = useState(false);
  const [displayed, setDisplayed] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!open) {
      setDisplayed('');
      setIsTyping(false);
      return;
    }

    setDisplayed('');
    setIsTyping(true);
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setDisplayed(hint.slice(0, index));
      if (index >= hint.length) {
        window.clearInterval(timer);
        setIsTyping(false);
      }
    }, 16);

    return () => window.clearInterval(timer);
  }, [open, hint]);

  return (
    <div className="mascot-hint">
      {open && (
        <div className="mascot-hint-bubble" role="status">
          <span className="mascot-hint-label">Handler hint</span>
          <p className="mascot-hint-text">
            {displayed}
            {isTyping && <span className="mascot-hint-cursor" aria-hidden="true" />}
          </p>
        </div>
      )}

      <button
        type="button"
        className={`mascot-hint-trigger${open ? ' mascot-hint-trigger--open' : ''}`}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-label={open ? 'Hide hint' : 'Show hint'}
      >
        <img src={mascotImg} alt="" className="mascot-hint-avatar" />
        {!open && <span className="mascot-hint-badge">?</span>}
      </button>
    </div>
  );
}
