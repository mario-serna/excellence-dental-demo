import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { mockAppointments, getInitials, getAvatarColor } from '@/lib/mock-data';
import { StatusBadge } from '@/components/dental/StatusBadge';
import { EmptyState } from '@/components/dental/EmptyState';
import { Button } from '@/components/ui/button';
import { Plus, MoreHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const filterOptions = ['Todas', 'Hoy', 'Esta Semana', 'Programadas', 'Confirmadas', 'Completadas', 'Canceladas'];

export default function Appointments() {
  const navigate = useNavigate();
  const [view, setView] = useState<'lista' | 'calendario'>('lista');
  const [activeFilter, setActiveFilter] = useState('Todas');
  const [calendarMonth, setCalendarMonth] = useState(new Date(2026, 1));

  let filtered = [...mockAppointments].sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`));
  if (activeFilter === 'Hoy') filtered = filtered.filter(a => a.date === '2026-02-27');
  else if (activeFilter === 'Esta Semana') filtered = filtered.filter(a => a.date >= '2026-02-23' && a.date <= '2026-02-27');
  else if (activeFilter === 'Programadas') filtered = filtered.filter(a => a.status === 'programada');
  else if (activeFilter === 'Confirmadas') filtered = filtered.filter(a => a.status === 'confirmada');
  else if (activeFilter === 'Completadas') filtered = filtered.filter(a => a.status === 'completada');
  else if (activeFilter === 'Canceladas') filtered = filtered.filter(a => a.status === 'cancelada');

  const daysInMonth = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 0).getDate();
  const firstDayOfWeek = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), 1).getDay();
  const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  const getApptsForDay = (day: number) => {
    const ds = `${calendarMonth.getFullYear()}-${String(calendarMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return mockAppointments.filter(a => a.date === ds);
  };
  const isToday = (day: number) => calendarMonth.getFullYear() === 2026 && calendarMonth.getMonth() === 1 && day === 27;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold">Citas</h1>
          <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">{mockAppointments.length}</span>
        </div>
        <Button asChild><Link to="/appointments/new"><Plus className="h-4 w-4 mr-2" />Nueva Cita</Link></Button>
      </div>

      <div className="flex rounded-lg border border-border overflow-hidden w-fit">
        {(['lista', 'calendario'] as const).map(v => (
          <button key={v} onClick={() => setView(v)} className={cn('px-4 py-2 text-sm font-medium capitalize transition-colors', view === v ? 'bg-primary text-primary-foreground' : 'bg-card text-muted-foreground hover:bg-muted')}>{v}</button>
        ))}
      </div>

      {view === 'lista' ? (
        <>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {filterOptions.map(f => (
              <button key={f} onClick={() => setActiveFilter(f)} className={cn('shrink-0 rounded-full px-3 py-1.5 text-sm font-medium transition-colors border', activeFilter === f ? 'bg-primary text-primary-foreground border-primary' : 'bg-card text-muted-foreground border-border hover:bg-muted')}>{f}</button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <EmptyState icon="calendar" title="No hay citas programadas" description="Agenda una cita para comenzar." action={{ label: 'Agendar Cita', onClick: () => navigate('/appointments/new') }} />
          ) : (
            <>
              <div className="hidden md:block card-dental overflow-hidden p-0">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted">
                      <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Paciente</th>
                      <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Doctor</th>
                      <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Fecha y Hora</th>
                      <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Servicio</th>
                      <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Duración</th>
                      <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Estado</th>
                      <th className="text-right text-xs font-medium text-muted-foreground px-4 py-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map(apt => (
                      <tr key={apt.id} className="border-b border-border last:border-0 hover:bg-muted transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className={cn('w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium', getAvatarColor(apt.patientName))}>{getInitials(apt.patientName)}</div>
                            <span className="text-sm font-medium">{apt.patientName}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">{apt.doctorName}</td>
                        <td className="px-4 py-3 text-sm">{apt.date} · {apt.time}</td>
                        <td className="px-4 py-3 text-sm">{apt.service}</td>
                        <td className="px-4 py-3 text-sm">{apt.duration} min</td>
                        <td className="px-4 py-3"><StatusBadge status={apt.status} /></td>
                        <td className="px-4 py-3 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Confirmar</DropdownMenuItem>
                              <DropdownMenuItem>Marcar como Completada</DropdownMenuItem>
                              <DropdownMenuItem>Marcar como No Asistió</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">Cancelar Cita</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => navigate(`/patients/${apt.patientId}`)}>Ver Paciente</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="md:hidden space-y-3">
                {filtered.map(apt => (
                  <div key={apt.id} className="card-dental p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium">{apt.date} · {apt.time} <span className="text-muted-foreground">{apt.duration} min</span></p>
                        <p className="text-sm font-medium mt-1">{apt.patientName}</p>
                        <p className="text-xs text-muted-foreground">{apt.doctorName} · {apt.service}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <StatusBadge status={apt.status} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      ) : (
        <div className="card-dental">
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" size="icon" onClick={() => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1))}><ChevronLeft className="h-4 w-4" /></Button>
            <h3 className="font-semibold">{monthNames[calendarMonth.getMonth()]} {calendarMonth.getFullYear()}</h3>
            <Button variant="ghost" size="icon" onClick={() => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1))}><ChevronRight className="h-4 w-4" /></Button>
          </div>
          <div className="grid grid-cols-7 gap-px">
            {dayNames.map(d => (<div key={d} className="text-center text-xs font-medium text-muted-foreground py-2">{d}</div>))}
            {Array.from({ length: firstDayOfWeek }).map((_, i) => (<div key={`e-${i}`} className="p-2 min-h-[72px]" />))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dayApts = getApptsForDay(day);
              const today = isToday(day);
              return (
                <div key={day} className={cn('p-2 min-h-[72px] border border-border rounded-md cursor-pointer hover:bg-muted transition-colors', today && 'bg-primary-light')}>
                  <div className={cn('text-sm font-medium mb-1 w-7 h-7 flex items-center justify-center rounded-full', today && 'bg-primary text-primary-foreground')}>{day}</div>
                  <div className="flex flex-wrap gap-0.5">
                    {dayApts.slice(0, 3).map(a => (
                      <div key={a.id} className={cn('w-1.5 h-1.5 rounded-full', {
                        'bg-status-scheduled': a.status === 'programada',
                        'bg-status-confirmed': a.status === 'confirmada',
                        'bg-status-completed': a.status === 'completada',
                        'bg-status-cancelled': a.status === 'cancelada',
                        'bg-status-noshow': a.status === 'no_asistio',
                      })} />
                    ))}
                    {dayApts.length > 3 && <span className="text-[10px] text-muted-foreground">+{dayApts.length - 3}</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
