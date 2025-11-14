import { motion } from 'framer-motion';
import Card from './Card.jsx';

const StageCard = ({ stage, description, icon: Icon, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay, ease: [0.4, 0, 0.2, 1] }}
    >
      <Card hover glass className="h-full">
        <div className="space-y-3 sm:space-y-4">
          {Icon && (
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-purple-DEFAULT/20 border border-purple-accent/30 flex items-center justify-center">
              <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-purple-neon" strokeWidth={2} />
            </div>
          )}
          <div>
            <div className="text-xs sm:text-small font-semibold text-purple-neon mb-1.5 sm:mb-2 uppercase tracking-wide">
              {stage}
            </div>
            <p className="text-sm sm:text-body text-text-body leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default StageCard;
