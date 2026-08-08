import { useCallback, useEffect, useRef, useState } from 'react';
import { useGame } from '../context/GameContext';
import introVideo from '../assets/intro.mp4';
import { AppFrame } from '../components/AppFrame';
import { Play, Volume2 } from 'lucide-react';

export function IntroVideoScreen() {
  const { completeIntroVideo } = useGame();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [needsPlayTap, setNeedsPlayTap] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const tryAutoplay = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    setIsMuted(true);

    try {
      await video.play();
      setNeedsPlayTap(false);
    } catch {
      setNeedsPlayTap(true);
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    tryAutoplay();
    video.addEventListener('loadeddata', tryAutoplay);

    return () => video.removeEventListener('loadeddata', tryAutoplay);
  }, [tryAutoplay]);

  const handlePlayIntro = async () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    setIsMuted(false);

    try {
      await video.play();
      setNeedsPlayTap(false);
    } catch {
      video.muted = true;
      setIsMuted(true);
      try {
        await video.play();
        setNeedsPlayTap(false);
      } catch {
        setNeedsPlayTap(true);
      }
    }
  };

  const handleUnmute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    setIsMuted(false);
  };

  return (
    <AppFrame showHeader={false}>
      <div className="intro-video-screen">
        <button type="button" className="intro-video-skip" onClick={completeIntroVideo}>
          Skip Intro
        </button>

        <video
          ref={videoRef}
          className="intro-video-player"
          src={introVideo}
          onEnded={completeIntroVideo}
          autoPlay
          muted
          playsInline
          preload="auto"
        />

        {needsPlayTap && (
          <div className="intro-video-overlay">
            <button type="button" className="intro-video-play" onClick={handlePlayIntro}>
              <Play size={28} fill="currentColor" />
              <span>Play Intro</span>
            </button>
          </div>
        )}

        {!needsPlayTap && isMuted && (
          <button type="button" className="intro-video-unmute" onClick={handleUnmute} aria-label="Unmute intro">
            <Volume2 size={16} />
            <span>Unmute</span>
          </button>
        )}
      </div>
    </AppFrame>
  );
}
