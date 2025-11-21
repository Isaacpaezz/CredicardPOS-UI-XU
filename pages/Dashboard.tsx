
import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { TrendingUp, TrendingDown, Clock, DollarSign, AlertCircle, CheckCircle, CalendarDays } from 'lucide-react';
import { Card, Badge, Button } from '../components/UI';
import { kpiData, dashboardFunnelData, recentActivity } from '../mockData';

export const Dashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month'>('week');
  const currentDate = new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  // Determine which data set to use based on state
  const currentChartData = dashboardFunnelData[timeRange];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Hero Section */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Buenos días, Admin</h1>
        <p className="text-slate-500 mt-1 capitalize">{currentDate}</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {kpiData.map((kpi, idx) => (
          <Card key={idx} className="p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500">{kpi.label}</span>
              <Badge variant={kpi.trendUp ? 'success' : 'destructive'}>
                <span className="flex items-center gap-1">
                  {kpi.trendUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {kpi.trend}%
                </span>
              </Badge>
            </div>
            <div className="mt-4">
              <span className="text-3xl font-bold text-slate-900">{kpi.value}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Chart Section (Funnel Analysis) */}
        <div className="lg:col-span-2">
          <Card className="h-full flex flex-col">
            <div className="p-6 border-b border-gray-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Rendimiento de Recuperación</h2>
                <p className="text-sm text-slate-500">Análisis del embudo de gestión</p>
              </div>
              
              <div className="flex flex-wrap gap-3 items-center">
                {/* Date Range Simulator */}
                <Button variant="outline" size="sm" className="text-slate-500 gap-2 hidden sm:flex">
                  <CalendarDays size={14} />
                  20 Nov - 27 Nov
                </Button>

                {/* Granularity Toggles */}
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button 
                    onClick={() => setTimeRange('day')}
                    className={`px-3 py-1 text-xs font-medium rounded transition-all ${timeRange === 'day' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-900'}`}
                  >
                    Día
                  </button>
                  <button 
                    onClick={() => setTimeRange('week')}
                    className={`px-3 py-1 text-xs font-medium rounded transition-all ${timeRange === 'week' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-900'}`}
                  >
                    Semana
                  </button>
                  <button 
                    onClick={() => setTimeRange('month')}
                    className={`px-3 py-1 text-xs font-medium rounded transition-all ${timeRange === 'month' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-900'}`}
                  >
                    Mes
                  </button>
                </div>
              </div>
            </div>

            <div className="flex-1 p-6 min-h-[350px]">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={currentChartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748B', fontSize: 12 }} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748B', fontSize: 12 }} 
                  />
                  <Tooltip 
                    cursor={{ fill: '#F8FAFC' }}
                    contentStyle={{ backgroundColor: '#1E293B', border: 'none', borderRadius: '8px', color: '#fff', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                    itemStyle={{ paddingBottom: 4 }}
                  />
                  <Legend 
                    wrapperStyle={{ paddingTop: '20px' }}
                    iconType="circle"
                  />
                  
                  {/* Series A: Contactados (Base Volume - Slate) */}
                  <Bar 
                    dataKey="contactados" 
                    name="Contactados" 
                    stackId="a" 
                    fill="#CBD5E1" 
                    radius={[0, 0, 0, 0]} 
                    barSize={32}
                  />
                  
                  {/* Series B: En Conversación (Engagement - Indigo) */}
                  <Bar 
                    dataKey="conversacion" 
                    name="En Conversación" 
                    stackId="a" 
                    fill="#6366F1" 
                    radius={[0, 0, 0, 0]} 
                    barSize={32}
                  />
                  
                  {/* Series C: Recuperados (Success - Emerald) */}
                  <Bar 
                    dataKey="recuperados" 
                    name="Recuperados" 
                    stackId="a" 
                    fill="#10B981" 
                    radius={[4, 4, 0, 0]} 
                    barSize={32}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Recent Activity Section */}
        <div className="lg:col-span-1">
          <Card className="h-full flex flex-col">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-slate-900">Actividad Reciente</h2>
            </div>
            <div className="p-6 flex-1 overflow-y-auto max-h-[400px]">
              <div className="relative border-l border-gray-200 ml-2 space-y-8">
                {recentActivity.map((item, idx) => {
                  let Icon = Clock;
                  let colorClass = "bg-gray-100 text-gray-600";
                  
                  if (item.type === 'pago') { Icon = DollarSign; colorClass = "bg-green-100 text-green-600"; }
                  else if (item.type === 'alerta') { Icon = AlertCircle; colorClass = "bg-red-100 text-red-600"; }
                  else if (item.type === 'sistema') { Icon = CheckCircle; colorClass = "bg-blue-100 text-blue-600"; }

                  return (
                    <div key={item.id} className="relative pl-8 group cursor-pointer">
                      <span className={`absolute -left-3.5 top-1 rounded-full p-1.5 border-2 border-white transition-colors group-hover:border-indigo-100 ${colorClass}`}>
                        <Icon size={12} strokeWidth={3} />
                      </span>
                      <div className="flex flex-col">
                        <h3 className="text-sm font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">{item.title}</h3>
                        <p className="text-sm text-slate-500 mt-0.5">{item.description}</p>
                        <span className="text-xs text-slate-400 mt-1">{item.time}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="p-4 border-t border-gray-100 bg-gray-50 rounded-b-xl">
               <Button variant="ghost" size="sm" className="w-full text-slate-500 hover:text-indigo-600 text-xs">
                  Ver todo el historial
               </Button>
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
};
