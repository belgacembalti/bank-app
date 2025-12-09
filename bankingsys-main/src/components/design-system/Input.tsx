import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
}

export function Input({
  label,
  error,
  helperText,
  icon,
  className = '',
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block mb-2 text-navy-700 dark:text-gray-200">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            {icon}
          </div>
        )}
        <input
          className={`w-full px-4 py-2.5 ${icon ? 'pl-10' : ''} border-2 rounded-lg bg-white dark:bg-navy-800 border-gray-300 dark:border-navy-600 
            focus:border-primary-500 focus:ring-4 focus:ring-primary-100 dark:focus:ring-primary-900/30 outline-none transition-all
            ${error ? 'border-danger-500 focus:border-danger-500 focus:ring-danger-100' : ''}
            ${className}`}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1.5 text-sm text-danger-600 dark:text-danger-400">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1.5 text-sm text-gray-600 dark:text-gray-400">{helperText}</p>
      )}
    </div>
  );
}
