
import React, { useState } from 'react';
import { Plus, Users } from 'lucide-react';
import { Button, Badge } from '../components/UI';
import { campaignTasks } from '../mockData';
import { PageView } from '../types';

interface CampaignsProps {
  onNavigate: (page: PageView) => void;
}

export const Campaigns: React.FC<CampaignsProps> = ({ onNavigate }) => {
  // Kanban Columns
  const columns = [
    { id: 'draft', label: 'Borrador', color: 'bg-slate-100 text-slate-700' },
    { id: 'sending', label: 'Enviando', color: 'bg-orange-50 text-orange-700' },
    { id: 'completed', label: 'Completado', color: 'bg-green-50 text-green-700' },
  ];

  const getTasksByStatus = (status: string) => campaignTasks.filter(t => t.status === status);

  return (
    <div className="h-full flex flex-col animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4 flex-none">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Campañas</h1>
          <p className="text-slate-500 mt-1">Tablero de seguimiento de comunicaciones.</p>
        </div>
        <Button onClick={() => onNavigate('new-campaign')} variant="primary" className="gap-2">
          <Plus size={16} />
          Nueva Campaña
        </Button>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 overflow-x-auto pb-4">
        <div className="flex gap-6 min-w-[1000px] h-full">
          {columns.map((col) => (
            <div key={col.id} className="flex-1 flex flex-col bg-slate-50/50 rounded-xl border border-slate-200/60 p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-700">{col.label}</h3>
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${col.color}`}>
                  {getTasksByStatus(col.id).length}
                </span>
              </div>
              
              <div className="space-y-3 overflow-y-auto flex-1 pr-2">
                {getTasksByStatus(col.id).map((task) => (
                  <div 
                    key={task.id} 
                    onClick={() => onNavigate('campaign-detail')}
                    className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all hover:border-indigo-300 cursor-pointer group relative top-0 hover:-top-1"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="outline">{task.type}</Badge>
                      {task.status === 'sending' && (
                        <span className="flex h-2 w-2 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                        </span>
                      )}
                    </div>
                    <h4 className="font-medium text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">{task.title}</h4>
                    <p className="text-xs text-slate-400 mb-3">{task.date}</p>
                    
                    {task.status !== 'draft' && task.progress !== undefined && (
                      <div className="mb-3">
                        <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                          <span>Progreso</span>
                          <span>{task.progress}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${task.status === 'completed' ? 'bg-green-500' : 'bg-orange-500'}`} 
                            style={{ width: `${task.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2 border-t border-gray-50 mt-2">
                      <div className="flex items-center text-xs text-slate-500 gap-1">
                        <Users size={14} />
                        {task.audience}
                      </div>
                      <div className="flex -space-x-2">
                        <div className="w-6 h-6 rounded-full bg-indigo-100 border-2 border-white text-[10px] flex items-center justify-center text-indigo-700 font-bold">A</div>
                        <div className="w-6 h-6 rounded-full bg-slate-100 border-2 border-white text-[10px] flex items-center justify-center text-slate-700">S</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
