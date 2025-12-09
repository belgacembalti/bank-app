import React from 'react';
import { Shield, ShieldAlert, ShieldCheck } from 'lucide-react';

interface TrustScoreProps {
  score: number; // 0-100
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export function TrustScore({ score, size = 'md', showLabel = true }: TrustScoreProps) {
  const getScoreColor = () => {
    if (score >= 80) return 'text-success-600';
    if (score >= 50) return 'text-warning-600';
    return 'text-danger-600';
  };

  const getScoreIcon = () => {
    if (score >= 80) return ShieldCheck;
    if (score >= 50) return Shield;
    return ShieldAlert;
  };

  const getScoreLabel = () => {
    if (score >= 80) return 'High Trust';
    if (score >= 50) return 'Medium Trust';
    return 'Low Trust';
  };

  const sizes = {
    sm: { icon: 'w-6 h-6', text: 'text-lg', label: 'text-xs' },
    md: { icon: 'w-10 h-10', text: 'text-3xl', label: 'text-sm' },
    lg: { icon: 'w-16 h-16', text: 'text-5xl', label: 'text-base' },
  };

  const Icon = getScoreIcon();

  return (
    <div className="flex items-center gap-4">
      <div className="relative">
        <svg className={sizes[size].icon} viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-gray-200 dark:text-gray-700"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeDasharray={`${score * 2.827} 282.7`}
            strokeLinecap="round"
            className={getScoreColor()}
            transform="rotate(-90 50 50)"
          />
        </svg>
        <Icon className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${sizes[size].icon} ${getScoreColor()}`} />
      </div>
      {showLabel && (
        <div>
          <div className={`${sizes[size].text} ${getScoreColor()}`}>
            {score}
          </div>
          <div className={`${sizes[size].label} text-gray-600 dark:text-gray-400`}>
            {getScoreLabel()}
          </div>
        </div>
      )}
    </div>
  );
}
