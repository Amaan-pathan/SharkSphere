import { motion } from 'framer-motion';
import Card from './Card.jsx';

const FeatureCard = ({ icon: Icon, title, description, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: [0.4, 0, 0.2, 1] }}
    >
      <Card hover glass className="h-full">
        <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
          {Icon && (
            <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-purple-DEFAULT/20 border border-purple-accent/30 flex items-center justify-center">
              <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-purple-neon" strokeWidth={2} />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="text-h4 font-semibold mb-2 sm:mb-3 text-text-heading leading-tight">
              {title}
            </h3>
            <p className="text-body text-text-body leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default FeatureCard;
