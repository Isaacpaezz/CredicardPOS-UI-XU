
import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Users, 
  MessageSquare, 
  Smartphone, 
  Send, 
  Search, 
  Filter,
  Info
} from 'lucide-react';
import { Button, Card, Input, Select, Textarea, Badge, Checkbox } from '../components/UI';
import { PageView } from '../types';

interface NewCampaignProps {
  onNavigate: (page: PageView) => void;
}

export const NewCampaign: React.FC<NewCampaignProps> = ({ onNavigate }) => {
  const [step, setStep] = useState(1);
  const [audienceCount, setAudienceCount] = useState(145);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    channel: 'whatsapp',
    filters: {
      bank: 'Todos',
      inactivity: '>30',
      region: 'Todas'
    },
    message: 'Buenas tardes, Sr. {{nombre}}. Le saluda Geovanny Cañizalez de CREDICARDPOS. Notamos que su punto de venta del banco {{banco}} no ha registrado transacciones desde hace {{dias_inactivo}} días. ¿Podría comentarnos el motivo o si requiere apoyo para reactivarlo?'
  });

  // Effect to simulate audience calculation based on filters
  useEffect(() => {
    // Random number generation to simulate backend query
    const base = 100;
    const random = Math.floor(Math.random() * 200);
    setAudienceCount(base + random);
  }, [formData.filters]);

  const handleFilterChange = (key: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      filters: { ...prev.filters, [key]: value }
    }));
  };

  const insertVariable = (variable: string) => {
    setFormData(prev => ({
      ...prev,
      message: prev.message + ` ${variable}`
    }));
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-between mb-8 max-w-3xl mx-auto px-4">
      {[1, 2, 3, 4].map((s) => (
        <div key={s} className="flex flex-col items-center relative z-10">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 border-2 ${
            s === step 
              ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-200' 
              : s < step 
                ? 'bg-green-500 border-green-500 text-white' 
                : 'bg-white border-slate-200 text-slate-400'
          }`}>
            {s < step ? <CheckCircle2 size={20} /> : s}
          </div>
          <span className={`text-xs mt-2 font-medium transition-colors ${s === step ? 'text-indigo-700' : 'text-slate-500'}`}>
            {s === 1 ? 'Configuración' : s === 2 ? 'Audiencia' : s === 3 ? 'Mensaje' : 'Revisar'}
          </span>
        </div>
      ))}
      {/* Line Connectors */}
      <div className="absolute left-0 right-0 top-5 h-0.5 bg-slate-200 -z-0 mx-auto max-w-2xl hidden sm:block">
        <div 
          className="h-full bg-indigo-600 transition-all duration-500" 
          style={{ width: `${((step - 1) / 3) * 100}%` }}
        ></div>
      </div>
    </div>
  );

  // --- Step 1: Configuración ---
  const StepConfig = () => (
    <div className="max-w-xl mx-auto space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Nombre de la Campaña</label>
        <Input 
          placeholder="Ej: Recuperación Q3 - Inactivos" 
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          autoFocus
        />
        <p className="text-xs text-slate-500 mt-1">Este nombre es interno y no será visible para los clientes.</p>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-3">Canal de Envío</label>
        <div className="grid grid-cols-1 gap-3">
          <div 
            className={`relative flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${formData.channel === 'whatsapp' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 hover:border-indigo-200'}`}
            onClick={() => setFormData({...formData, channel: 'whatsapp'})}
          >
            <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 mr-4">
              <MessageSquare size={20} />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-slate-900">WhatsApp Business API</h4>
              <p className="text-xs text-slate-500">Alta tasa de apertura. Integrado con Chatwoot.</p>
            </div>
            {formData.channel === 'whatsapp' && <div className="h-4 w-4 bg-indigo-600 rounded-full border-2 border-white absolute top-4 right-4"></div>}
          </div>
          
          {/* Disabled Options for context */}
          <div className="flex items-center p-4 border rounded-xl opacity-50 cursor-not-allowed bg-gray-50">
            <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 mr-4">
              <Smartphone size={20} />
            </div>
            <div>
              <h4 className="font-semibold text-slate-700">SMS Tradicional</h4>
              <p className="text-xs text-slate-500">Próximamente</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // --- Step 2: Audiencia ---
  const StepAudience = () => (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Filters Column */}
        <div className="md:col-span-2 space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4 text-slate-900 font-semibold">
              <Filter size={18} />
              <h3>Filtros de Segmentación</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1 uppercase tracking-wider">Banco Adquirente</label>
                <Select 
                  value={formData.filters.bank}
                  onChange={(e) => handleFilterChange('bank', e.target.value)}
                >
                  <option value="Todos">Todos los Bancos</option>
                  <option value="Mercantil">Mercantil</option>
                  <option value="Banesco">Banesco</option>
                  <option value="BBVA">BBVA Provincial</option>
                  <option value="BNC">BNC</option>
                </Select>
              </div>
              
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1 uppercase tracking-wider">Días de Inactividad</label>
                <Select 
                  value={formData.filters.inactivity}
                  onChange={(e) => handleFilterChange('inactivity', e.target.value)}
                >
                  <option value=">30">Más de 30 días</option>
                  <option value=">60">Más de 60 días</option>
                  <option value=">90">Más de 90 días</option>
                  <option value="never">Nunca Activos</option>
                </Select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1 uppercase tracking-wider">Región</label>
                <Select 
                  value={formData.filters.region}
                  onChange={(e) => handleFilterChange('region', e.target.value)}
                >
                  <option value="Todas">Todas las Regiones</option>
                  <option value="Norte">Norte</option>
                  <option value="Centro">Centro</option>
                  <option value="Occidente">Occidente</option>
                  <option value="Sur">Sur</option>
                </Select>
              </div>
            </div>
          </Card>
          
          <div className="p-4 bg-blue-50 text-blue-700 rounded-lg border border-blue-100 text-sm flex gap-2">
            <Info size={18} className="shrink-0 mt-0.5" />
            <p>
              Al seleccionar "Más de 30 días", se excluirán automáticamente los clientes que hayan reportado incidencias técnicas en la última semana.
            </p>
          </div>
        </div>

        {/* Results Column */}
        <div className="md:col-span-1">
          <div className="bg-indigo-600 text-white rounded-xl p-6 shadow-lg shadow-indigo-200 text-center sticky top-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users size={24} className="text-white" />
            </div>
            <h4 className="text-indigo-100 font-medium mb-1">Audiencia Estimada</h4>
            <div className="text-4xl font-bold mb-2">{audienceCount}</div>
            <p className="text-sm text-indigo-200">Clientes coinciden con los filtros</p>
            
            <div className="mt-6 pt-6 border-t border-white/20 text-left space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-indigo-200">Banco:</span>
                <span className="font-medium">{formData.filters.bank}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-indigo-200">Inactividad:</span>
                <span className="font-medium">{formData.filters.inactivity}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // --- Step 3: Mensaje ---
  const StepMessage = () => (
    <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
        {/* Editor */}
        <div className="flex flex-col h-full">
          <div className="mb-4">
            <h3 className="font-semibold text-slate-900 mb-2">Personalización del Mensaje</h3>
            <p className="text-sm text-slate-500">Utiliza las variables para personalizar cada mensaje enviado.</p>
          </div>

          {/* Toolbar */}
          <div className="flex flex-wrap gap-2 mb-3">
            {['{{nombre}}', '{{banco}}', '{{dias_inactivo}}', '{{rango_fecha}}'].map(v => (
              <button 
                key={v}
                onClick={() => insertVariable(v)}
                className="px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-medium hover:bg-indigo-100 transition-colors"
              >
                {v}
              </button>
            ))}
          </div>

          <Textarea 
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            className="flex-1 min-h-[300px] p-4 text-base leading-relaxed font-sans resize-none shadow-sm"
            placeholder="Escribe tu mensaje aquí..."
          />
          
          <div className="mt-3 flex justify-between items-center text-xs text-slate-400">
            <span>Caracteres: {formData.message.length}</span>
            <span>Se enviará como 1 mensaje de WhatsApp</span>
          </div>
        </div>

        {/* Phone Preview */}
        <div className="flex items-center justify-center bg-slate-100 rounded-2xl p-8 border border-slate-200">
          <div className="relative w-[300px] h-[600px] bg-white rounded-[3rem] border-8 border-slate-900 shadow-2xl overflow-hidden flex flex-col">
            {/* Notch & Status Bar */}
            <div className="h-6 bg-slate-900 w-full absolute top-0 left-0 z-20 flex justify-center">
              <div className="w-32 h-4 bg-black rounded-b-xl"></div>
            </div>
            
            {/* WhatsApp Header Mock */}
            <div className="mt-6 bg-[#008069] p-3 flex items-center gap-3 text-white shadow-sm z-10">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">
                CP
              </div>
              <div>
                <div className="text-sm font-semibold">CredicardPOS</div>
                <div className="text-[10px] opacity-80">Cuenta de empresa</div>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 bg-[#e5ddd5] p-4 overflow-y-auto bg-opacity-50 relative">
               {/* Background Pattern Mock */}
               <div className="absolute inset-0 opacity-5" style={{backgroundImage: 'radial-gradient(#4a5568 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>

               <div className="bg-white rounded-tr-lg rounded-bl-lg rounded-br-lg p-3 shadow-sm max-w-[90%] text-sm text-slate-800 leading-snug relative mb-2">
                 {formData.message.replace(/{{(.*?)}}/g, (match) => {
                   // Simple replace for preview
                   if (match.includes('nombre')) return 'Juan Pérez';
                   if (match.includes('banco')) return 'Mercantil';
                   if (match.includes('dias')) return '45';
                   return match;
                 })}
                 <span className="block text-[10px] text-slate-400 text-right mt-1">10:42 AM</span>
               </div>
            </div>

            {/* Footer Mock */}
            <div className="bg-gray-100 p-2 flex items-center gap-2">
              <div className="h-8 flex-1 bg-white rounded-full border border-gray-200"></div>
              <div className="h-8 w-8 bg-[#008069] rounded-full flex items-center justify-center text-white">
                <Send size={14} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // --- Step 4: Revisar ---
  const StepReview = () => (
    <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-right-4 duration-300 pb-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Resumen de la Campaña</h2>
        <p className="text-slate-500">Por favor verifica los detalles antes de lanzar.</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden divide-y divide-gray-100">
        <div className="p-6">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Configuración General</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-xs text-slate-500 mb-1">Nombre</label>
              <p className="font-medium text-slate-900">{formData.name || 'Sin nombre'}</p>
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">Canal</label>
              <div className="flex items-center gap-2">
                <MessageSquare size={14} className="text-green-600" />
                <span className="font-medium text-slate-900 capitalize">{formData.channel}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Segmentación</h3>
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge variant="outline">Banco: {formData.filters.bank}</Badge>
            <Badge variant="outline">Inactividad: {formData.filters.inactivity}</Badge>
            <Badge variant="outline">Región: {formData.filters.region}</Badge>
          </div>
          <div className="flex items-center gap-2 text-indigo-600 bg-indigo-50 px-3 py-2 rounded-lg w-fit">
            <Users size={16} />
            <span className="text-sm font-bold">{audienceCount} Destinatarios</span>
          </div>
        </div>

        <div className="p-6 bg-gray-50/50">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Vista Previa del Mensaje</h3>
          <div className="p-4 bg-white border border-gray-200 rounded-lg text-sm text-slate-600 italic">
            "{formData.message}"
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-start gap-3 p-4 bg-orange-50 text-orange-800 rounded-lg text-sm">
        <Info size={20} className="shrink-0 mt-0.5" />
        <p>
          Al hacer clic en "Lanzar Campaña", el sistema comenzará a enviar los mensajes a través de Chatwoot en lotes de 50 cada 5 minutos para evitar bloqueos por spam.
        </p>
      </div>
    </div>
  );

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="icon" onClick={() => onNavigate('campaigns')}>
          <ArrowLeft size={20} />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Nueva Campaña</h1>
          <p className="text-slate-500 text-sm">Asistente de creación de campañas de recuperación.</p>
        </div>
      </div>

      {/* Wizard Container */}
      <div className="flex-1 flex flex-col">
        {renderStepIndicator()}

        <div className="flex-1 overflow-y-auto py-4 px-2">
          {step === 1 && <StepConfig />}
          {step === 2 && <StepAudience />}
          {step === 3 && <StepMessage />}
          {step === 4 && <StepReview />}
        </div>

        {/* Footer Actions */}
        <div className="py-4 px-6 border-t border-gray-200 bg-white/80 backdrop-blur-md sticky bottom-0 flex justify-between items-center z-30 mt-4 rounded-t-xl">
          <Button 
            variant="ghost" 
            onClick={() => step > 1 ? setStep(step - 1) : onNavigate('campaigns')}
            className="text-slate-500"
          >
            {step === 1 ? 'Cancelar' : 'Atrás'}
          </Button>
          
          <div className="flex gap-3">
            {step < 4 ? (
              <Button onClick={() => setStep(step + 1)} className="px-8 gap-2">
                Siguiente <ArrowRight size={16} />
              </Button>
            ) : (
              <Button onClick={() => onNavigate('campaigns')} className="px-8 gap-2 bg-green-600 hover:bg-green-700 text-white">
                <Send size={16} /> Lanzar Campaña
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
