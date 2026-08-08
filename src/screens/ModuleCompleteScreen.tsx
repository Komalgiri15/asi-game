import { ActionButton, AppFrame } from '../components/AppFrame';
import { useGame } from '../context/GameContext';
import { motion } from 'framer-motion';
import { Trophy, Star } from 'lucide-react';

export function ModuleCompleteScreen() {
  const {
    module,
    score,
    progress,
    maxProgress,
    advanceFromModuleComplete,
    moduleIndex,
    totalModules,
  } = useGame();

  if (!module) return null;

  const isLast = moduleIndex >= totalModules - 1;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const scaleVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1, transition: { stiffness: 200, damping: 15 } }
  };

  return (
    <AppFrame>
      <div className="screen complete-screen" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div 
          className="complete-layout"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="complete-status">
            <motion.div variants={scaleVariants} style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
              <Trophy size={64} color="var(--coral-primary)" />
            </motion.div>
            <motion.h2 className="complete-title" variants={itemVariants}>Level Cleared</motion.h2>
            <motion.p className="complete-subtitle" variants={itemVariants}>{module.title}</motion.p>
          </div>

          {module.competency && (
            <motion.div className="competency-earned" variants={itemVariants} style={{ boxShadow: '0 0 20px rgba(96, 225, 213, 0.4)', borderColor: 'var(--teal-light)' }}>
              <span className="competency-earned-code">{module.competency.code}</span>
              <div>
                <span className="competency-earned-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Star size={14} color="var(--teal-bright)" /> Operative skill unlocked
                </span>
                <strong>{module.competency.name}</strong>
                <p>{module.competency.description}</p>
              </div>
            </motion.div>
          )}

          <div className="complete-metrics">
            <motion.div className="metric-card" variants={itemVariants}>
              <span className="metric-value">{score}</span>
              <span className="metric-label">Mission score</span>
            </motion.div>
            <motion.div className="metric-card" variants={itemVariants}>
              <span className="metric-value">{progress}/{maxProgress}</span>
              <span className="metric-label">Clearance points</span>
            </motion.div>
            <motion.div className="metric-card" variants={itemVariants}>
              <span className="metric-value">{moduleIndex + 1}/{totalModules}</span>
              <span className="metric-label">Levels completed</span>
            </motion.div>
          </div>
        </motion.div>
        
        <motion.div 
          className="screen-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <ActionButton
            label={isLast ? 'View Debriefing' : 'Proceed to Next Level'}
            onClick={advanceFromModuleComplete}
            variant="teal"
            size="lg"
          />
        </motion.div>
      </div>
    </AppFrame>
  );
}

/** @deprecated */
export const MissionCompleteScreen = ModuleCompleteScreen;
