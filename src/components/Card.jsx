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
      whileHover={hover ? { y: -2 } : {}}
      className={`bg-bg-secondary border border-border rounded-card p-6 transition-all duration-300 ${
        hover ? 'hover:border-purple-accent/30 cursor-pointer' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;

