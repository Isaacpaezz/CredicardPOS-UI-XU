
import React, { useState } from 'react';
import { Button, Input, Label, Checkbox } from '../components/UI';
import { PageView } from '../types';
import { LogIn } from 'lucide-react';

interface LoginProps {
  onNavigate: (page: PageView) => void;
}

export const Login: React.FC<LoginProps> = ({ onNavigate }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simular llamada API
    setTimeout(() => {
      setIsLoading(false);
      onNavigate('dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex">
      {/* Left Column: Brand / Visual */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 relative items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-20" 
             style={{backgroundImage: 'radial-gradient(#6366F1 1px, transparent 1px)', backgroundSize: '40px 40px'}}>
        </div>
        <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-b from-slate-900/0 via-slate-900/50 to-slate-900"></div>
        
        <div className="relative z-10 max-w-lg px-10 text-center">
          <div className="h-16 w-16 bg-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(99,102,241,0.6)]">
            <span className="text-white font-bold text-3xl">C</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Gestión financiera inteligente</h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            Recupera cartera, gestiona terminales POS y automatiza tus comunicaciones con CredicardPOS SaaS.
          </p>
        </div>
      </div>

      {/* Right Column: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
             {/* Mobile Logo */}
            <div className="lg:hidden h-10 w-10 bg-indigo-600 rounded flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">C</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Bienvenido de nuevo</h2>
            <p className="text-slate-500 mt-2">Ingresa tus credenciales para acceder al panel.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="nombre@empresa.com" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Contraseña</Label>
                <button type="button" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="remember" label="Recordar dispositivo por 30 días" />
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Ingresando...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <LogIn size={18} /> Iniciar Sesión
                </span>
              )}
            </Button>
          </form>

          <div className="text-center text-sm">
            <span className="text-slate-500">¿No tienes una cuenta? </span>
            <button 
              onClick={() => onNavigate('register')}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Regístrate gratis
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
