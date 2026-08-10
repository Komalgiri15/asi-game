import { useEffect, useCallback } from 'react';
import { useGame } from '../context/GameContext';

export function useVoiceover(initialText?: string) {
  const { isMuted } = useGame();

  const speak = useCallback((text: string) => {
    if (isMuted) return;
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Try to find a nice english voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => 
      (v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Premium')) && v.lang.startsWith('en')
    );
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    
    window.speechSynthesis.speak(utterance);
  }, []);

  useEffect(() => {
    // Chrome sometimes needs a slight delay or user interaction to load voices
    const timer = setTimeout(() => {
      if (initialText) {
        speak(initialText);
      }
    }, 100);
    
    return () => {
      clearTimeout(timer);
      window.speechSynthesis.cancel();
    };
  }, [initialText, speak, isMuted]);

  return { speak };
}
