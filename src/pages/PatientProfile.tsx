import { useParams, Link, useNavigate } from 'react-router-dom';
import { mockPatients, mockAppointments, mockRecords, getInitials, getAvatarColor } from '@/lib/mock-data';
import { StatusBadge } from '@/components/dental/StatusBadge';
import { EmptyState } from '@/components/dental/EmptyState';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Phone, Mail, Edit, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function PatientProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const patient = mockPatients.find(p => p.id === id);
  const records = mockRecords.filter(r => r.patientId === id).sort((a, b) => b.date.localeCompare(a.date));
  const appointments = mockAppointments.filter(a => a.patientId === id).sort((a, b) => b.date.localeCompare(a.date));

  if (!patient) return <div className="text-center py-12 text-muted-foreground">Paciente no encontrado.</div>;

  const nextApt = appointments.find(a => a.date >= '2026-02-27' && a.status !== 'cancelada' && a.status !== 'completada');

  return (
    <div className="space-y-6">
      <Link to="/patients" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" />Volver a Pacientes
      </Link>

      <div className="card-dental">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className={cn('w-14 h-14 rounded-full flex items-center justify-center text-lg font-semibold shrink-0', getAvatarColor(patient.name))}>{getInitials(patient.name)}</div>
          <div className="flex-1">
            <h1 className="text-xl font-semibold">{patient.name}</h1>
            <p className="text-sm text-muted-foreground">{patient.age} años · Nacimiento: {patient.birthDate}</p>
            <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1"><Phone className="h-3.5 w-3.5" />{patient.phone}</span>
              <span className="inline-flex items-center gap-1"><Mail className="h-3.5 w-3.5" />{patient.email}</span>
            </div>
          </div>
          <Button variant="outline" size="sm"><Edit className="h-4 w-4 mr-1" />Editar</Button>
        </div>
      </div>

      <Tabs defaultValue="resumen" className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto bg-transparent border-b border-border rounded-none h-auto p-0 gap-0">
          <TabsTrigger value="resumen" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2.5">Resumen</TabsTrigger>
          <TabsTrigger value="historial" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2.5">Historial</TabsTrigger>
          <TabsTrigger value="citas" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2.5">Citas</TabsTrigger>
        </TabsList>

        <TabsContent value="resumen" className="mt-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="card-dental">
                <div className="flex items-center justify-between mb-4"><h3 className="font-semibold">Información del Paciente</h3><button className="text-sm text-primary hover:underline">Editar</button></div>
                <dl className="space-y-3 text-sm">
                  <div><dt className="text-muted-foreground">Dirección</dt><dd>{patient.address}</dd></div>
                  <div><dt className="text-muted-foreground">Género</dt><dd>{patient.gender}</dd></div>
                  <div><dt className="text-muted-foreground">Contacto de emergencia</dt><dd>{patient.emergencyContact}</dd></div>
                  {patient.notes && <div><dt className="text-muted-foreground">Notas</dt><dd className="text-destructive font-medium">{patient.notes}</dd></div>}
                </dl>
              </div>
              <div className="card-dental">
                <h3 className="font-semibold mb-4">Próxima Cita</h3>
                {nextApt ? (
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-muted-foreground">Fecha</span><span>{nextApt.date} · {nextApt.time}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Doctor</span><span>{nextApt.doctorName}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Servicio</span><span>{nextApt.service}</span></div>
                  </div>
                ) : (
                  <div className="text-center py-4"><p className="text-sm text-muted-foreground mb-3">Sin citas próximas</p><Button size="sm" onClick={() => navigate('/appointments/new')}>Agendar ahora</Button></div>
                )}
              </div>
            </div>
            <div className="space-y-6">
              <div className="card-dental">
                <h3 className="font-semibold mb-4">Resumen de Visitas</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div><p className="text-2xl font-semibold">{patient.totalVisits}</p><p className="text-xs text-muted-foreground">Total de visitas</p></div>
                  <div><p className="text-sm font-medium">{patient.firstVisit}</p><p className="text-xs text-muted-foreground">Primera visita</p></div>
                  <div><p className="text-sm font-medium">{patient.lastVisit || '—'}</p><p className="text-xs text-muted-foreground">Última visita</p></div>
                  <div><p className="text-sm font-medium">Limpieza</p><p className="text-xs text-muted-foreground">Más frecuente</p></div>
                </div>
              </div>
              {records[0] && (
                <div className="card-dental">
                  <h3 className="font-semibold mb-4">Último Registro</h3>
                  <p className="text-sm text-muted-foreground mb-2">{records[0].date} · {records[0].service}</p>
                  <p className="text-sm line-clamp-3">{records[0].treatment}</p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="historial" className="mt-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold">Historial Clínico</h3>
            <Button size="sm" onClick={() => navigate(`/patients/${id}/records/new`)}><Plus className="h-4 w-4 mr-1" />Agregar Registro</Button>
          </div>
          {records.length === 0 ? (
            <EmptyState icon="clipboard" title="Sin registros clínicos aún" description="Documenta la primera visita de este paciente." action={{ label: 'Agregar Primer Registro', onClick: () => navigate(`/patients/${id}/records/new`) }} />
          ) : (
            <div className="relative pl-6 border-l-2 border-border space-y-6">
              {records.map(rec => (
                <div key={rec.id} className="relative">
                  <div className="absolute -left-[calc(1.5rem+5px)] w-2.5 h-2.5 rounded-full bg-primary border-2 border-card" />
                  <div className="card-dental">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="text-sm font-medium">{rec.date}</p>
                        <p className="text-sm text-primary font-medium mt-0.5">🦷 {rec.service}</p>
                        <p className="text-xs text-muted-foreground">{rec.doctorName}</p>
                      </div>
                      <Button variant="ghost" size="sm">Editar</Button>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div><span className="text-muted-foreground">Diagnóstico: </span>{rec.diagnosis}</div>
                      <div><span className="text-muted-foreground">Tratamiento: </span>{rec.treatment}</div>
                      {rec.prescriptions && <div><span className="text-muted-foreground">Prescripciones: </span>{rec.prescriptions}</div>}
                      {rec.nextVisit && <div><span className="text-muted-foreground">Próxima visita: </span>{rec.nextVisit}</div>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="citas" className="mt-6">
          {appointments.length === 0 ? (
            <EmptyState icon="calendar" title="Sin citas" description="Este paciente no tiene citas registradas." action={{ label: 'Agendar Cita', onClick: () => navigate('/appointments/new') }} />
          ) : (
            <div className="space-y-3">
              {appointments.map(apt => (
                <div key={apt.id} className="card-dental flex items-center gap-4 p-4">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{apt.date} · {apt.time}</p>
                    <p className="text-xs text-muted-foreground">{apt.doctorName} · {apt.service} · {apt.duration} min</p>
                  </div>
                  <StatusBadge status={apt.status} />
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
