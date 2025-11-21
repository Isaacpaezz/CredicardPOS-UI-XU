
export interface KPI {
  label: string;
  value: string;
  trend: number;
  trendUp: boolean;
}

export interface ChartData {
  name: string;
  value: number;
}

export interface ActivityItem {
  id: string;
  type: 'pago' | 'alerta' | 'sistema';
  title: string;
  description: string;
  time: string;
}

export interface Client {
  id: string;
  name: string;
  initials: string;
  status: 'activo' | 'inactivo' | 'pendiente';
  bank: string;
  region: string;
  terminals: number;
  lastActive: string;
}

export interface CampaignTask {
  id: string;
  title: string;
  type: string;
  audience: number;
  status: 'draft' | 'sending' | 'completed';
  date: string;
  progress?: number;
}

export interface CampaignMember {
  id: string;
  name: string;
  phone: string;
  status: 'sent' | 'delivered' | 'read' | 'replied' | 'failed';
  lastUpdate: string;
}

export interface CampaignMetric {
  label: string;
  value: number;
  total: number;
  color: string;
}

export interface UserProfile {
  name: string;
  email: string;
  role: string;
  avatar: string;
  phone: string;
  jobTitle: string;
}

export type PageView = 'login' | 'register' | 'onboarding' | 'dashboard' | 'clients' | 'campaigns' | 'new-campaign' | 'campaign-detail' | 'import' | 'chatwoot-embed' | 'settings' | 'profile';

export interface NavItem {
  id: PageView;
  label: string;
  icon: any;
}
