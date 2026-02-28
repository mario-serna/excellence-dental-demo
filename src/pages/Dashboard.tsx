import { useAuth } from '@/contexts/AuthContext';
import { mockAppointments, mockPatients, getInitials, getAvatarColor } from '@/lib/mock-data';
import { StatsCard } from '@/components/dental/StatsCard';
import { StatusBadge } from '@/components/dental/StatusBadge';
import { Calendar, BarChart3, Users, Clock, Plus, ArrowRight, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export default function Dashboard() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const today = '2026-02-27';
  const todayAppointments = mockAppointments.filter(a => a.date === today);
  const weekAppointments = mockAppointments.filter(a => a.date >= '2026-02-23' && a.date <= '2026-02-27');
  const nextAppointment = todayAppointments.find(a => a.status !== 'completada' && a.status !== 'cancelada');

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Buenos días' : hour < 18 ? 'Buenas tardes' : 'Buenas noches';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">{greeting}, {user?.name} 👋</h1>
        <p className="text-muted-foreground text-sm">Jueves, 27 de febrero de 2026</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {isAdmin ? (
          <>
            <StatsCard icon={Users} label="Pacientes Activos" value={mockPatients.length.toString()} color="primary" delay={0} />
            <StatsCard icon={Users} label="Personal" value="5" color="confirmed" delay={50} />
            <StatsCard icon={Calendar} label="Citas Esta Semana" value={weekAppointments.length.toString()} color="scheduled" delay={100} />
            <StatsCard icon={Clock} label="Pendientes" value={todayAppointments.filter(a => a.status === 'programada').length.toString()} color="noshow" delay={150} />
          </>
        ) : (
          <>
            <StatsCard icon={Calendar} label="Mis Citas de Hoy" value={todayAppointments.length.toString()} color="scheduled" delay={0} />
            <StatsCard icon={BarChart3} label="Esta Semana" value={weekAppointments.length.toString()} color="completed" delay={50} />
            <StatsCard icon={Users} label="Pacientes Este Mes" value="18" trend="+12%" color="confirmed" delay={100} />
            <StatsCard icon={Clock} label="Próxima Cita" value={nextAppointment?.time || '—'} subtext={nextAppointment?.patientName} color="primary" delay={150} />
          </>
        )}
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Agenda de Hoy</h2>
            <Link to="/appointments" className="text-sm text-primary hover:underline">Ver todas</Link>
          </div>
          {todayAppointments.length === 0 ? (
            <div className="card-dental text-center py-12">
              <p className="text-muted-foreground">Sin citas para hoy. ¡Disfruta la calma! ✨</p>
            </div>
          ) : (
            <div className="space-y-3">
              {todayAppointments.slice(0, 6).map(apt => (
                <div key={apt.id} className="card-dental card-dental-interactive flex items-center gap-4 p-4 cursor-pointer">
                  <div className={cn('w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium shrink-0', getAvatarColor(apt.patientName))}>
                    {getInitials(apt.patientName)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{apt.patientName}</p>
                    <p className="text-xs text-muted-foreground">{apt.service} · {apt.doctorName}</p>
                  </div>
                  <div className="text-right shrink-0 hidden sm:block">
                    <p className="text-sm font-medium">{apt.time}</p>
                    <StatusBadge status={apt.status} />
                  </div>
                  <div className="sm:hidden shrink-0 text-right">
                    <p className="text-xs font-medium mb-1">{apt.time}</p>
                    <StatusBadge status={apt.status} />
                  </div>
                  <Button variant="ghost" size="icon" className="shrink-0 h-8 w-8 hidden sm:flex">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="card-dental">
            <h3 className="font-semibold mb-4">Acciones Rápidas</h3>
            <div className="space-y-2">
              <Button asChild className="w-full justify-start gap-2">
                <Link to="/appointments/new"><Plus className="h-4 w-4" />Nueva Cita</Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start gap-2">
                <Link to="/patients/new"><Plus className="h-4 w-4" />Nuevo Paciente</Link>
              </Button>
              <Button asChild variant="ghost" className="w-full justify-start gap-2">
                <Link to="/appointments"><ArrowRight className="h-4 w-4" />Ver Calendario Completo</Link>
              </Button>
            </div>
          </div>

          <div className="card-dental">
            <h3 className="font-semibold mb-4">Pacientes Recientes</h3>
            <div className="space-y-3">
              {mockPatients.slice(0, 4).map(patient => (
                <Link key={patient.id} to={`/patients/${patient.id}`} className="flex items-center gap-3 group">
                  <div className={cn('w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium shrink-0', getAvatarColor(patient.name))}>
                    {getInitials(patient.name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">{patient.name}</p>
                    <p className="text-xs text-muted-foreground">{patient.lastVisit ? `Última visita: ${patient.lastVisit}` : 'Sin visitas'}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
