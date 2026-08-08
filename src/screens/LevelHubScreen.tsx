import { AppFrame, ActionButton } from '../components/AppFrame';
import { MascotChat } from '../components/MascotChat';
import { useGame } from '../context/GameContext';
import { MODULES } from '../data/modules';
import { motion } from 'framer-motion';

import { useVoiceover } from '../hooks/useVoiceover';

import level1Img from '../assets/levels/level_1.png';
import level2Img from '../assets/levels/level_2.png';
import level3Img from '../assets/levels/level_3.png';
import level4Img from '../assets/levels/level_4.png';
import level5Img from '../assets/levels/level_5.png';
import level6Img from '../assets/levels/level_6.png';

const levelImages = [level1Img, level2Img, level3Img, level4Img, level5Img, level6Img];

const WELCOME_SCRIPT =
  "Hey, operative! Welcome to Acuity Intelligence. Your mission: clear all 6 levels and learn to build sharp, investment-ready company profiles. Pass each challenge, boost your score, and earn full deployment clearance. Ready when you are!";

function parseSubtitle(subtitle: string) {
  const parts = subtitle.split('—').map((part) => part.trim());
  return { level: parts[0] || subtitle, tag: parts[1] || '' };
}

function LevelCard({ mod, index, delay }: { mod: (typeof MODULES)[number]; index: number; delay: number }) {
  const isTeal = index % 2 === 0;
  const variant = isTeal ? 'teal' : 'coral';
  const tilt = index % 2 === 0 ? 'level-hub-card--tilt-left' : 'level-hub-card--tilt-right';
  const { level, tag } = parseSubtitle(mod.subtitle);

  return (
    <motion.article
      className={`level-hub-card level-hub-card--${variant} ${tilt}`}
      initial={{ opacity: 0, y: 16, rotate: index % 2 === 0 ? -4 : 4 }}
      animate={{ opacity: 1, y: 0, rotate: index % 2 === 0 ? -2 : 2 }}
      transition={{ delay, type: 'spring', stiffness: 170, damping: 16 }}
      whileHover={{ scale: 1.04, rotate: 0, zIndex: 10 }}
    >
      <div className="level-hub-card-image">
        <img src={levelImages[index]} alt="" />
        <span className="level-hub-card-num">{index + 1}</span>
        <span className="level-hub-card-code">{mod.competency?.code ?? `L${index + 1}`}</span>
      </div>
      <div className="level-hub-card-body">
        <span className="level-hub-card-level">{level}</span>
        {tag && <span className="level-hub-card-tag">{tag}</span>}
        <h3 className="level-hub-card-title">{mod.title}</h3>
      </div>
    </motion.article>
  );
}

export function LevelHubScreen() {
  const { startAssessment } = useGame();
  const { isPlaying } = useVoiceover();

  return (
    <AppFrame showHeader={false}>
      <div className="level-hub-screen">
        <header className="level-hub-header">
          <span className="level-hub-eyebrow">Acuity Intelligence Agency</span>
          <h1 className="level-hub-title">Operative Clearance Path</h1>
          <p className="level-hub-subtitle">Clear 6 levels, master AFA profiles, and earn your deployment badge</p>
        </header>

        <div className="level-hub-body">
          <div className="level-hub-cards-panel">
            <svg className="level-hub-connector" viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true">
              <path
                d="M 8 4 C 20 18, 35 22, 50 20 S 80 18, 92 4 M 8 36 C 20 22, 35 18, 50 20 S 80 22, 92 36"
                fill="none"
                stroke="var(--teal-light)"
                strokeWidth="1.2"
                strokeDasharray="3 3"
                opacity="0.55"
              />
            </svg>

            <div className="level-hub-card-row">
              {MODULES.slice(0, 3).map((mod, index) => (
                <LevelCard key={mod.id} mod={mod} index={index} delay={0.35 + index * 0.08} />
              ))}
            </div>

            <div className="level-hub-card-row">
              {MODULES.slice(3, 6).map((mod, index) => (
                <LevelCard key={mod.id} mod={mod} index={index + 3} delay={0.55 + index * 0.08} />
              ))}
            </div>

            <motion.div
              className="level-hub-start"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.85 }}
            >
              <ActionButton
                label="START MISSION"
                onClick={startAssessment}
                variant="coral"
                size="lg"
                disabled={isPlaying}
              />
            </motion.div>
          </div>

          <MascotChat message={WELCOME_SCRIPT} />
        </div>
      </div>
    </AppFrame>
  );
}
