import { cn } from '@/lib/utils';
import type { AppointmentStatus } from '@/lib/mock-data';
import { statusLabels } from '@/lib/mock-data';

const statusStyles: Record<AppointmentStatus, string> = {
  programada: 'bg-status-scheduled-bg text-status-scheduled border-status-scheduled-border',
  confirmada: 'bg-status-confirmed-bg text-status-confirmed border-status-confirmed-border',
  completada: 'bg-status-completed-bg text-status-completed border-status-completed-border',
  cancelada: 'bg-status-cancelled-bg text-status-cancelled border-status-cancelled-border',
  no_asistio: 'bg-status-noshow-bg text-status-noshow border-status-noshow-border',
};

const dotStyles: Record<AppointmentStatus, string> = {
  programada: 'bg-status-scheduled',
  confirmada: 'bg-status-confirmed',
  completada: 'bg-status-completed',
  cancelada: 'bg-status-cancelled',
  no_asistio: 'bg-status-noshow',
};

export function StatusBadge({ status }: { status: AppointmentStatus }) {
  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium whitespace-nowrap', statusStyles[status])}>
      <span className={cn('w-1.5 h-1.5 rounded-full', dotStyles[status])} />
      {statusLabels[status]}
    </span>
  );
}
