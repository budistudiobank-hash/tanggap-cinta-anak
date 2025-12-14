import { cn } from '@/lib/utils';
import { CheckCircle2, AlertTriangle, AlertCircle } from 'lucide-react';

interface RiskIndicatorProps {
  level: 'low' | 'moderate' | 'high';
  label: string;
  size?: 'sm' | 'md' | 'lg';
}

export function RiskIndicator({ level, label, size = 'md' }: RiskIndicatorProps) {
  const Icon = level === 'low' ? CheckCircle2 : level === 'moderate' ? AlertTriangle : AlertCircle;
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2.5',
  };

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center font-semibold rounded-full animate-scale-in',
        sizeClasses[size],
        level === 'low' && 'bg-risk-low text-white',
        level === 'moderate' && 'bg-risk-moderate text-white',
        level === 'high' && 'bg-risk-high text-white'
      )}
    >
      <Icon className={iconSizes[size]} />
      <span>{label}</span>
    </div>
  );
}
