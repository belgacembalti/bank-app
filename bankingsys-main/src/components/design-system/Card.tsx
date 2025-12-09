import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
}

export function Card({ children, className = '', padding = 'md', hover = false }: CardProps) {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={`bg-white dark:bg-navy-800 rounded-xl shadow-md border border-gray-200 dark:border-navy-700 
        ${hover ? 'hover:shadow-lg transition-shadow' : ''} 
        ${paddingClasses[padding]} 
        ${className}`}
    >
      {children}
    </div>
  );
}
