import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
}

export function PageHeader({ title, subtitle, showBack = true }: PageHeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="flex items-center gap-3 px-4 h-14 max-w-lg mx-auto">
        {showBack && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="w-9 h-9 -ml-2"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
        )}
        <div className="flex-1 min-w-0">
          <h1 className="text-lg font-bold text-foreground truncate">{title}</h1>
          {subtitle && (
            <p className="text-xs text-muted-foreground truncate">{subtitle}</p>
          )}
        </div>
      </div>
    </header>
  );
}
