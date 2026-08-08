import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const MUTE_KEY = 'asi-voiceover-muted';

interface VoiceoverContextValue {
  isMuted: boolean;
  toggleMute: () => void;
  isPlaying: boolean;
  isSupported: boolean;
  play: (text: string) => void;
  stop: () => void;
}

const VoiceoverContext = createContext<VoiceoverContextValue | null>(null);

function pickVoice(): SpeechSynthesisVoice | undefined {
  const voices = window.speechSynthesis.getVoices();
  return voices.find(
    (voice) =>
      voice.lang.startsWith('en-') &&
      (voice.name.includes('Google') ||
        voice.name.includes('Premium') ||
        voice.name.includes('Natural')),
  );
}

export function VoiceoverProvider({ children }: { children: ReactNode }) {
  const [isMuted, setIsMuted] = useState(() => {
    try {
      return localStorage.getItem(MUTE_KEY) === 'true';
    } catch {
      return false;
    }
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    if ('speechSynthesis' in window) {
      setIsSupported(true);
    }
  }, []);

  useEffect(() => {
    if (!isSupported) return;
    const loadVoices = () => window.speechSynthesis.getVoices();
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, [isSupported]);

  const stop = useCallback(() => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  }, []);

  const play = useCallback(
    (text: string) => {
      if (!isSupported || isMuted || !text.trim()) return;

      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      const voice = pickVoice();
      if (voice) utterance.voice = voice;
      utterance.rate = 0.95;

      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);

      window.speechSynthesis.speak(utterance);
    },
    [isSupported, isMuted],
  );

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(MUTE_KEY, String(next));
      } catch {
        /* ignore storage errors */
      }
      if (next) stop();
      return next;
    });
  }, [stop]);

  useEffect(() => () => stop(), [stop]);

  return (
    <VoiceoverContext.Provider
      value={{ isMuted, toggleMute, isPlaying, isSupported, play, stop }}
    >
      {children}
    </VoiceoverContext.Provider>
  );
}

export function useVoiceover() {
  const ctx = useContext(VoiceoverContext);
  if (!ctx) throw new Error('useVoiceover must be used within VoiceoverProvider');
  return ctx;
}

export function useAutoVoiceover(text: string, enabled = true) {
  const { play, stop, isMuted, isSupported } = useVoiceover();

  useEffect(() => {
    if (!enabled || !isSupported || isMuted || !text.trim()) return;

    const timer = window.setTimeout(() => play(text), 350);
    return () => {
      window.clearTimeout(timer);
      stop();
    };
  }, [text, enabled, isMuted, isSupported, play, stop]);
}

interface VoiceoverToggleProps {
  className?: string;
}

export function VoiceoverToggle({ className = '' }: VoiceoverToggleProps) {
  const { isMuted, toggleMute, isSupported, isPlaying } = useVoiceover();

  if (!isSupported) return null;

  return (
    <button
      type="button"
      className={`voiceover-toggle${isMuted ? ' voiceover-toggle--muted' : ''}${isPlaying ? ' voiceover-toggle--playing' : ''} ${className}`.trim()}
      onClick={toggleMute}
      aria-pressed={isMuted}
      aria-label={isMuted ? 'Unmute voiceover' : 'Mute voiceover'}
    >
      {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      <span>{isMuted ? 'Unmute' : 'Mute'}</span>
    </button>
  );
}
