import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  loading = false,
  onClick,
  type = 'button',
  className = '',
  ...props 
}) => {
  const baseStyles = 'font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg-primary disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden';
  
  const variants = {
    primary: 'bg-purple-DEFAULT text-white shadow-glow-purple hover:shadow-glow-button hover:bg-purple-accent focus:ring-purple-DEFAULT',
    secondary: 'bg-bg-secondary/50 backdrop-blur-sm border border-border-light text-text-body hover:bg-bg-secondary hover:border-purple-accent/50 hover:text-text-heading focus:ring-purple-DEFAULT',
    ghost: 'text-text-body hover:text-text-heading hover:bg-bg-secondary/50',
    neon: 'bg-purple-DEFAULT text-white shadow-glow-neon hover:shadow-glow-button hover:bg-purple-neon focus:ring-purple-neon',
  };

  const sizes = {
    sm: 'px-4 py-2.5 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={disabled || loading ? {} : { scale: 1.02, y: -1 }}
      whileTap={disabled || loading ? {} : { scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} flex items-center justify-center ${className}`}
      {...props}
    >
      {variant === 'primary' || variant === 'neon' ? (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-DEFAULT via-purple-neon to-purple-DEFAULT opacity-0 hover:opacity-20 transition-opacity duration-300"
          initial={false}
        />
      ) : null}
      <span className="relative z-10 flex items-center gap-2">
        {loading ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
            />
            Loading...
          </>
        ) : (
          children
        )}
      </span>
    </motion.button>
  );
};

export default Button;

