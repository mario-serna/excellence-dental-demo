import { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Calendar, UserCog, Menu, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Inicio', path: '/', icon: LayoutDashboard },
  { label: 'Pacientes', path: '/patients', icon: Users },
  { label: 'Citas', path: '/appointments', icon: Calendar },
];
const adminItems = [
  { label: 'Equipo', path: '/admin/users', icon: UserCog },
];

const ToothLogo = () => (
  <svg className="w-7 h-7 text-primary shrink-0" viewBox="0 0 100 100" fill="currentColor">
    <path d="M50 5C40 5 35 15 30 25C25 35 20 40 15 45C10 50 10 60 15 70C20 80 30 85 35 80C40 75 42 65 45 60C47 57 49 55 50 55C51 55 53 57 55 60C58 65 60 75 65 80C70 85 80 80 85 70C90 60 90 50 85 45C80 40 75 35 70 25C65 15 60 5 50 5Z" />
  </svg>
);

export default function AppLayout() {
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const items = user?.role === 'admin' ? [...navItems, ...adminItems] : navItems;
  const roleLabel = user?.role === 'admin' ? 'Administrador' : user?.role === 'doctor' ? 'Doctor' : 'Asistente';

  const navLinkClass = ({ isActive }: { isActive: boolean }) => cn(
    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
    isActive ? "bg-primary-soft text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
  );

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Sidebar: icon-only on md, full on lg */}
      <aside className={cn(
        "hidden md:flex flex-col border-r border-border bg-card transition-all duration-300 shrink-0",
        "w-16 lg:w-64",
        collapsed && "lg:w-16"
      )}>
        <div className="h-16 flex items-center justify-center lg:justify-start px-4 border-b border-border overflow-hidden">
          <ToothLogo />
          <span className={cn("font-semibold text-lg text-primary ml-2 hidden lg:inline whitespace-nowrap", collapsed && "lg:hidden")}>Excellence</span>
        </div>

        <nav className="flex-1 py-4 space-y-1 px-2">
          {items.map(item => (
            <NavLink key={item.path} to={item.path} end={item.path === '/'} title={item.label}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors justify-center lg:justify-start",
                isActive ? "bg-primary-soft text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground",
                collapsed && "lg:justify-center"
              )}>
              <item.icon className="h-5 w-5 shrink-0" />
              <span className={cn("hidden lg:inline", collapsed && "lg:hidden")}>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-border p-3">
          <div className={cn("mb-3 hidden lg:block px-1", collapsed && "lg:hidden")}>
            <p className="text-sm font-medium truncate">{user?.name}</p>
            <p className="text-xs text-muted-foreground">{roleLabel}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={logout} title="Cerrar sesión"
            className={cn("w-full gap-2 justify-center lg:justify-start", !collapsed && "lg:justify-start")}>
            <LogOut className="h-4 w-4" />
            <span className={cn("hidden lg:inline", collapsed && "lg:hidden")}>Cerrar sesión</span>
          </Button>
        </div>

        <button onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex items-center justify-center h-10 border-t border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        {/* Mobile top bar */}
        <header className="md:hidden h-16 flex items-center justify-between px-4 border-b border-border bg-card sticky top-0 z-40">
          <div className="flex items-center gap-2">
            <ToothLogo />
            <span className="font-semibold text-primary">Excellence</span>
          </div>
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Menú"><Menu className="h-5 w-5" /></Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <div className="h-16 flex items-center px-4 border-b border-border">
                <span className="font-semibold text-primary">Excellence Dental</span>
              </div>
              <nav className="py-4 space-y-1 px-2">
                {items.map(item => (
                  <NavLink key={item.path} to={item.path} end={item.path === '/'} onClick={() => setMobileMenuOpen(false)} className={navLinkClass}>
                    <item.icon className="h-5 w-5" /><span>{item.label}</span>
                  </NavLink>
                ))}
              </nav>
              <div className="absolute bottom-0 left-0 right-0 border-t border-border p-4">
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-muted-foreground mb-3">{roleLabel}</p>
                <Button variant="ghost" size="sm" onClick={logout} className="w-full justify-start gap-2">
                  <LogOut className="h-4 w-4" />Cerrar sesión
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </header>

        <main className="flex-1 p-4 md:p-6 lg:p-8 pb-20 md:pb-6 lg:pb-8 overflow-auto">
          <div className="max-w-[1280px] mx-auto"><Outlet /></div>
        </main>

        {/* Mobile bottom nav */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border flex items-center justify-around h-16 z-50">
          {navItems.map(item => (
            <NavLink key={item.path} to={item.path} end={item.path === '/'}
              className={({ isActive }) => cn("flex flex-col items-center gap-1 py-2 px-3 min-w-[44px] min-h-[44px] justify-center", isActive ? "text-primary" : "text-muted-foreground")}>
              <item.icon className="h-5 w-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </NavLink>
          ))}
          <button onClick={() => setMobileMenuOpen(true)} className="flex flex-col items-center gap-1 py-2 px-3 min-w-[44px] min-h-[44px] justify-center text-muted-foreground">
            <Menu className="h-5 w-5" /><span className="text-[10px] font-medium">Más</span>
          </button>
        </nav>
      </div>
    </div>
  );
}
