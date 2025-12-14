import { Link, useLocation } from 'react-router-dom';
import { Home, Baby, Heart, Calculator, Utensils } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/', icon: Home, label: 'Beranda' },
  { path: '/pregnancy', icon: Heart, label: 'Kehamilan' },
  { path: '/child', icon: Baby, label: 'Anak' },
  { path: '/weight', icon: Calculator, label: 'Berat' },
  { path: '/nutrition', icon: Utensils, label: 'Gizi' },
];

export function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg z-50">
      <div className="flex items-center justify-around max-w-lg mx-auto h-16 px-2">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={cn(
                'flex flex-col items-center justify-center gap-0.5 px-3 py-2 rounded-lg transition-all duration-200 min-w-[60px]',
                isActive
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              )}
            >
              <Icon className={cn('w-5 h-5', isActive && 'animate-scale-in')} />
              <span className="text-[10px] font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
