import { useEffect, useState, type ReactNode } from 'react';

const SLIDE_WIDTH = 1280;
const SLIDE_HEIGHT = 720;

/**
 * Fixed 1280×720 canvas, scaled uniformly to fit any viewport.
 * Matches foundations-clinic / Storyline 360 embed behaviour.
 */
export function StageCanvas({ children }: { children: ReactNode }) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const fit = () => {
      const scaleX = window.innerWidth / SLIDE_WIDTH;
      const scaleY = window.innerHeight / SLIDE_HEIGHT;
      setScale(Math.min(scaleX, scaleY));
    };

    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);

  return (
    <div className="w-screen h-screen flex items-center justify-center overflow-hidden bg-[#000]">
      <div
        className="relative origin-center bg-transparent"
        style={{
          width: SLIDE_WIDTH,
          height: SLIDE_HEIGHT,
          transform: `scale(${scale})`,
        }}
      >
        <div className="absolute inset-0 w-full h-full text-left">{children}</div>
      </div>
    </div>
  );
}
