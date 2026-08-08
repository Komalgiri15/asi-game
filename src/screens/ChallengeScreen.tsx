import { AppFrame } from '../components/AppFrame';
import { ChallengeRenderer } from '../components/ChallengeRenderer';
import { useGame } from '../context/GameContext';
import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';

export function ChallengeScreen() {
  const { module } = useGame();

  return (
    <AppFrame>
      <div className="screen exercise-screen" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div 
          className="exercise-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="section-label">{module?.subtitle}</span>
          <h2 className="exercise-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Lightbulb size={28} color="var(--teal-primary)" /> Applied Exercise
          </h2>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}
        >
          <ChallengeRenderer />
        </motion.div>
      </div>
    </AppFrame>
  );
}
