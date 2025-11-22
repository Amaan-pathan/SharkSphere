import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  className = '',
  hover = true,
  onClick,
  glass = false,
  decor = true,
  ...props 
}) => {
  return (
    <motion.div
      onClick={onClick}
      whileHover={hover ? { y: -4, scale: 1.01 } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`
        ${glass ? 'glass border-white/10' : 'bg-bg-secondary border-border-light'} 
        border rounded-card p-4 sm:p-6 
        shadow-card transition-all duration-300
        ${hover ? 'hover:shadow-card-hover hover:border-purple-neon/40 cursor-pointer' : ''}
        ${decor ? 'card-decor' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;

