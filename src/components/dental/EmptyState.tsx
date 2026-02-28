import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  icon: 'tooth' | 'calendar' | 'clipboard' | 'person';
  title: string;
  description: string;
  action?: { label: string; onClick: () => void };
}

const icons = {
  tooth: (
    <svg viewBox="0 0 100 100" fill="currentColor" className="w-24 h-24 text-primary opacity-30 animate-float">
      <path d="M50 10C42 10 37 18 33 27C29 36 25 40 21 44C17 48 16 56 20 65C24 74 32 78 36 74C40 70 42 62 44 58C46 55 48 53 50 53C52 53 54 55 56 58C58 62 60 70 64 74C68 78 76 74 80 65C84 56 83 48 79 44C75 40 71 36 67 27C63 18 58 10 50 10Z" />
    </svg>
  ),
  calendar: (
    <svg viewBox="0 0 100 100" fill="currentColor" className="w-24 h-24 text-primary opacity-30 animate-float">
      <rect x="15" y="25" width="70" height="60" rx="8" opacity="0.5" />
      <rect x="15" y="25" width="70" height="18" rx="8" opacity="0.7" />
      <circle cx="35" cy="55" r="4" opacity="0.5" /><circle cx="50" cy="55" r="4" opacity="0.5" /><circle cx="65" cy="55" r="4" opacity="0.5" />
      <rect x="30" y="15" width="4" height="16" rx="2" /><rect x="66" y="15" width="4" height="16" rx="2" />
    </svg>
  ),
  clipboard: (
    <svg viewBox="0 0 100 100" fill="currentColor" className="w-24 h-24 text-primary opacity-30 animate-float">
      <rect x="20" y="15" width="60" height="75" rx="8" opacity="0.4" />
      <rect x="35" y="8" width="30" height="14" rx="4" opacity="0.6" />
      <rect x="30" y="40" width="40" height="4" rx="2" opacity="0.4" />
      <rect x="30" y="52" width="35" height="4" rx="2" opacity="0.4" />
      <rect x="30" y="64" width="25" height="4" rx="2" opacity="0.4" />
    </svg>
  ),
  person: (
    <svg viewBox="0 0 100 100" fill="currentColor" className="w-24 h-24 text-primary opacity-30 animate-float">
      <circle cx="50" cy="35" r="15" opacity="0.5" />
      <path d="M25 80C25 65 35 55 50 55C65 55 75 65 75 80" opacity="0.4" />
    </svg>
  ),
};

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {icons[icon]}
      <h3 className="mt-4 text-lg font-medium">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground max-w-sm">{description}</p>
      {action && (
        <Button onClick={action.onClick} className="mt-4">{action.label}</Button>
      )}
    </div>
  );
}
