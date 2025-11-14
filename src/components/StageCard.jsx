import { motion } from 'framer-motion';
import Card from './Card.jsx';

const StageCard = ({ stage, description, icon: Icon, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.3, delay, ease: [0.4, 0, 0.2, 1] }}
    >
      <Card className="h-full">
        <div className="space-y-3">
          {Icon && (
            <div className="w-9 h-9 rounded-lg bg-surface flex items-center justify-center">
              <Icon className="w-4 h-4 text-gold-muted" strokeWidth={1.5} />
            </div>
          )}
          <div>
            <div className="text-xs font-semibold text-gold-muted mb-1.5 uppercase tracking-wide">
              {stage}
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default StageCard;
