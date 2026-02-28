import { useState } from 'react';
import { mockUsers, getInitials, getAvatarColor } from '@/lib/mock-data';
import { RoleBadge } from '@/components/dental/RoleBadge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from '@/components/ui/sheet';
import { Plus, Edit, Mail, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { User } from '@/lib/mock-data';

export default function AdminUsers() {
  const [inviteOpen, setInviteOpen] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [editActive, setEditActive] = useState(true);

  const openEdit = (user: User) => { setEditUser(user); setEditActive(user.active); };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold">Equipo</h1>
          <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">{mockUsers.length} miembros</span>
        </div>
        <Button onClick={() => setInviteOpen(true)}><Plus className="h-4 w-4 mr-2" />Invitar Usuario</Button>
      </div>

      <div className="hidden md:block card-dental overflow-hidden p-0">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted">
              <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Nombre</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Rol</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Correo</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Estado</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Ingreso</th>
              <th className="text-right text-xs font-medium text-muted-foreground px-4 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {mockUsers.map(user => (
              <tr key={user.id} className={cn('border-b border-border last:border-0 hover:bg-muted transition-colors', !user.active && 'opacity-60')}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className={cn('w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium', getAvatarColor(user.name))}>{getInitials(user.name)}</div>
                    <span className="text-sm font-medium">{user.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3"><RoleBadge role={user.role} /></td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{user.email}</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium">
                    <span className={cn('w-1.5 h-1.5 rounded-full', user.active ? 'bg-status-confirmed' : 'bg-muted-foreground')} />
                    {user.active ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{user.joinedAt}</td>
                <td className="px-4 py-3 text-right">
                  <Button variant="ghost" size="sm" onClick={() => openEdit(user)}><Edit className="h-4 w-4 mr-1" />Editar</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-3">
        {mockUsers.map(user => (
          <div key={user.id} className={cn('card-dental p-4', !user.active && 'opacity-60')}>
            <div className="flex items-center gap-3">
              <div className={cn('w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium', getAvatarColor(user.name))}>{getInitials(user.name)}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2"><p className="text-sm font-medium">{user.name}</p><RoleBadge role={user.role} /></div>
                <p className="text-xs text-muted-foreground">{user.email}</p>
                <span className="inline-flex items-center gap-1 text-xs mt-1">
                  <span className={cn('w-1.5 h-1.5 rounded-full', user.active ? 'bg-status-confirmed' : 'bg-muted-foreground')} />
                  {user.active ? 'Activo' : 'Inactivo'}
                </span>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(user)}><Edit className="h-4 w-4" /></Button>
            </div>
          </div>
        ))}
      </div>

      <Sheet open={inviteOpen} onOpenChange={setInviteOpen}>
        <SheetContent>
          <SheetHeader><SheetTitle>Invitar Miembro del Equipo</SheetTitle><SheetDescription>Recibirá un correo para configurar su cuenta.</SheetDescription></SheetHeader>
          <div className="space-y-4 mt-6">
            <div><Label>Nombre Completo</Label><Input placeholder="Nombre del miembro" className="mt-1" /></div>
            <div><Label>Correo Electrónico</Label><Input type="email" placeholder="correo@clinica.com" className="mt-1" /></div>
            <div><Label>Rol</Label><Select><SelectTrigger className="mt-1"><SelectValue placeholder="Seleccionar rol" /></SelectTrigger><SelectContent><SelectItem value="doctor">Doctor</SelectItem><SelectItem value="assistant">Asistente</SelectItem><SelectItem value="admin">Administrador</SelectItem></SelectContent></Select></div>
          </div>
          <SheetFooter className="mt-6">
            <Button variant="ghost" onClick={() => setInviteOpen(false)}>Cancelar</Button>
            <Button className="gap-2"><Mail className="h-4 w-4" />Enviar Invitación</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <Sheet open={!!editUser} onOpenChange={() => setEditUser(null)}>
        <SheetContent>
          <SheetHeader><SheetTitle>Editar {editUser?.name}</SheetTitle></SheetHeader>
          <div className="space-y-4 mt-6">
            <div><Label>Nombre Completo</Label><Input defaultValue={editUser?.name} className="mt-1" /></div>
            <div><Label>Rol</Label><Select defaultValue={editUser?.role}><SelectTrigger className="mt-1"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="doctor">Doctor</SelectItem><SelectItem value="assistant">Asistente</SelectItem><SelectItem value="admin">Administrador</SelectItem></SelectContent></Select></div>
            <div className="flex items-center justify-between">
              <Label>Estado</Label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{editActive ? 'Activo' : 'Inactivo'}</span>
                <Switch checked={editActive} onCheckedChange={setEditActive} />
              </div>
            </div>
            {!editActive && (
              <div className="flex items-start gap-2 rounded-lg border border-status-noshow-border bg-status-noshow-bg p-3 text-sm text-status-noshow">
                <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
                Desactivar este usuario le impedirá iniciar sesión. Sus registros y citas se conservarán.
              </div>
            )}
          </div>
          <SheetFooter className="mt-6">
            <Button variant="ghost" onClick={() => setEditUser(null)}>Cancelar</Button>
            <Button>Guardar Cambios</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
