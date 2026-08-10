import { useEffect, useRef, useState } from 'react';
import { useVoiceover } from './useVoiceover';
import { useGame } from '../context/GameContext';

function estimateSpeechMs(text: string, rate = 0.95) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const baseWpm = 155 * rate;
  return Math.max(3500, (words / baseWpm) * 60_000);
}

export function useTypingVoiceover(text: string, enabled = true) {
  const { speak } = useVoiceover();
  const { isMuted } = useGame();
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled || !text.trim()) return;

    setDisplayedText('');
    setIsTyping(true);

    const startDelay = window.setTimeout(() => {
      if (window.speechSynthesis && !isMuted) speak(text);
    }, 450);

    const duration = isMuted ? text.length * 28 : estimateSpeechMs(text);
    const charDelay = duration / text.length;

    let index = 0;
    intervalRef.current = window.setInterval(() => {
      index += 1;
      setDisplayedText(text.slice(0, index));
      if (index >= text.length) {
        if (intervalRef.current) window.clearInterval(intervalRef.current);
        intervalRef.current = null;
        setIsTyping(false);
      }
    }, charDelay);

    return () => {
      window.clearTimeout(startDelay);
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    };
  }, [text, enabled, isMuted, speak]);

  return { displayedText, isTyping };
}
