import { cn } from '@/lib/utils';
import type { UserRole } from '@/lib/mock-data';
import { roleLabels } from '@/lib/mock-data';

const roleStyles: Record<UserRole, string> = {
  admin: 'bg-role-admin-bg text-role-admin border-role-admin-border',
  doctor: 'bg-role-doctor-bg text-role-doctor border-role-doctor-border',
  assistant: 'bg-role-assistant-bg text-role-assistant border-role-assistant-border',
};

export function RoleBadge({ role }: { role: UserRole }) {
  return (
    <span className={cn('inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium', roleStyles[role])}>
      {roleLabels[role]}
    </span>
  );
}
