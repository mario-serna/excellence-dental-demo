import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  trend?: string;
  subtext?: string;
  color: 'primary' | 'scheduled' | 'confirmed' | 'completed' | 'noshow';
  delay?: number;
}

const colorMap = {
  primary: 'bg-primary-soft text-primary',
  scheduled: 'bg-status-scheduled-bg text-status-scheduled',
  confirmed: 'bg-status-confirmed-bg text-status-confirmed',
  completed: 'bg-status-completed-bg text-status-completed',
  noshow: 'bg-status-noshow-bg text-status-noshow',
};

export function StatsCard({ icon: Icon, label, value, trend, subtext, color, delay = 0 }: StatsCardProps) {
  return (
    <div className="card-dental animate-fade-up" style={{ animationDelay: `${delay}ms` }}>
      <div className="flex items-start justify-between mb-3">
        <p className="text-sm text-muted-foreground">{label}</p>
        <div className={cn('w-8 h-8 rounded-full flex items-center justify-center', colorMap[color])}>
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <p className="text-2xl font-semibold">{value}</p>
      {trend && <p className="text-xs text-status-confirmed mt-1">{trend} vs. semana pasada</p>}
      {subtext && <p className="text-xs text-muted-foreground mt-1 truncate">{subtext}</p>}
    </div>
  );
}
