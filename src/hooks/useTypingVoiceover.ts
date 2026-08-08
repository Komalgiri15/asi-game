import { useEffect, useRef, useState } from 'react';
import { useVoiceover } from './useVoiceover';

function estimateSpeechMs(text: string, rate = 0.95) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const baseWpm = 155 * rate;
  return Math.max(3500, (words / baseWpm) * 60_000);
}

export function useTypingVoiceover(text: string, enabled = true) {
  const { play, stop, isPlaying, isMuted, isSupported } = useVoiceover();
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const wasPlayingRef = useRef(false);

  useEffect(() => {
    if (!enabled || !text.trim()) return;

    wasPlayingRef.current = false;
    setDisplayedText('');
    setIsTyping(true);

    const startDelay = window.setTimeout(() => {
      if (isSupported && !isMuted) play(text);
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
      stop();
    };
  }, [text, enabled, isMuted, isSupported, play, stop]);

  useEffect(() => {
    if (isPlaying) {
      wasPlayingRef.current = true;
      return;
    }
    if (wasPlayingRef.current && displayedText.length < text.length) {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      intervalRef.current = null;
      setDisplayedText(text);
      setIsTyping(false);
    }
  }, [isPlaying, displayedText.length, text]);

  return { displayedText, isTyping, isPlaying };
}
