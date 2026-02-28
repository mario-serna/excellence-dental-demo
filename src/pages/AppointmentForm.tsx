import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { mockPatients, mockUsers, serviceTypes, getInitials, getAvatarColor } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Loader2, AlertTriangle, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

const timeSlots = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'];
const busySlots = ['10:00', '10:30'];

export default function AppointmentForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [patientSearch, setPatientSearch] = useState('');
  const [selectedPatient, setSelectedPatient] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [conflict, setConflict] = useState(false);

  const doctors = mockUsers.filter(u => u.role === 'doctor');
  const filteredPatients = mockPatients.filter(p => p.name.toLowerCase().includes(patientSearch.toLowerCase()) || p.phone.includes(patientSearch));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    navigate('/appointments');
  };

  return (
    <div className="max-w-[560px] mx-auto space-y-6">
      <Link to="/appointments" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" />Volver a Citas
      </Link>

      <div className="card-dental">
        <h1 className="text-xl font-semibold mb-1">Agendar Cita</h1>
        <p className="text-sm text-muted-foreground mb-6">Programa una nueva cita para un paciente.</p>

        {conflict && (
          <div className="mb-6 flex items-start gap-2 rounded-lg border border-status-noshow-border bg-status-noshow-bg p-3 text-sm text-status-noshow">
            <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
            La Dra. Kim ya tiene una cita a las 10:00 AM en esta fecha. Por favor elige un horario diferente.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <Label>Paciente</Label>
            <div className="relative mt-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar paciente…" value={selectedPatient || patientSearch}
                onChange={e => { setPatientSearch(e.target.value); setSelectedPatient(''); setShowDropdown(true); }}
                onFocus={() => setShowDropdown(true)} className="pl-10" />
            </div>
            {showDropdown && patientSearch && !selectedPatient && (
              <div className="absolute z-10 w-full mt-1 rounded-lg border border-border bg-card shadow-lg max-h-48 overflow-y-auto">
                {filteredPatients.map(p => (
                  <button key={p.id} type="button" onClick={() => { setSelectedPatient(p.name); setPatientSearch(''); setShowDropdown(false); }}
                    className="w-full flex items-center gap-3 px-3 py-2 hover:bg-muted transition-colors text-left">
                    <div className={cn('w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium', getAvatarColor(p.name))}>{getInitials(p.name)}</div>
                    <div><p className="text-sm font-medium">{p.name}</p><p className="text-xs text-muted-foreground">{p.phone}</p></div>
                  </button>
                ))}
                <Link to="/patients/new" className="block px-3 py-2 text-sm text-primary hover:bg-muted transition-colors border-t border-border">¿Paciente nuevo?</Link>
              </div>
            )}
          </div>

          <div>
            <Label>Doctor</Label>
            <Select><SelectTrigger className="mt-1"><SelectValue placeholder="Seleccionar doctor" /></SelectTrigger>
              <SelectContent>{doctors.map(d => (<SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>))}</SelectContent>
            </Select>
          </div>

          <div><Label htmlFor="date">Fecha</Label><Input id="date" type="date" min="2026-02-27" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} className="mt-1" /></div>

          {selectedDate && (
            <div>
              <Label>Hora</Label>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {timeSlots.map(slot => {
                  const isBusy = busySlots.includes(slot);
                  return (
                    <button key={slot} type="button" disabled={isBusy} onClick={() => { setSelectedTime(slot); setConflict(false); }}
                      className={cn('rounded-lg border py-2 text-sm font-medium transition-colors',
                        isBusy ? 'bg-muted text-muted-foreground border-border cursor-not-allowed line-through' :
                        selectedTime === slot ? 'bg-primary text-primary-foreground border-primary' :
                        'border-border hover:border-primary hover:text-primary'
                      )}>{slot}</button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div><Label>Duración</Label><Select><SelectTrigger className="mt-1"><SelectValue placeholder="30 min" /></SelectTrigger><SelectContent>{[15,30,45,60,90].map(d => (<SelectItem key={d} value={d.toString()}>{d} min</SelectItem>))}</SelectContent></Select></div>
            <div><Label>Tipo de Servicio</Label><Select><SelectTrigger className="mt-1"><SelectValue placeholder="Seleccionar" /></SelectTrigger><SelectContent>{serviceTypes.map(s => (<SelectItem key={s} value={s}>{s}</SelectItem>))}</SelectContent></Select></div>
          </div>

          <div><Label htmlFor="notes">Notas</Label><Textarea id="notes" rows={2} placeholder="Notas adicionales…" className="mt-1" /></div>

          <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4 border-t border-border">
            <Button type="button" variant="ghost" onClick={() => navigate('/appointments')}>Cancelar</Button>
            <Button type="submit" disabled={loading} className="sm:ml-auto">
              {loading ? <><Loader2 className="h-4 w-4 animate-spin mr-2" />Agendando...</> : 'Agendar Cita'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
