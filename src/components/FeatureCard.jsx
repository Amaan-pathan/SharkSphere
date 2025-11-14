import { motion } from 'framer-motion';
import Card from './Card.jsx';

const FeatureCard = ({ icon: Icon, title, description, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay, ease: [0.4, 0, 0.2, 1] }}
    >
      <Card hover className="h-full">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-surface flex items-center justify-center">
            {Icon && <Icon className="w-5 h-5 text-gold-muted" strokeWidth={1.5} />}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold mb-2 text-text-primary leading-tight">
              {title}
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default FeatureCard;
