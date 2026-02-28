import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { AlertCircle, Eye, EyeOff, Loader2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    const success = login(email, password);
    if (success) {
      navigate("/");
    } else {
      setError("Credenciales inválidas. Verifica tu correo y contraseña.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-light to-secondary p-4 relative overflow-hidden">
      <svg
        className="absolute bottom-0 right-0 w-96 h-96 opacity-[0.03] text-primary pointer-events-none z-0"
        viewBox="0 0 100 100"
        fill="currentColor"
      >
        <path d="M50 5C40 5 35 15 30 25C25 35 20 40 15 45C10 50 10 60 15 70C20 80 30 85 35 80C40 75 42 65 45 60C47 57 49 55 50 55C51 55 53 57 55 60C58 65 60 75 65 80C70 85 80 80 85 70C90 60 90 50 85 45C80 40 75 35 70 25C65 15 60 5 50 5Z" />
      </svg>

      <div className="w-full max-w-[400px] card-dental p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <svg
              className="w-8 h-8 text-primary"
              viewBox="0 0 100 100"
              fill="currentColor"
            >
              <path d="M50 5C40 5 35 15 30 25C25 35 20 40 15 45C10 50 10 60 15 70C20 80 30 85 35 80C40 75 42 65 45 60C47 57 49 55 50 55C51 55 53 57 55 60C58 65 60 75 65 80C70 85 80 80 85 70C90 60 90 50 85 45C80 40 75 35 70 25C65 15 60 5 50 5Z" />
            </svg>
            <span className="text-xl font-semibold text-foreground">
              Excellence Dental
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            Inicia sesión en tu espacio de trabajo
          </p>
        </div>

        {error && (
          <div className="mb-6 flex items-start gap-2 rounded-lg border border-status-cancelled-border bg-status-cancelled-bg p-3 text-sm text-destructive">
            <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              type="email"
              placeholder="tu@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showPassword ? "Ocultar" : "Mostrar"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Iniciando sesión...
              </>
            ) : (
              "Iniciar sesión"
            )}
          </Button>
        </form>

        <p className="text-center mt-4">
          <button className="text-sm text-muted-foreground hover:text-primary transition-colors">
            ¿Olvidaste tu contraseña?
          </button>
        </p>

        <div className="mt-8 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground text-center mb-2">
            Demo — haz clic sobre un correo para llenar el formulario:
          </p>
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => {
                setEmail("brenda@excellence.com");
                setPassword("123");
              }}
              onTouchEnd={() => {
                setEmail("brenda@excellence.com");
                setPassword("123");
              }}
              className="w-full text-left text-xs text-muted-foreground font-mono hover:text-primary hover:bg-primary/5 p-2 rounded transition-colors border border-transparent hover:border-border cursor-pointer"
            >
              brenda@excellence.com (Admin)
            </button>
            <button
              type="button"
              onClick={() => {
                setEmail("sarah@excellence.com");
                setPassword("123");
              }}
              onTouchEnd={() => {
                setEmail("sarah@excellence.com");
                setPassword("123");
              }}
              className="w-full text-left text-xs text-muted-foreground font-mono hover:text-primary hover:bg-primary/5 p-2 rounded transition-colors border border-transparent hover:border-border cursor-pointer"
            >
              sarah@excellence.com (Doctor)
            </button>
            <button
              type="button"
              onClick={() => {
                setEmail("luis@excellence.com");
                setPassword("123");
              }}
              onTouchEnd={() => {
                setEmail("luis@excellence.com");
                setPassword("123");
              }}
              className="w-full text-left text-xs text-muted-foreground font-mono hover:text-primary hover:bg-primary/5 p-2 rounded transition-colors border border-transparent hover:border-border cursor-pointer"
            >
              luis@excellence.com (Asistente)
            </button>
          </div>
          <div className="mt-3 text-xs text-muted-foreground text-center">
            <p>Contraseña: 123</p>
          </div>
        </div>
      </div>
    </div>
  );
}
