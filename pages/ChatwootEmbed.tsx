
import React from 'react';
import { ExternalLink, CreditCard, Wifi, Battery, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button, Badge, Card } from '../components/UI';
import { clientsData, clientTerminals } from '../mockData';

export const ChatwootEmbed: React.FC = () => {
  // Simulamos obtener el cliente basado en el contexto del chat actual
  // En producción, esto vendría por parámetros de URL o API
  const client = clientsData[0]; 
  const terminals = clientTerminals; // Usamos los terminales mock

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'activo': return 'success';
      case 'inactivo': return 'destructive';
      default: return 'warning';
    }
  };

  return (
    <div className="min-h-screen bg-white p-4 font-sans">
      {/* Compact Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold shadow-sm">
            {client.initials}
          </div>
          <div>
            <h1 className="text-sm font-bold text-slate-900 leading-tight">{client.name}</h1>
            <p className="text-xs text-slate-500">ID: {client.id}</p>
          </div>
        </div>
        <Badge variant={getStatusColor(client.status)}>{client.status}</Badge>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-2 mb-6">
        <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
          <span className="text-[10px] text-slate-500 uppercase tracking-wider block mb-1">Banco</span>
          <span className="text-sm font-semibold text-slate-900 block truncate">{client.bank}</span>
        </div>
        <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
          <span className="text-[10px] text-slate-500 uppercase tracking-wider block mb-1">Región</span>
          <span className="text-sm font-semibold text-slate-900 block truncate">{client.region}</span>
        </div>
      </div>

      {/* Terminals List */}
      <div className="mb-6">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
          <CreditCard size={12} /> Terminales POS ({terminals.length})
        </h3>
        
        <div className="space-y-2">
          {terminals.map((term) => (
            <div key={term.id} className="flex items-center justify-between p-2.5 rounded-lg border border-gray-100 hover:border-indigo-100 hover:bg-indigo-50/30 transition-all group bg-white shadow-sm">
              <div className="flex items-center gap-3">
                <div className={`relative w-2 h-2 rounded-full ${term.status === 'online' ? 'bg-green-500' : 'bg-red-500'}`}>
                  {term.status === 'online' && <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75"></span>}
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-900">{term.model}</p>
                  <p className="text-[10px] text-slate-500 font-mono">{term.serial}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5 text-[10px] text-slate-400" title="Batería">
                  <Battery size={10} className={term.battery < 20 ? 'text-red-500' : 'text-green-600'} />
                  <span>{term.battery}%</span>
                </div>
                <div className="flex items-center gap-0.5 text-[10px] text-slate-400" title="Señal">
                  <Wifi size={10} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alerts / Status */}
      {client.status === 'inactivo' && (
        <div className="mb-6 p-3 bg-red-50 border border-red-100 rounded-lg flex gap-2">
          <AlertCircle size={16} className="text-red-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-red-800">Cliente en Riesgo</p>
            <p className="text-[10px] text-red-600 leading-snug mt-0.5">
              Sin transacciones detectadas en los últimos 30 días. Se recomienda iniciar campaña de recuperación.
            </p>
          </div>
        </div>
      )}

      {client.status === 'activo' && (
        <div className="mb-6 p-3 bg-green-50 border border-green-100 rounded-lg flex gap-2">
          <CheckCircle2 size={16} className="text-green-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-green-800">Cliente Saludable</p>
            <p className="text-[10px] text-green-600 leading-snug mt-0.5">
              Volumen de transacciones estable. Última actividad hace {client.lastActive}.
            </p>
          </div>
        </div>
      )}

      {/* Footer Actions */}
      <div className="mt-auto pt-4 border-t border-gray-100">
        <Button className="w-full gap-2 text-xs" size="sm" onClick={() => window.open('/', '_blank')}>
          Ver Perfil Completo <ExternalLink size={12} />
        </Button>
      </div>
    </div>
  );
};
