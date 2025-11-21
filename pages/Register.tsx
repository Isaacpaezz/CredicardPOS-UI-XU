
import React, { useState } from 'react';
import { Button, Input, Label, Select } from '../components/UI';
import { PageView } from '../types';
import { ArrowRight, ArrowLeft, Building2, User } from 'lucide-react';

interface RegisterProps {
  onNavigate: (page: PageView) => void;
}

export const Register: React.FC<RegisterProps> = ({ onNavigate }) => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      setIsLoading(true);
      // Simular creación de tenant
      setTimeout(() => {
        setIsLoading(false);
        onNavigate('onboarding');
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
          <div className="h-12 w-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center mx-auto mb-4 border border-white/20">
            <span className="text-white font-bold text-2xl">C</span>
          </div>
          <h2 className="text-2xl font-bold text-white">Crear cuenta CredicardPOS</h2>
          <p className="text-slate-400 text-sm mt-2">Comienza tu prueba gratuita de 14 días.</p>
        </div>

        {/* Progress Bar */}
        <div className="flex h-1.5 bg-gray-100">
          <div className={`transition-all duration-500 bg-indigo-600 ${step === 1 ? 'w-1/2' : 'w-full'}`}></div>
        </div>

        {/* Form Area */}
        <div className="p-8">
          <form onSubmit={handleNext} className="space-y-6">
            
            {/* Step 1: User Info */}
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-indigo-50 p-2 rounded-full text-indigo-600">
                    <User size={20} />
                  </div>
                  <h3 className="font-semibold text-slate-900">Información del Administrador</h3>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fullname">Nombre Completo</Label>
                  <Input id="fullname" placeholder="Ej. Carlos Rodriguez" required autoFocus />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="workemail">Correo Corporativo</Label>
                  <Input id="workemail" type="email" placeholder="tu@empresa.com" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <Input id="password" type="password" placeholder="Mínimo 8 caracteres" required />
                </div>
              </div>
            )}

            {/* Step 2: Company Info */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-indigo-50 p-2 rounded-full text-indigo-600">
                    <Building2 size={20} />
                  </div>
                  <h3 className="font-semibold text-slate-900">Detalles de la Empresa</h3>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Nombre de la Empresa</Label>
                  <Input id="company" placeholder="Ej. Inversiones Globales SA" required autoFocus />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="taxid">Identificación Fiscal (RIF/NIT)</Label>
                  <Input id="taxid" placeholder="J-12345678-9" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">País / Región</Label>
                  <Select id="country">
                    <option>Venezuela</option>
                    <option>Colombia</option>
                    <option>México</option>
                    <option>Panamá</option>
                  </Select>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="pt-4 flex gap-3">
              {step === 2 && (
                <Button type="button" variant="outline" onClick={() => setStep(1)}>
                  <ArrowLeft size={16} className="mr-2" /> Atrás
                </Button>
              )}
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  'Creando cuenta...'
                ) : step === 1 ? (
                  <span className="flex items-center">Siguiente <ArrowRight size={16} className="ml-2" /></span>
                ) : (
                  'Finalizar Registro'
                )}
              </Button>
            </div>
          </form>
          
          {step === 1 && (
            <div className="mt-6 text-center text-sm">
              <span className="text-slate-500">¿Ya tienes cuenta? </span>
              <button onClick={() => onNavigate('login')} className="font-medium text-indigo-600 hover:text-indigo-500">
                Inicia Sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
