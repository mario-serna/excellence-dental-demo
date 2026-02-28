import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { mockPatients } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';

export default function RecordForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const patient = mockPatients.find(p => p.id === id);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    navigate(`/patients/${id}`);
  };

  return (
    <div className="max-w-[680px] mx-auto space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link to="/patients" className="hover:text-foreground transition-colors">Pacientes</Link>
        <span>/</span>
        <Link to={`/patients/${id}`} className="hover:text-foreground transition-colors">{patient?.name}</Link>
        <span>/</span>
        <span className="text-foreground">Nuevo Registro</span>
      </div>

      <div className="card-dental">
        <h1 className="text-xl font-semibold mb-1">Nuevo Registro Clínico</h1>
        <p className="text-sm text-muted-foreground mb-6">Documenta la visita de {patient?.name}.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div><Label htmlFor="visitDate">Fecha de Visita</Label><Input id="visitDate" type="date" defaultValue="2026-02-27" /></div>
          <div><Label htmlFor="diagnosis">Diagnóstico *</Label><Textarea id="diagnosis" rows={3} placeholder="Describe los hallazgos clínicos…" required /></div>
          <div><Label htmlFor="treatment">Notas de Tratamiento *</Label><Textarea id="treatment" rows={3} placeholder="Describe los procedimientos realizados…" required /></div>
          <div><Label htmlFor="prescriptions">Prescripciones</Label><Textarea id="prescriptions" rows={2} placeholder="Nombre del medicamento, dosis, instrucciones…" /></div>
          <div><Label htmlFor="nextVisit">Fecha de Próxima Visita</Label><Input id="nextVisit" type="date" /></div>

          <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4 border-t border-border">
            <Button type="button" variant="ghost" onClick={() => navigate(`/patients/${id}`)}>Cancelar</Button>
            <Button type="submit" disabled={loading} className="sm:ml-auto">
              {loading ? <><Loader2 className="h-4 w-4 animate-spin mr-2" />Guardando...</> : 'Guardar Registro'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
