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
        <div className="space-y-4">
          {Icon && (
            <div className="w-10 h-10 rounded-lg bg-purple-DEFAULT/20 border border-purple-accent/30 flex items-center justify-center">
              <Icon className="w-5 h-5 text-purple-neon" strokeWidth={2} />
            </div>
          )}
          <div>
            <div className="text-small font-semibold text-purple-neon mb-2 uppercase tracking-wide">
              {stage}
            </div>
            <p className="text-body text-text-body leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default StageCard;
