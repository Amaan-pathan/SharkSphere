import { motion } from 'framer-motion';
import Card from './Card.jsx';

const BenefitCard = ({ title, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay, ease: [0.4, 0, 0.2, 1] }}
    >
      <Card hover={false} className="h-full">
        <h3 className="text-h3 font-semibold text-text-heading leading-tight">
          {title}
        </h3>
      </Card>
    </motion.div>
  );
};

export default BenefitCard;
