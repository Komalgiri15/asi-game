import { motion } from 'framer-motion';
import mascotImg from '../assets/mascot.png';
import { useTypingVoiceover } from '../hooks/useTypingVoiceover';

interface MascotChatProps {
  message: string;
  label?: string;
}

export function MascotChat({ message, label = 'AI Handler' }: MascotChatProps) {
  const { displayedText, isTyping } = useTypingVoiceover(message);

  return (
    <div className="level-hub-mascot-panel">
      <motion.div
        className="level-hub-chat"
        initial={{ opacity: 0, y: 12, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, delay: 0.2 }}
      >
        <span className="level-hub-chat-label">{label}</span>
        <p className="level-hub-chat-text">
          {displayedText}
          {isTyping && <span className="level-hub-chat-cursor" aria-hidden="true" />}
        </p>
      </motion.div>

      <div className="level-hub-mascot-wrap">
        <div className="level-hub-mascot-glow" aria-hidden="true" />
        <motion.img
          src={mascotImg}
          alt="AI Handler"
          className="level-hub-mascot"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
          transition={{
            opacity: { duration: 0.4, delay: 0.35 },
            scale: { duration: 0.4, delay: 0.35 },
            y: { repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 0.8 },
          }}
        />
      </div>
    </div>
  );
}
