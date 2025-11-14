import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  className = '',
  hover = true,
  onClick,
  ...props 
}) => {
  return (
    <motion.div
      onClick={onClick}
      whileHover={hover ? { y: -4 } : {}}
      className={`bg-surface border border-charcoal rounded-2xl p-6 shadow-card transition-all duration-300 ${
        hover ? 'hover:shadow-card-hover cursor-pointer' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;

