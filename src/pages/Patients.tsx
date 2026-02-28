import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { mockPatients, getInitials, getAvatarColor } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { EmptyState } from '@/components/dental/EmptyState';
import { Search, Plus, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const filters = ['Todos', 'Recientes', 'Con Cita Próxima', 'Sin Visita Reciente'];

export default function Patients() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('Todos');

  let filtered = mockPatients.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) || p.phone.includes(search) || p.email.toLowerCase().includes(search.toLowerCase())
  );
  if (activeFilter === 'Recientes') filtered = filtered.filter(p => p.lastVisit && p.lastVisit >= '2026-02-01');
  else if (activeFilter === 'Con Cita Próxima') filtered = filtered.filter(p => p.nextAppointment);
  else if (activeFilter === 'Sin Visita Reciente') filtered = filtered.filter(p => !p.lastVisit || p.lastVisit < '2025-08-27');

  const isOldVisit = (date: string | null) => date ? date < '2025-08-27' : false;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold">Pacientes</h1>
          <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">{mockPatients.length} pacientes</span>
        </div>
        <Button asChild><Link to="/patients/new"><Plus className="h-4 w-4 mr-2" />Nuevo Paciente</Link></Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Buscar por nombre, teléfono o correo…" value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {filters.map(f => (
          <button key={f} onClick={() => setActiveFilter(f)} className={cn(
            'shrink-0 rounded-full px-3 py-1.5 text-sm font-medium transition-colors border',
            activeFilter === f ? 'bg-primary text-primary-foreground border-primary' : 'bg-card text-muted-foreground border-border hover:bg-muted'
          )}>{f}</button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon="tooth" title="Aún no hay pacientes" description="Agrega tu primer paciente para comenzar." action={{ label: 'Agregar Primer Paciente', onClick: () => navigate('/patients/new') }} />
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden md:block card-dental overflow-hidden p-0">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted">
                  <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Paciente</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Edad</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Teléfono</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Última Visita</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Próx. Cita</th>
                  <th className="text-right text-xs font-medium text-muted-foreground px-4 py-3">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(p => (
                  <tr key={p.id} className="border-b border-border last:border-0 hover:bg-muted transition-colors cursor-pointer" onClick={() => navigate(`/patients/${p.id}`)}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className={cn('w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium shrink-0', getAvatarColor(p.name))}>{getInitials(p.name)}</div>
                        <div><p className="text-sm font-medium">{p.name}</p><p className="text-xs text-muted-foreground">{p.email}</p></div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">{p.age}</td>
                    <td className="px-4 py-3 text-sm font-mono text-xs">{p.phone}</td>
                    <td className={cn('px-4 py-3 text-sm', isOldVisit(p.lastVisit) && 'text-status-noshow font-medium')}>{p.lastVisit || '—'}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{p.nextAppointment || '—'}</td>
                    <td className="px-4 py-3 text-right"><Button variant="ghost" size="sm" onClick={e => { e.stopPropagation(); navigate(`/patients/${p.id}`); }}>Ver</Button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {filtered.map(p => (
              <Link key={p.id} to={`/patients/${p.id}`} className="card-dental card-dental-interactive flex items-center gap-3 p-4">
                <div className={cn('w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium shrink-0', getAvatarColor(p.name))}>{getInitials(p.name)}</div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.age} años · {p.phone}</p>
                  <div className="flex gap-4 mt-1 text-xs text-muted-foreground">
                    <span className={isOldVisit(p.lastVisit) ? 'text-status-noshow' : ''}>Última: {p.lastVisit || '—'}</span>
                    <span>Próx: {p.nextAppointment || '—'}</span>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
