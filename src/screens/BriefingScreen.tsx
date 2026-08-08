import { ActionButton, AppFrame } from '../components/AppFrame';
import { useGame } from '../context/GameContext';
import { motion } from 'framer-motion';
import { Target, Award, BookOpen } from 'lucide-react';
import { useAutoVoiceover, useVoiceover } from '../hooks/useVoiceover';

export function BriefingScreen() {
  const { module, advanceFromBriefing } = useGame();
  const { stop } = useVoiceover();

  const voiceoverText = module
    ? `${module.title}. ${module.briefing} Guidance: ${module.tip}`
    : '';
  useAutoVoiceover(voiceoverText, !!module);

  if (!module) return null;

  const handleAdvance = () => {
    stop();
    advanceFromBriefing();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  const sidebarVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <AppFrame>
      <div className="screen briefing-screen">
        <div className="briefing-layout" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div 
            className="briefing-content"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.span className="section-label" variants={itemVariants}>{module.subtitle}</motion.span>
            <motion.h2 className="section-title" variants={itemVariants} style={{ marginTop: '12px' }}>{module.title}</motion.h2>
            <motion.p className="section-body" variants={itemVariants}>{module.briefing}</motion.p>
            <motion.aside className="callout callout--tip" variants={itemVariants}>
              <span className="callout-label">Guidance</span>
              <p>{module.tip}</p>
            </motion.aside>
          </motion.div>
          
          <motion.aside 
            className="briefing-sidebar"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="sidebar-card" variants={sidebarVariants}>
              <span className="sidebar-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Target size={16} color="var(--teal-primary)" /> Level clearance weight
              </span>
              <span className="sidebar-value">{module.progressWeight} pts</span>
            </motion.div>
            
            {module.competency && (
              <motion.div className="sidebar-card" variants={sidebarVariants}>
                <span className="sidebar-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Award size={16} color="var(--teal-primary)" /> Agent competency tracked
                </span>
                <span className="competency-chip">
                  <span className="competency-code">{module.competency.code}</span>
                  {module.competency.name}
                </span>
              </motion.div>
            )}
            
            {module.reference && (
              <motion.div className="sidebar-card sidebar-card--highlight" variants={sidebarVariants}>
                <span className="sidebar-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <BookOpen size={16} color="var(--teal-primary)" /> Target dossier included
                </span>
                <p className="sidebar-note">Review the Unilever PLC profile output before proceeding.</p>
              </motion.div>
            )}
          </motion.aside>
        </div>
        <motion.div 
          className="screen-footer" 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.4 }}
          style={{ position: 'relative', zIndex: 1 }}
        >
          <ActionButton
            label={module.reference ? 'Access Dossier' : 'Commence Operation'}
            onClick={handleAdvance}
            variant="coral"
            size="lg"
          />
        </motion.div>
      </div>
    </AppFrame>
  );
}
