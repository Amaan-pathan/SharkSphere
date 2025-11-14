import { forwardRef } from 'react';

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
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={`w-full px-4 py-3 bg-white dark:bg-white/5 border ${
          error 
            ? 'border-red-500 dark:border-red-500' 
            : 'border-gray-300 dark:border-white/10'
        } rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200 ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1.5 text-sm text-red-500">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">{helperText}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;

