import { Label } from './ui/label';
import { Input } from './ui/input';
import { cn } from '@/lib/utils';

interface FormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'number';
  placeholder?: string;
  value: string | number;
  onChange: (value: string) => void;
  unit?: string;
  min?: number;
  max?: number;
  step?: number;
  required?: boolean;
  className?: string;
}

export function FormField({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  unit,
  min,
  max,
  step,
  required,
  className,
}: FormFieldProps) {
  return (
    <div className={cn('space-y-2', className)}>
      <Label htmlFor={name} className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      <div className="relative">
        <Input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          min={min}
          max={max}
          step={step}
          required={required}
          className={cn(
            'h-12 bg-card border-border focus:border-primary transition-colors',
            unit && 'pr-12'
          )}
        />
        {unit && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
            {unit}
          </span>
        )}
      </div>
    </div>
  );
}
