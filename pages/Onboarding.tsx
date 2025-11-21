
import React, { useState } from 'react';
import { Button, Input, Label, Card, Switch } from '../components/UI';
import { PageView } from '../types';
import { CheckCircle2, MessageSquare, Users, ArrowRight, Zap, Check } from 'lucide-react';

interface OnboardingProps {
  onNavigate: (page: PageView) => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onNavigate }) => {
  const [step, setStep] = useState(0); // 0: Welcome, 1: Chatwoot, 2: Team
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  
  const [emails, setEmails] = useState(['', '', '']);

  const handleVerifyChatwoot = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
    }, 1500);
  };

  const handleEmailChange = (index: number, value: string) => {
    const newEmails = [...emails];
    newEmails[index] = value;
    setEmails(newEmails);
  };

  const WelcomeStep = () => (
    <div className="text-center animate-in zoom-in-95 duration-500">
      <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Zap size={40} className="text-indigo-600 fill-indigo-600" />
      </div>
      <h1 className="text-3xl font-bold text-slate-900 mb-4">¡Bienvenido a CredicardPOS!</h1>
      <p className="text-slate-500 max-w-md mx-auto mb-8 leading-relaxed">
        Tu cuenta ha sido creada exitosamente. Vamos a configurar tu entorno de trabajo para que puedas empezar a recuperar cartera en minutos.
      </p>
      <Button size="lg" onClick={() => setStep(1)} className="px-8 gap-2">
        Comenzar Configuración <ArrowRight size={18} />
      </Button>
    </div>
  );

  const ChatwootStep = () => (
    <div className="w-full max-w-lg mx-auto animate-in fade-in slide-in-from-right-8 duration-300">
      <div className="text-center mb-8">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <MessageSquare size={24} className="text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Conectar Chatwoot</h2>
        <p className="text-slate-500">Para gestionar campañas por WhatsApp, necesitamos tus credenciales API.</p>
      </div>

      <Card className="p-6 space-y-4 border-green-100 shadow-green-50 shadow-lg">
        <div className="space-y-2">
          <Label>URL de tu Instancia</Label>
          <Input placeholder="https://app.chatwoot.com" defaultValue="https://app.chatwoot.com" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Account ID</Label>
            <Input placeholder="Ej. 1" />
          </div>
          <div className="space-y-2">
            <Label>User API Token</Label>
            <Input type="password" placeholder="Token privado" />
          </div>
        </div>

        <div className="pt-2">
          {!isVerified ? (
            <Button 
              variant="outline" 
              className="w-full border-slate-200" 
              onClick={handleVerifyChatwoot}
              disabled={isVerifying}
            >
              {isVerifying ? 'Verificando conexión...' : 'Probar Conexión'}
            </Button>
          ) : (
            <div className="flex items-center justify-center gap-2 p-2 bg-green-50 text-green-700 rounded-lg border border-green-200 font-medium">
              <CheckCircle2 size={18} /> Conexión Exitosa
            </div>
          )}
        </div>
      </Card>

      <div className="flex justify-between mt-8">
        <Button variant="ghost" onClick={() => setStep(2)}>Omitir por ahora</Button>
        <Button onClick={() => setStep(2)} disabled={!isVerified && !isVerifying}>
          Continuar
        </Button>
      </div>
    </div>
  );

  const TeamStep = () => (
    <div className="w-full max-w-lg mx-auto animate-in fade-in slide-in-from-right-8 duration-300">
      <div className="text-center mb-8">
        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Users size={24} className="text-purple-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Invita a tu Equipo</h2>
        <p className="text-slate-500">Añade colaboradores para gestionar clientes y alertas.</p>
      </div>

      <Card className="p-6 space-y-4">
        <Label>Correos Electrónicos</Label>
        {emails.map((email, idx) => (
          <div key={idx} className="flex gap-2">
             <Input 
                placeholder={`colaborador${idx+1}@empresa.com`} 
                value={email}
                onChange={(e) => handleEmailChange(idx, e.target.value)}
             />
             <div className="w-32 shrink-0 flex items-center px-3 border rounded-md bg-gray-50 text-sm text-slate-500">
                {idx === 0 ? 'Admin' : 'Agente'}
             </div>
          </div>
        ))}
        <Button variant="ghost" size="sm" className="text-indigo-600">+ Añadir otro</Button>
      </Card>

      <div className="flex justify-end mt-8">
        <Button onClick={() => onNavigate('dashboard')} size="lg" className="px-8">
          Ir al Dashboard
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Minimal Header */}
      <div className="h-16 border-b border-gray-100 flex items-center px-8 justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-indigo-600 rounded flex items-center justify-center">
            <span className="text-white font-bold">C</span>
          </div>
          <span className="font-bold text-slate-900">CredicardPOS</span>
        </div>
        <div className="flex gap-2">
           {[1, 2].map(i => (
             <div key={i} className={`h-2 w-2 rounded-full ${step >= i ? 'bg-indigo-600' : 'bg-gray-200'}`} />
           ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        {step === 0 && <WelcomeStep />}
        {step === 1 && <ChatwootStep />}
        {step === 2 && <TeamStep />}
      </div>
    </div>
  );
};
