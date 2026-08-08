import { AppFrame } from '../components/AppFrame';
import { basicProfile, improvedProfile } from '../data/modules';
import { useGame } from '../context/GameContext';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Shield } from 'lucide-react';

export function TitleScreen() {
  const { startAssessment } = useGame();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const floatingVariants = {
    float1: { y: [-5, 5, -5], transition: { duration: 4, repeat: Infinity } },
    float2: { y: [5, -5, 5], transition: { duration: 5, repeat: Infinity } },
  };

  return (
    <AppFrame showHeader={false}>
      <div className="screen landing-screen">
        <motion.div 
          className="landing-main"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="landing-brand" variants={itemVariants}>
            <span className="landing-eyebrow" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Shield size={16} /> Acuity Intelligence Agency
            </span>
            <span className="landing-product">Agent Fleet Assistant (AFA) Training</span>
          </motion.div>
          <motion.h1 className="landing-title" variants={itemVariants}>
            Operative Skills: Company Profiles
          </motion.h1>
          <motion.p className="landing-description" variants={itemVariants}>
            An interactive agent simulation covering prompt design, target prioritization,
            evidence gathering, and output validation for investment-grade profiles.
          </motion.p>
          <motion.ul className="landing-outline" variants={itemVariants}>
            <li><CheckCircle2 size={18} color="var(--teal-bright)" /> 6 guided modules with applied scenarios</li>
            <li><CheckCircle2 size={18} color="var(--teal-bright)" /> Reference outputs from Unilever PLC case study</li>
            <li><CheckCircle2 size={18} color="var(--teal-bright)" /> Competency tracking across core AFA skills</li>
          </motion.ul>
          <motion.div variants={itemVariants} style={{ marginTop: '20px' }}>
            <button 
              className="action-btn action-btn--coral action-btn--lg" 
              onClick={startAssessment}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 15px rgba(255, 97, 100, 0.3)' }}
            >
              Begin Assessment <ArrowRight size={20} />
            </button>
          </motion.div>
        </motion.div>

        <div className="landing-preview">
          <p className="landing-preview-heading">Case Study — Unilever PLC</p>
          <div className="landing-comparison">
            <motion.figure className="landing-thumb" variants={floatingVariants} animate="float1">
              <figcaption className="landing-thumb-label landing-thumb-label--basic">Generic prompt output</figcaption>
              <div className="image-frame image-frame--thumb">
                <img src={basicProfile} alt="Unilever PLC basic M&A profile" />
              </div>
            </motion.figure>
            <motion.figure className="landing-thumb" variants={floatingVariants} animate="float2">
              <figcaption className="landing-thumb-label landing-thumb-label--improved">Structured prompt output</figcaption>
              <div className="image-frame image-frame--thumb">
                <img src={improvedProfile} alt="Unilever PLC improved one-pager profile" />
              </div>
            </motion.figure>
          </div>
        </div>
      </div>
    </AppFrame>
  );
}
