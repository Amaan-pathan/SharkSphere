import { forwardRef } from 'react';
import { motion } from 'framer-motion';

const Input = forwardRef(({ 
  label, 
  error, 
  helperText,
  className = '',
  ...props 
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-text-body mb-2.5">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={`w-full px-4 py-3.5 bg-bg-secondary/50 backdrop-blur-sm border ${
          error 
            ? 'border-red-500/50' 
            : 'border-border-light'
        } rounded-lg text-text-heading placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-purple-neon focus:border-purple-neon focus:shadow-glow-purple transition-all duration-300 hover:border-purple-DEFAULT/50 ${className}`}
        {...props}
      />
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-sm text-red-400"
        >
          {error}
        </motion.p>
      )}
      {helperText && !error && (
        <p className="mt-2 text-xs text-text-muted">{helperText}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;

