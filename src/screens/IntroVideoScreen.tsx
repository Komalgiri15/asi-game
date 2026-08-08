import { useRef } from 'react';
import { useGame } from '../context/GameContext';
import introVideo from '../assets/intro.mp4';
import { AppFrame } from '../components/AppFrame';

export function IntroVideoScreen() {
  const { completeIntroVideo } = useGame();
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <AppFrame showHeader={false}>
      <div className="screen intro-video-screen" style={{ backgroundColor: '#000', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        
        <button
          onClick={completeIntroVideo}
          style={{
            position: 'absolute',
            bottom: '40px',
            right: '40px',
            zIndex: 10,
            background: 'rgba(0,0,0,0.5)',
            color: 'white',
            border: '1px solid rgba(255,255,255,0.2)',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '12px',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}
        >
          Skip Intro
        </button>

        <video
          ref={videoRef}
          src={introVideo}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onEnded={completeIntroVideo}
          autoPlay
          playsInline
        />

      </div>
    </AppFrame>
  );
}
