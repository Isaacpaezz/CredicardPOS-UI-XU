
import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Send, 
  Check, 
  CheckCheck, 
  MessageSquare, 
  AlertCircle, 
  Download, 
  RotateCw, 
  Plus,
  Calendar,
  Filter,
  Clock
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { Button, Card, Tabs, Badge, Input, Dialog, Select } from '../components/UI';
import { PageView } from '../types';
import { campaignMetrics, campaignMembers, campaignTimelineData, campaignHourlyData } from '../mockData';

interface CampaignDetailProps {
  onNavigate: (page: PageView) => void;
}

export const CampaignDetail: React.FC<CampaignDetailProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('Audiencia');
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);

  // Helper to render status icons/badges for the table
  const renderStatus = (status: string) => {
    const styles = {
      sent: { icon: Check, color: 'text-slate-400', bg: 'bg-slate-100', text: 'Enviado' },
      delivered: { icon: CheckCheck, color: 'text-blue-500', bg: 'bg-blue-50', text: 'Entregado' },
      read: { icon: CheckCheck, color: 'text-indigo-600', bg: 'bg-indigo-50', text: 'Leído' },
      replied: { icon: MessageSquare, color: 'text-green-600', bg: 'bg-green-50', text: 'Respuesta' },
      failed: { icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50', text: 'Fallido' },
    };
    const config = styles[status as keyof typeof styles] || styles.sent;
    const Icon = config.icon;

    return (
      <div className={`flex items-center gap-2 px-2 py-1 rounded-md w-fit ${config.bg}`}>
        <Icon size={14} className={config.color} />
        <span className={`text-xs font-medium ${config.color.replace('text-', 'text-')}`}>{config.text}</span>
      </div>
    );
  };

  // --- Sub-components for Tabs ---

  const AudienceTab = () => (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Table Actions */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex items-center gap-2 flex-1">
           <Input placeholder="Buscar por nombre o teléfono..." className="max-w-xs" />
           <Button variant="outline" className="text-slate-600 border-dashed">
             <Filter size={16} className="mr-2" /> Filtros
           </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => alert('Reintentando 1 fallido...')} className="text-orange-600 border-orange-200 hover:bg-orange-50">
             <RotateCw size={16} className="mr-2" /> Reintentar Fallidos
          </Button>
          <Button variant="outline" className="text-slate-600">
             <Download size={16} className="mr-2" /> Exportar CSV
          </Button>
          <Button onClick={() => setIsAddMemberOpen(true)} className="gap-2">
             <Plus size={16} /> Agregar Miembros
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-500 uppercase bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 font-medium">Cliente</th>
              <th className="px-6 py-4 font-medium">Teléfono</th>
              <th className="px-6 py-4 font-medium">Estado</th>
              <th className="px-6 py-4 font-medium text-right">Última Act.</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {campaignMembers.map((member) => (
              <tr key={member.id} className="bg-white hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-900">{member.name}</td>
                <td className="px-6 py-4 text-slate-500 font-mono">{member.phone}</td>
                <td className="px-6 py-4">{renderStatus(member.status)}</td>
                <td className="px-6 py-4 text-right text-slate-400 text-xs">{member.lastUpdate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Add Member Modal */}
      <Dialog isOpen={isAddMemberOpen} onClose={() => setIsAddMemberOpen(false)} title="Agregar a Campaña Activa">
        <div className="space-y-4 mt-2">
          <p className="text-sm text-slate-500">Busca clientes para añadir a la cola de envío de esta campaña.</p>
          <Input placeholder="Buscar cliente..." autoFocus />
          <div className="max-h-40 overflow-y-auto border border-gray-100 rounded-md p-2 space-y-1">
            <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer">
              <span className="text-sm font-medium">Panadería La Estrella</span>
              <Button size="sm" variant="ghost" className="h-6 text-indigo-600">Añadir</Button>
            </div>
            <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer">
              <span className="text-sm font-medium">Ferretería Imperial</span>
              <Button size="sm" variant="ghost" className="h-6 text-indigo-600">Añadir</Button>
            </div>
          </div>
          <div className="pt-2 flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setIsAddMemberOpen(false)}>Cancelar</Button>
            <Button onClick={() => setIsAddMemberOpen(false)}>Listo</Button>
          </div>
        </div>
      </Dialog>
    </div>
  );

  const ConfigurationTab = () => (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300 space-y-6">
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="md:col-span-2 space-y-6">
            <Card className="p-6">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Plantilla del Mensaje</h3>
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-slate-700 whitespace-pre-wrap font-sans leading-relaxed">
                "Buenas tardes, Sr. {"{{nombre}}"}. Le saluda Geovanny Cañizalez de CREDICARDPOS. Notamos que su punto de venta del banco {"{{banco}}"} no ha registrado transacciones desde hace {"{{dias_inactivo}}"} días. ¿Podría comentarnos el motivo?"
              </div>
              <div className="mt-4 flex gap-2">
                <Badge variant="outline">Variables: 3</Badge>
                <Badge variant="outline">Caracteres: 215</Badge>
              </div>
            </Card>

            <Card className="p-6">
               <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Reglas de Ejecución</h3>
               <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-50">
                    <span className="text-sm text-slate-600">Canal de Envío</span>
                    <div className="flex items-center gap-2 font-medium text-slate-900">
                      <MessageSquare size={16} className="text-green-600" /> WhatsApp Business API
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-50">
                    <span className="text-sm text-slate-600">Velocidad de Envío</span>
                    <span className="text-sm font-medium text-slate-900">50 mensajes / 5 min</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-slate-600">Horario Permitido</span>
                    <span className="text-sm font-medium text-slate-900">08:00 AM - 06:00 PM</span>
                  </div>
               </div>
            </Card>
         </div>

         <div className="space-y-6">
            <Card className="p-6 bg-slate-50 border-dashed">
               <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Filtros Aplicados</h3>
               <div className="space-y-3">
                 <div>
                   <label className="text-xs text-slate-500 block">Banco</label>
                   <span className="text-sm font-medium text-slate-900">Mercantil</span>
                 </div>
                 <div>
                   <label className="text-xs text-slate-500 block">Inactividad</label>
                   <span className="text-sm font-medium text-slate-900">&gt; 30 Días</span>
                 </div>
                 <div>
                   <label className="text-xs text-slate-500 block">Región</label>
                   <span className="text-sm font-medium text-slate-900">Todas</span>
                 </div>
               </div>
            </Card>
         </div>
       </div>
    </div>
  );

  const AnalyticsTab = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Timeline Chart */}
        <Card className="p-6">
          <div className="mb-6">
            <h3 className="font-semibold text-slate-900">Rendimiento en el Tiempo</h3>
            <p className="text-sm text-slate-500">Envíos vs. Respuestas (Hoy)</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={campaignTimelineData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{fontSize: 12}} stroke="#94a3b8" />
              <YAxis tick={{fontSize: 12}} stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
              />
              <Line type="monotone" dataKey="sent" name="Enviados" stroke="#6366F1" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="replies" name="Respuestas" stroke="#10B981" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Hourly Breakdown */}
        <Card className="p-6">
          <div className="mb-6">
             <h3 className="font-semibold text-slate-900">Mejor Hora de Respuesta</h3>
             <p className="text-sm text-slate-500">Tasa de engagement por hora</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={campaignHourlyData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{fontSize: 12}} stroke="#94a3b8" />
              <YAxis tick={{fontSize: 12}} stroke="#94a3b8" />
              <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '8px'}} />
              <Bar dataKey="value" name="Respuestas" fill="#818cf8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" onClick={() => onNavigate('campaigns')}>
            <ArrowLeft size={20} />
          </Button>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold text-slate-900">Recordatorio de Pago</h1>
              <Badge variant="warning" className="bg-orange-100 text-orange-700 border-orange-200">
                <span className="flex h-1.5 w-1.5 rounded-full bg-orange-500 mr-1.5 animate-pulse"></span>
                Enviando
              </Badge>
            </div>
            <div className="flex items-center text-sm text-slate-500 gap-4">
               <span className="flex items-center gap-1"><Calendar size={14} /> Creada: 20 Nov, 09:00 AM</span>
               <span className="flex items-center gap-1"><Clock size={14} /> Finaliza: 20 Nov, 06:00 PM</span>
            </div>
          </div>
          <Button>Pausar Campaña</Button>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {campaignMetrics.map((metric, idx) => (
            <Card key={idx} className="p-4 border-l-4" style={{borderLeftColor: metric.color.replace('text-', 'bg-')}}>
               <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">{metric.label}</p>
               <div className="flex items-end gap-2">
                 <span className={`text-2xl font-bold ${metric.color}`}>{metric.value}</span>
                 <span className="text-xs text-slate-400 mb-1">/ {metric.total}</span>
               </div>
               <div className="w-full bg-gray-100 h-1 mt-2 rounded-full overflow-hidden">
                 <div className={`h-full rounded-full ${metric.color.replace('text-', 'bg-')}`} style={{width: `${(metric.value / metric.total) * 100}%`}}></div>
               </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div>
        <Tabs 
          tabs={['Audiencia', 'Configuración', 'Analítica']} 
          activeTab={activeTab} 
          onChange={setActiveTab} 
        />
        <div className="mt-6">
           {activeTab === 'Audiencia' && <AudienceTab />}
           {activeTab === 'Configuración' && <ConfigurationTab />}
           {activeTab === 'Analítica' && <AnalyticsTab />}
        </div>
      </div>
    </div>
  );
};
