
import React, { useState, useMemo } from 'react';
import { Plus, Search, Phone, MessageCircle, CreditCard, Wifi, MapPin, Building2, ChevronDown, X, Smartphone, History, Battery, Signal } from 'lucide-react';
import { Card, Button, Badge, Input, Sheet, Tabs, Popover, Checkbox } from '../components/UI';
import { clientsData, clientTerminals, clientHistory } from '../mockData';
import { Client } from '../types';

// Componente auxiliar para los filtros
const FilterFacet = ({ title, options, selected, onChange }: { title: string, options: string[], selected: string[], onChange: (val: string) => void }) => (
  <Popover 
    trigger={
      <Button variant="outline" size="sm" className={`gap-2 border-dashed ${selected.length > 0 ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'text-slate-600'}`}>
        {title}
        {selected.length > 0 && (
          <span className="ml-1 rounded-full bg-indigo-200 px-1.5 py-0.5 text-[10px] font-semibold text-indigo-800">
            {selected.length}
          </span>
        )}
        <ChevronDown size={14} className="opacity-50" />
      </Button>
    }
  >
    <div className="p-2">
      <h4 className="px-2 pb-2 mb-2 text-xs font-semibold text-slate-500 border-b border-gray-100">Filtrar por {title}</h4>
      <div className="space-y-1">
        {options.map(option => (
          <div key={option} className="flex items-center px-2 py-1.5 rounded hover:bg-gray-50">
            <Checkbox 
              checked={selected.includes(option)}
              onChange={() => onChange(option)}
              label={option.charAt(0).toUpperCase() + option.slice(1)}
            />
          </div>
        ))}
      </div>
      {selected.length > 0 && (
        <button 
          onClick={() => options.forEach(opt => selected.includes(opt) && onChange(opt))}
          className="w-full mt-2 pt-2 border-t border-gray-100 text-xs text-slate-500 hover:text-indigo-600 font-medium"
        >
          Limpiar filtro
        </button>
      )}
    </div>
  </Popover>
);

export const Clients: React.FC = () => {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [activeTab, setActiveTab] = useState('Resumen');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Estados para filtros
  const [statusFilters, setStatusFilters] = useState<string[]>([]);
  const [bankFilters, setBankFilters] = useState<string[]>([]);
  const [regionFilters, setRegionFilters] = useState<string[]>([]);

  // Obtener valores únicos para los filtros
  const uniqueBanks = Array.from(new Set(clientsData.map(c => c.bank)));
  const uniqueRegions = Array.from(new Set(clientsData.map(c => c.region)));
  const uniqueStatuses = Array.from(new Set(clientsData.map(c => c.status)));

  // Lógica de filtrado
  const filteredClients = useMemo(() => {
    return clientsData.filter(client => {
      const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            client.id.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilters.length === 0 || statusFilters.includes(client.status);
      const matchesBank = bankFilters.length === 0 || bankFilters.includes(client.bank);
      const matchesRegion = regionFilters.length === 0 || regionFilters.includes(client.region);

      return matchesSearch && matchesStatus && matchesBank && matchesRegion;
    });
  }, [searchQuery, statusFilters, bankFilters, regionFilters]);

  const toggleFilter = (setter: React.Dispatch<React.SetStateAction<string[]>>, value: string) => {
    setter(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value) 
        : [...prev, value]
    );
  };

  const clearFilters = () => {
    setStatusFilters([]);
    setBankFilters([]);
    setRegionFilters([]);
    setSearchQuery('');
  };

  const hasActiveFilters = statusFilters.length > 0 || bankFilters.length > 0 || regionFilters.length > 0;

  const getStatusVariant = (status: string) => {
    switch(status) {
      case 'activo': return 'success';
      case 'inactivo': return 'destructive';
      case 'pendiente': return 'warning';
      default: return 'default';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20 md:pb-0">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Clientes</h1>
          <p className="text-slate-500 mt-1">Gestiona asociaciones POS y estado de recuperación.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="primary" className="gap-2 w-full sm:w-auto">
            <Plus size={16} />
            Agregar Cliente
          </Button>
        </div>
      </div>

      {/* Toolbar: Search & Filters */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-3 items-start md:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto flex-1">
            <div className="relative w-full sm:w-72 md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <Input 
                placeholder="Buscar cliente por nombre o ID..." 
                className="pl-9" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {/* Faceted Filters */}
            <div className="flex flex-wrap gap-2 items-center">
              <FilterFacet 
                title="Estado" 
                options={uniqueStatuses} 
                selected={statusFilters} 
                onChange={(val) => toggleFilter(setStatusFilters, val)} 
              />
              <FilterFacet 
                title="Banco" 
                options={uniqueBanks} 
                selected={bankFilters} 
                onChange={(val) => toggleFilter(setBankFilters, val)} 
              />
              <FilterFacet 
                title="Región" 
                options={uniqueRegions} 
                selected={regionFilters} 
                onChange={(val) => toggleFilter(setRegionFilters, val)} 
              />
              
              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="text-slate-500 hover:text-red-600 px-2">
                  Limpiar
                  <X className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="text-xs text-slate-500 font-medium">
        Mostrando {filteredClients.length} clientes
      </div>

      {/* Mobile View: Card List */}
      <div className="md:hidden space-y-4">
        {filteredClients.map((client) => (
          <Card 
            key={client.id} 
            className="p-4 hover:shadow-md transition-shadow cursor-pointer active:scale-[0.98] duration-100"
            onClick={() => setSelectedClient(client)}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm font-bold">
                  {client.initials}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{client.name}</h3>
                  <p className="text-xs text-slate-500">ID: {client.id}</p>
                </div>
              </div>
              <Badge variant={getStatusVariant(client.status)}>
                {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm text-slate-600 mb-3">
              <div className="flex items-center gap-1.5">
                <Building2 size={14} className="text-slate-400" />
                {client.bank}
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin size={14} className="text-slate-400" />
                {client.region}
              </div>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-gray-100 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <CreditCard size={12} /> {client.terminals} Terminales
              </span>
              <span>Activo: {client.lastActive}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Desktop View: Data Table */}
      <Card className="hidden md:block overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-medium">Cliente</th>
                <th className="px-6 py-4 font-medium">Estado</th>
                <th className="px-6 py-4 font-medium">Banco</th>
                <th className="px-6 py-4 font-medium">Región</th>
                <th className="px-6 py-4 font-medium text-right">Terminales</th>
                <th className="px-6 py-4 font-medium text-right">Última Actividad</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredClients.length > 0 ? (
                filteredClients.map((client) => (
                  <tr 
                    key={client.id} 
                    className="bg-white hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => setSelectedClient(client)}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold">
                          {client.initials}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">{client.name}</div>
                          <div className="text-xs text-slate-500">ID: {client.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={getStatusVariant(client.status)}>
                        {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{client.bank}</td>
                    <td className="px-6 py-4 text-slate-600">{client.region}</td>
                    <td className="px-6 py-4 text-right font-medium text-slate-900">{client.terminals}</td>
                    <td className="px-6 py-4 text-right text-slate-500">{client.lastActive}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                    No se encontraron clientes con los filtros seleccionados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* 360 Client Profile Sheet */}
      <Sheet 
        isOpen={!!selectedClient} 
        onClose={() => setSelectedClient(null)}
        title="Perfil del Cliente"
      >
        {selectedClient && (
          <div className="space-y-6">
            {/* Header Profile */}
            <div className="flex flex-col items-center text-center pb-6 border-b border-gray-100">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center text-2xl font-bold mb-4 shadow-lg">
                {selectedClient.initials}
              </div>
              <h2 className="text-xl font-bold text-slate-900">{selectedClient.name}</h2>
              <p className="text-sm text-slate-500 mb-4">ID Afiliado: {selectedClient.id} • {selectedClient.region}</p>
              
              <div className="flex gap-3 w-full">
                <Button variant="outline" className="flex-1 gap-2 border-green-200 hover:bg-green-50 text-green-700">
                  <MessageCircle size={16} /> WhatsApp
                </Button>
                <Button variant="outline" className="flex-1 gap-2">
                  <Phone size={16} /> Llamar
                </Button>
              </div>
            </div>

            {/* Tabs */}
            <div>
              <Tabs 
                tabs={['Resumen', 'Terminales POS', 'Historial']} 
                activeTab={activeTab} 
                onChange={setActiveTab} 
              />
              
              <div className="mt-6 animate-in fade-in duration-300">
                {activeTab === 'Resumen' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                      <span className="text-xs text-slate-500 block mb-1">Banco Adquirente</span>
                      <span className="font-semibold text-slate-900 flex items-center gap-2">
                        <Building2 size={16} className="text-indigo-500" />
                        {selectedClient.bank}
                      </span>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                      <span className="text-xs text-slate-500 block mb-1">Estado Actual</span>
                      <span className={`font-semibold flex items-center gap-2 ${selectedClient.status === 'activo' ? 'text-green-600' : 'text-red-600'}`}>
                        <Signal size={16} />
                        {selectedClient.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="col-span-2 p-4 bg-slate-50 rounded-lg border border-slate-100">
                      <span className="text-xs text-slate-500 block mb-1">Total Terminales</span>
                      <div className="flex justify-between items-end">
                        <span className="text-2xl font-bold text-slate-900">{selectedClient.terminals}</span>
                        <span className="text-xs text-slate-400">Última sincronización: {selectedClient.lastActive}</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'Terminales POS' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {clientTerminals.map((term) => (
                      <div key={term.id} className="relative p-4 rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden group hover:border-indigo-300 transition-colors">
                        <div className="absolute top-0 right-0 p-2">
                          <div className={`w-2 h-2 rounded-full ${term.status === 'online' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        </div>
                        <Smartphone className="text-slate-300 mb-3" size={32} strokeWidth={1.5} />
                        <h4 className="font-semibold text-slate-900 text-sm">{term.model}</h4>
                        <p className="text-xs text-slate-500 font-mono mt-1">{term.serial}</p>
                        
                        <div className="flex items-center gap-4 mt-4 pt-3 border-t border-slate-50">
                          <div className="flex items-center gap-1 text-xs text-slate-500">
                            <Battery size={12} className={term.battery < 20 ? 'text-red-500' : 'text-green-500'} />
                            {term.battery}%
                          </div>
                          <div className="flex items-center gap-1 text-xs text-slate-500">
                            {term.status === 'online' ? <Wifi size={12} /> : <Wifi size={12} className="text-slate-300" />}
                            {term.status === 'online' ? '4G LTE' : 'No Signal'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'Historial' && (
                  <div className="relative pl-4 border-l border-gray-200 space-y-6">
                    {clientHistory.map((item, idx) => (
                      <div key={idx} className="relative">
                        <div className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full border-2 border-white bg-indigo-400"></div>
                        <div className="flex flex-col">
                          <span className="text-xs text-slate-400 mb-0.5">{item.date}</span>
                          <span className="text-sm font-medium text-slate-900">{item.action}</span>
                          <p className="text-xs text-slate-500 mt-1">
                            Resultado: <span className="text-slate-700 font-medium">{item.result}</span>
                          </p>
                          <div className="mt-2 inline-flex items-center px-2 py-0.5 rounded bg-gray-100 text-[10px] text-slate-500 font-medium">
                            Agente: {item.agent}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </Sheet>
    </div>
  );
};
