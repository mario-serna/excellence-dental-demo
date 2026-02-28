import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function PatientForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [gender, setGender] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const newErrors: Record<string, string> = {};
    if (!form.get('name')) newErrors.name = 'El nombre es requerido';
    if (!form.get('phone')) newErrors.phone = 'El teléfono es requerido';
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    navigate('/patients');
  };

  return (
    <div className="max-w-[640px] mx-auto space-y-6">
      <Link to="/patients" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" />Volver a Pacientes
      </Link>

      <div className="card-dental">
        <h1 className="text-xl font-semibold mb-1">Nuevo Paciente</h1>
        <p className="text-sm text-muted-foreground mb-6">Completa la información del paciente a continuación.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">Información Personal</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nombre Completo *</Label>
                <Input id="name" name="name" placeholder="Nombre del paciente" className={cn(errors.name && 'border-destructive')} />
                {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><Label htmlFor="birthDate">Fecha de Nacimiento</Label><Input id="birthDate" name="birthDate" type="date" /></div>
                <div>
                  <Label>Género</Label>
                  <div className="flex rounded-lg border border-border overflow-hidden mt-1">
                    {['Masculino', 'Femenino', 'Otro'].map(g => (
                      <button key={g} type="button" onClick={() => setGender(g)} className={cn(
                        'flex-1 py-2 text-sm font-medium transition-colors',
                        gender === g ? 'bg-primary text-primary-foreground' : 'bg-card text-muted-foreground hover:bg-muted'
                      )}>{g}</button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Teléfono *</Label>
                  <Input id="phone" name="phone" placeholder="+52 55 1234 5678" className={cn(errors.phone && 'border-destructive')} />
                  {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
                </div>
                <div><Label htmlFor="email">Correo Electrónico</Label><Input id="email" name="email" type="email" placeholder="correo@ejemplo.com" /></div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">Dirección y Notas</h3>
            <div className="space-y-4">
              <div><Label htmlFor="address">Dirección</Label><Textarea id="address" name="address" rows={2} placeholder="Calle, colonia, ciudad…" /></div>
              <div><Label htmlFor="notes">Notas Clínicas</Label><Textarea id="notes" name="notes" rows={3} placeholder="Alergias conocidas, condiciones o notas relevantes…" /></div>
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4 border-t border-border">
            <Button type="button" variant="ghost" onClick={() => navigate('/patients')}>Cancelar</Button>
            <Button type="submit" disabled={loading} className="sm:ml-auto">
              {loading ? <><Loader2 className="h-4 w-4 animate-spin mr-2" />Guardando...</> : 'Guardar Paciente'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
