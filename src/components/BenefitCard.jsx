import { motion } from 'framer-motion';
import Card from './Card.jsx';
import { Check } from 'lucide-react';

const BenefitCard = ({ title, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: [0.4, 0, 0.2, 1] }}
    >
      <Card hover glass className="h-full">
        <div className="flex items-start gap-2 sm:gap-3">
          <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-purple-DEFAULT/20 flex items-center justify-center mt-0.5">
            <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-neon" strokeWidth={2.5} />
          </div>
          <h3 className="text-base sm:text-h4 font-semibold text-text-heading leading-tight">
            {title}
          </h3>
        </div>
      </Card>
    </motion.div>
  );
};

export default BenefitCard;
