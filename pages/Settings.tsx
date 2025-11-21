
import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  CreditCard, 
  UploadCloud, 
  CheckCircle2, 
  AlertCircle, 
  Plus,
  Shield,
  MoreHorizontal,
  Save,
  MessageSquare,
  Workflow,
  ArrowRight,
  Trash2
} from 'lucide-react';
import { Card, Input, Label, Button, Tabs, Badge, Dialog, Select } from '../components/UI';
import { teamMembers } from '../mockData';

interface LabelRule {
  id: string;
  label: string;
  status: string;
}

export const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('General');
  
  // --- Integration State ---
  const [chatwootStatus, setChatwootStatus] = useState<'disconnected' | 'connected'>('disconnected');
  const [isTesting, setIsTesting] = useState(false);
  
  // --- Label Mapping State (Automation) ---
  const [labelRules, setLabelRules] = useState<LabelRule[]>([
    { id: '1', label: 'recuperado', status: 'activo' },
    { id: '2', label: 'baja-definitiva', status: 'inactivo' }
  ]);

  // --- Team State ---
  const [isInviteOpen, setIsInviteOpen] = useState(false);

  const handleTestConnection = () => {
    setIsTesting(true);
    setTimeout(() => {
      setIsTesting(false);
      setChatwootStatus('connected');
    }, 1500);
  };

  // --- Automation Handlers ---
  const addRule = () => {
    const newRule: LabelRule = {
      id: Math.random().toString(36).substr(2, 9),
      label: '',
      status: 'activo'
    };
    setLabelRules([...labelRules, newRule]);
  };

  const removeRule = (id: string) => {
    setLabelRules(labelRules.filter(rule => rule.id !== id));
  };

  const updateRule = (id: string, field: keyof LabelRule, value: string) => {
    setLabelRules(labelRules.map(rule => 
      rule.id === id ? { ...rule, [field]: value } : rule
    ));
  };

  // --- Sub-components for Tabs ---

  const GeneralTab = () => (
    <div className="space-y-6 max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-300">
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
            <Building2 size={20} />
          </div>
          <h3 className="font-semibold text-slate-900">Identidad de la Organización</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-slate-100 rounded-lg border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 hover:border-indigo-400 hover:text-indigo-500 hover:bg-indigo-50 cursor-pointer transition-all">
              <UploadCloud size={24} />
              <span className="text-[10px] mt-1 font-medium">Logo</span>
            </div>
            <div className="flex-1">
               <p className="text-sm font-medium text-slate-900">Logotipo de la Empresa</p>
               <p className="text-xs text-slate-500 mt-1">Recomendado: 400x400px PNG o JPG.</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="orgName">Nombre de la Empresa</Label>
            <Input id="orgName" defaultValue="Inversiones Globales SA" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="taxId">RIF / NIT / Tax ID</Label>
              <Input id="taxId" defaultValue="J-12345678-9" disabled className="bg-gray-50" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry">Industria</Label>
              <Input id="industry" defaultValue="Finanzas / Banca" />
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
          <Button className="gap-2">
            <Save size={16} /> Guardar Cambios
          </Button>
        </div>
      </Card>
    </div>
  );

  const TeamTab = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-slate-900">Miembros del Equipo</h3>
          <p className="text-sm text-slate-500">Gestiona el acceso y los roles de tus colaboradores.</p>
        </div>
        <Button onClick={() => setIsInviteOpen(true)} className="gap-2">
          <Plus size={16} /> Invitar Miembro
        </Button>
      </div>

      <Card className="overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-500 uppercase bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 font-medium">Usuario</th>
              <th className="px-6 py-4 font-medium">Rol</th>
              <th className="px-6 py-4 font-medium">Estado</th>
              <th className="px-6 py-4 font-medium text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {teamMembers.map((member) => (
              <tr key={member.id} className="bg-white hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">
                      {member.avatar}
                    </div>
                    <div>
                      <div className="font-medium text-slate-900">{member.name}</div>
                      <div className="text-xs text-slate-500">{member.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5">
                    <Shield size={14} className="text-slate-400" />
                    <span className="text-slate-700">{member.role}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Badge variant={member.status === 'active' ? 'success' : 'warning'}>
                    {member.status === 'active' ? 'Activo' : 'Invitado'}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-right">
                  <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-600">
                    <MoreHorizontal size={16} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Invite Modal */}
      <Dialog isOpen={isInviteOpen} onClose={() => setIsInviteOpen(false)} title="Invitar Colaborador">
        <div className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label>Correo Electrónico</Label>
            <Input placeholder="colaborador@empresa.com" />
          </div>
          <div className="space-y-2">
            <Label>Rol</Label>
            <Select>
              <option value="admin">Administrador (Acceso Total)</option>
              <option value="agent">Agente (Gestión de Clientes)</option>
              <option value="viewer">Visualizador (Solo Lectura)</option>
            </Select>
          </div>
          <div className="pt-4 flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setIsInviteOpen(false)}>Cancelar</Button>
            <Button onClick={() => setIsInviteOpen(false)}>Enviar Invitación</Button>
          </div>
        </div>
      </Dialog>
    </div>
  );

  const IntegrationsTab = () => (
    <div className="space-y-6 max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-300">
      
      {/* Header Info */}
      <div className="mb-4">
        <h3 className="font-semibold text-slate-900">Integraciones Externas</h3>
        <p className="text-sm text-slate-500">Conecta CredicardPOS con tus herramientas de comunicación.</p>
      </div>

      {/* 1. Chatwoot Credentials */}
      <Card className={`p-6 border-2 transition-colors ${chatwootStatus === 'connected' ? 'border-green-100 bg-green-50/20' : 'border-gray-100'}`}>
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center text-white shadow-sm">
              <MessageSquare size={24} />
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-900">Chatwoot</h4>
              <p className="text-sm text-slate-500">Mensajería multicanal y CRM de soporte.</p>
            </div>
          </div>
          <Badge variant={chatwootStatus === 'connected' ? 'success' : 'destructive'}>
            {chatwootStatus === 'connected' ? 'Conectado' : 'Desconectado'}
          </Badge>
        </div>

        <div className="space-y-4 pl-0 md:pl-16">
          <div className="space-y-2">
            <Label htmlFor="chatwootUrl">URL Base (Instancia)</Label>
            <Input id="chatwootUrl" placeholder="https://app.chatwoot.com" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="accountId">Account ID</Label>
              <Input id="accountId" placeholder="Ej. 1" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="apiToken">API Access Token</Label>
              <Input id="apiToken" type="password" placeholder="••••••••••••••••" />
            </div>
          </div>
          
          <div className="flex items-center gap-3 mt-4 pt-2">
            <Button onClick={handleTestConnection} disabled={isTesting || chatwootStatus === 'connected'}>
              {isTesting ? (
                <span className="flex items-center gap-2">Verificando...</span>
              ) : chatwootStatus === 'connected' ? (
                <span className="flex items-center gap-2"><CheckCircle2 size={16} /> Verificado</span>
              ) : (
                'Probar Conexión'
              )}
            </Button>
            {chatwootStatus === 'connected' && (
              <Button variant="ghost" className="text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => setChatwootStatus('disconnected')}>
                Desconectar
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* 2. Label Mapping (Automation) - Only shown when connected or for demo purposes */}
      {chatwootStatus === 'connected' && (
        <div className="animate-in slide-in-from-bottom-4 fade-in duration-500">
          <div className="flex items-center gap-2 mb-4 mt-8">
             <div className="p-1.5 bg-indigo-100 text-indigo-600 rounded">
               <Workflow size={16} />
             </div>
             <div>
               <h3 className="font-semibold text-slate-900">Automatización de Etiquetas</h3>
               <p className="text-xs text-slate-500">Sincroniza cambios de Chatwoot a CredicardPOS.</p>
             </div>
          </div>

          <Card className="overflow-hidden border-gray-200">
            <div className="bg-gray-50 px-6 py-3 border-b border-gray-100 flex justify-between items-center">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Reglas de Mapeo</span>
              <Button size="sm" variant="ghost" onClick={addRule} className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 h-8">
                <Plus size={14} className="mr-1" /> Nueva Regla
              </Button>
            </div>
            
            <div className="divide-y divide-gray-100">
              {labelRules.length === 0 ? (
                <div className="p-8 text-center text-slate-500 text-sm">
                  No hay reglas configuradas. Añade una para automatizar estados.
                </div>
              ) : (
                labelRules.map((rule) => (
                  <div key={rule.id} className="p-4 flex flex-col sm:flex-row sm:items-center gap-4 bg-white hover:bg-gray-50 transition-colors">
                    
                    {/* Trigger */}
                    <div className="flex-1">
                      <Label className="text-xs text-slate-400 mb-1 block sm:hidden">Si la etiqueta es...</Label>
                      <div className="relative">
                        <MessageSquare size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <Input 
                          value={rule.label} 
                          onChange={(e) => updateRule(rule.id, 'label', e.target.value)}
                          placeholder="ej. recuperado" 
                          className="pl-9 h-9 text-sm"
                        />
                      </div>
                    </div>

                    {/* Arrow Connector */}
                    <div className="hidden sm:flex text-slate-300">
                      <ArrowRight size={20} />
                    </div>

                    {/* Action */}
                    <div className="flex-1">
                      <Label className="text-xs text-slate-400 mb-1 block sm:hidden">Cambiar estado a...</Label>
                      <Select 
                        value={rule.status} 
                        onChange={(e) => updateRule(rule.id, 'status', e.target.value)}
                        className="h-9 text-sm"
                      >
                        <option value="activo">Activo (Verde)</option>
                        <option value="inactivo">Inactivo (Rojo)</option>
                        <option value="pendiente">Pendiente (Naranja)</option>
                      </Select>
                    </div>

                    {/* Delete Action */}
                    <div className="flex justify-end sm:justify-auto">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => removeRule(rule.id)}
                        className="text-slate-400 hover:text-red-600 hover:bg-red-50 h-9 w-9"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            <div className="p-4 bg-indigo-50 border-t border-indigo-100 text-xs text-indigo-800 flex gap-2">
              <Workflow size={16} className="shrink-0" />
              <p>
                El sistema escuchará eventos <code>conversation_updated</code> de Chatwoot. Cuando se añada una etiqueta coincidente a un contacto, su estado en CredicardPOS se actualizará automáticamente.
              </p>
            </div>
          </Card>
          
          <div className="mt-4 flex justify-end">
             <Button className="gap-2">
               <Save size={16} /> Guardar Reglas
             </Button>
          </div>
        </div>
      )}
    </div>
  );

  const BillingTab = () => (
    <div className="space-y-6 max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-300">
      <Card className="p-8 bg-gradient-to-r from-slate-900 to-slate-800 text-white border-none">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold mb-2">Plan Profesional</h3>
            <p className="text-slate-300 text-sm mb-6">Tienes acceso a todas las funciones de recuperación y gestión.</p>
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold">$49<span className="text-base font-normal text-slate-400">/mes</span></span>
              <Badge className="bg-indigo-500 text-white hover:bg-indigo-600 border-none">Activo</Badge>
            </div>
          </div>
          <div className="bg-white/10 p-3 rounded-full">
            <CreditCard size={32} className="text-indigo-400" />
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center">
          <div className="text-xs text-slate-400">
            Próxima facturación: <span className="text-white">20 Dic 2024</span>
          </div>
          <Button className="bg-white text-slate-900 hover:bg-gray-100 border-none">
            Gestionar Suscripción
          </Button>
        </div>
      </Card>

      <div className="p-4 bg-blue-50 text-blue-800 rounded-lg border border-blue-100 text-sm flex gap-2 items-start">
        <AlertCircle size={18} className="shrink-0 mt-0.5" />
        <p>
          ¿Necesitas más usuarios o volumen de mensajes? <a href="#" className="underline font-semibold">Contacta a ventas</a> para un plan Enterprise personalizado.
        </p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Configuración</h1>
          <p className="text-slate-500 mt-1">Administra tu organización y preferencias del sistema.</p>
        </div>
      </div>

      <Tabs 
        tabs={['General', 'Equipo', 'Integraciones', 'Facturación']} 
        activeTab={activeTab} 
        onChange={setActiveTab} 
      />

      <div className="mt-6">
        {activeTab === 'General' && <GeneralTab />}
        {activeTab === 'Equipo' && <TeamTab />}
        {activeTab === 'Integraciones' && <IntegrationsTab />}
        {activeTab === 'Facturación' && <BillingTab />}
      </div>
    </div>
  );
};
