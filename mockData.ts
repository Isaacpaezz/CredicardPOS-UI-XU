
import { KPI, ChartData, ActivityItem, Client, CampaignTask, CampaignMember, CampaignMetric, UserProfile } from './types';

export const kpiData: KPI[] = [
  { label: 'Terminales Activos', value: '1,284', trend: 12.5, trendUp: true },
  { label: 'Recuperación Mensual', value: '$482,900', trend: 8.2, trendUp: true },
  { label: 'Tasa de Éxito', value: '94.2%', trend: 1.1, trendUp: false },
];

// --- Old Simple Chart Data (Deprecated but kept for ref if needed) ---
export const chartDataSemanal: ChartData[] = [
  { name: 'Lun', value: 2400 },
  { name: 'Mar', value: 1398 },
  { name: 'Mie', value: 9800 },
  { name: 'Jue', value: 3908 },
  { name: 'Vie', value: 4800 },
  { name: 'Sab', value: 3800 },
  { name: 'Dom', value: 4300 },
];

// --- NEW Funnel Chart Data ---
export const dashboardFunnelData = {
  day: [
    { name: '09:00', contactados: 45, conversacion: 12, recuperados: 5 },
    { name: '11:00', contactados: 80, conversacion: 35, recuperados: 15 },
    { name: '13:00', contactados: 60, conversacion: 40, recuperados: 25 },
    { name: '15:00', contactados: 95, conversacion: 45, recuperados: 30 },
    { name: '17:00', contactados: 50, conversacion: 20, recuperados: 10 },
  ],
  week: [
    { name: 'Lun', contactados: 320, conversacion: 140, recuperados: 85 },
    { name: 'Mar', contactados: 280, conversacion: 160, recuperados: 95 },
    { name: 'Mie', contactados: 450, conversacion: 210, recuperados: 150 },
    { name: 'Jue', contactados: 390, conversacion: 180, recuperados: 120 },
    { name: 'Vie', contactados: 510, conversacion: 250, recuperados: 190 },
    { name: 'Sab', contactados: 180, conversacion: 80, recuperados: 40 },
    { name: 'Dom', contactados: 120, conversacion: 40, recuperados: 20 },
  ],
  month: [
    { name: 'Sem 1', contactados: 1200, conversacion: 540, recuperados: 320 },
    { name: 'Sem 2', contactados: 1450, conversacion: 680, recuperados: 410 },
    { name: 'Sem 3', contactados: 1100, conversacion: 490, recuperados: 280 },
    { name: 'Sem 4', contactados: 1600, conversacion: 750, recuperados: 520 },
  ]
};

export const recentActivity: ActivityItem[] = [
  { id: '1', type: 'pago', title: 'Pago Recibido', description: 'Farmacia San Jorge liquidó $12,500', time: 'Hace 2h' },
  { id: '2', type: 'alerta', title: 'Terminal Desconectada', description: 'ID-9022 en Supermercado Norte', time: 'Hace 4h' },
  { id: '3', type: 'sistema', title: 'Sincronización Completada', description: 'Actualización de catálogo exitosa', time: 'Hace 5h' },
  { id: '4', type: 'pago', title: 'Nuevo Acuerdo', description: 'Restaurante El Sol aceptó términos', time: 'Hace 1d' },
];

export const clientsData: Client[] = [
  { id: '1', name: 'Comercializadora Alpha', initials: 'CA', status: 'activo', bank: 'BBVA', region: 'Norte', terminals: 14, lastActive: '2 min' },
  { id: '2', name: 'Farmacias del Ahorro', initials: 'FA', status: 'activo', bank: 'Santander', region: 'Centro', terminals: 42, lastActive: '15 min' },
  { id: '3', name: 'Abarrotes Doña Lupe', initials: 'AD', status: 'inactivo', bank: 'Banorte', region: 'Sur', terminals: 2, lastActive: '3 días' },
  { id: '4', name: 'Restaurante Bella Italia', initials: 'RB', status: 'pendiente', bank: 'HSBC', region: 'Occidente', terminals: 5, lastActive: '1 día' },
  { id: '5', name: 'Tiendas Oxxo (Plaza)', initials: 'TO', status: 'activo', bank: 'BBVA', region: 'Centro', terminals: 8, lastActive: '1 hora' },
];

// --- Drawer Data ---
export const clientTerminals = [
  { id: 'POS-001', model: 'Verifone V200t', serial: 'SN-992831', status: 'online', battery: 98 },
  { id: 'POS-002', model: 'Ingenico Move', serial: 'SN-112039', status: 'offline', battery: 0 },
  { id: 'POS-003', model: 'Verifone V200t', serial: 'SN-445920', status: 'online', battery: 45 },
];

export const clientHistory = [
  { date: '20 Nov 2024', action: 'Llamada de Cobranza', result: 'Acuerdo de pago', agent: 'Admin' },
  { date: '18 Nov 2024', action: 'Envío de SMS', result: 'Entregado', agent: 'Sistema' },
  { date: '15 Nov 2024', action: 'Incidencia Técnica', result: 'Resuelto', agent: 'Soporte' },
];

// --- Kanban Data ---
export const campaignTasks: CampaignTask[] = [
  { id: 'c1', title: 'Promo Black Friday', type: 'Email', audience: 1200, status: 'draft', date: 'Creado hace 2h' },
  { id: 'c2', title: 'Recordatorio de Pago', type: 'SMS', audience: 450, status: 'sending', progress: 65, date: 'Iniciado hace 10m' },
  { id: 'c3', title: 'Aviso Mantenimiento', type: 'Push', audience: 2000, status: 'completed', progress: 100, date: 'Finalizado ayer' },
  { id: 'c4', title: 'Encuesta Satisfacción', type: 'Email', audience: 800, status: 'draft', date: 'Creado ayer' },
];

// --- Settings / Team Data ---
export const teamMembers = [
  { id: '1', name: 'Admin Usuario', email: 'admin@credicard.com', role: 'Owner', status: 'active', avatar: 'AD' },
  { id: '2', name: 'Ana Soporte', email: 'ana.soporte@credicard.com', role: 'Agent', status: 'active', avatar: 'AS' },
  { id: '3', name: 'Carlos Ventas', email: 'carlos.ventas@credicard.com', role: 'Agent', status: 'invited', avatar: 'CV' },
  { id: '4', name: 'Maria Finanzas', email: 'maria.fin@credicard.com', role: 'Viewer', status: 'active', avatar: 'MF' },
];

// --- Campaign Detail Data ---
export const campaignMetrics: CampaignMetric[] = [
  { label: 'Enviados', value: 420, total: 450, color: 'text-slate-900' },
  { label: 'Entregados', value: 415, total: 450, color: 'text-blue-600' },
  { label: 'Leídos', value: 380, total: 450, color: 'text-indigo-600' },
  { label: 'Respondidos', value: 145, total: 450, color: 'text-green-600' },
];

export const campaignMembers: CampaignMember[] = [
  { id: '1', name: 'Farmacia Central', phone: '+58 414 1234567', status: 'replied', lastUpdate: 'Hace 5m' },
  { id: '2', name: 'Inversiones J&J', phone: '+58 412 9876543', status: 'read', lastUpdate: 'Hace 12m' },
  { id: '3', name: 'Bodegón El Ávila', phone: '+58 424 5551122', status: 'delivered', lastUpdate: 'Hace 30m' },
  { id: '4', name: 'Restaurante La Plaza', phone: '+58 416 3339988', status: 'failed', lastUpdate: 'Hace 1h' },
  { id: '5', name: 'Auto Repuestos Lara', phone: '+58 414 7772211', status: 'sent', lastUpdate: 'Hace 2h' },
];

export const campaignTimelineData = [
  { name: '09:00', sent: 50, replies: 2 },
  { name: '10:00', sent: 120, replies: 15 },
  { name: '11:00', sent: 200, replies: 45 },
  { name: '12:00', sent: 350, replies: 80 },
  { name: '13:00', sent: 420, replies: 120 },
  { name: '14:00', sent: 420, replies: 145 },
];

export const campaignHourlyData = [
  { name: '9AM', value: 10 },
  { name: '10AM', value: 35 },
  { name: '11AM', value: 60 },
  { name: '12PM', value: 45 },
  { name: '1PM', value: 25 },
  { name: '2PM', value: 15 },
];

// --- Profile Data ---
export const currentUser: UserProfile = {
  name: 'Admin Usuario',
  email: 'admin@credicardpos.com',
  role: 'Jefe de Recuperación',
  avatar: 'AD',
  phone: '+58 412 555 0000',
  jobTitle: 'Gerente de Operaciones'
};
