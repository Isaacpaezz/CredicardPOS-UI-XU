
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Megaphone, 
  UploadCloud, 
  Search, 
  Bell, 
  Menu,
  X,
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { PageView, NavItem } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Panel', icon: LayoutDashboard },
  { id: 'clients', label: 'Clientes', icon: Users },
  { id: 'campaigns', label: 'Campañas', icon: Megaphone },
  { id: 'import', label: 'Importar', icon: UploadCloud },
  { id: 'settings', label: 'Configuración', icon: Settings },
];

export const Layout: React.FC<LayoutProps> = ({ children, currentPage, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const getBreadcrumb = () => {
    const item = navItems.find(n => n.id === currentPage);
    if (currentPage === 'new-campaign') return 'CredicardPOS > Campañas > Nueva Campaña';
    if (currentPage === 'profile') return 'CredicardPOS > Mi Perfil';
    return `CredicardPOS > ${item?.label || 'Panel'}`;
  };

  // Helper to determine if a nav item is active (handling sub-pages like new-campaign)
  const isItemActive = (itemId: PageView) => {
    if (currentPage === 'new-campaign' && itemId === 'campaigns') return true;
    return currentPage === itemId;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          bg-[#0F172A] text-slate-400 flex flex-col
          transform transition-all duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0 w-[260px]' : '-translate-x-full lg:translate-x-0'}
          ${isSidebarCollapsed ? 'lg:w-20' : 'lg:w-[260px]'}
        `}
      >
        {/* Desktop Toggle Button */}
        <button
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className="hidden lg:flex absolute -right-3 top-8 h-6 w-6 bg-indigo-600 text-white rounded-full items-center justify-center shadow-md hover:bg-indigo-700 transition-colors z-50 border-2 border-[#0F172A]"
          title={isSidebarCollapsed ? "Expandir menú" : "Colapsar menú"}
        >
          {isSidebarCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>

        {/* Logo Area */}
        <div className={`h-16 flex items-center border-b border-slate-800 transition-all duration-300 px-6 ${isSidebarCollapsed ? 'lg:justify-center lg:px-0' : ''}`}>
          <div className="h-8 w-8 bg-indigo-600 rounded flex-shrink-0 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.5)]">
            <span className="text-white font-bold text-lg">C</span>
          </div>
          
          <div className={`ml-3 overflow-hidden transition-all duration-300 w-auto opacity-100 ${isSidebarCollapsed ? 'lg:w-0 lg:opacity-0' : ''}`}>
            <span className="text-white font-bold text-lg tracking-tight whitespace-nowrap">CredicardPOS</span>
          </div>

          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="ml-auto lg:hidden text-slate-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-3 space-y-1 overflow-hidden">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = isItemActive(item.id);
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`
                  w-full flex items-center py-2.5 text-sm font-medium rounded-lg transition-all duration-200 relative group px-3
                  ${isSidebarCollapsed ? 'lg:justify-center lg:px-0' : ''}
                  ${isActive 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'}
                `}
                title={isSidebarCollapsed ? item.label : ''}
              >
                <Icon 
                  size={20} 
                  className={`flex-shrink-0 transition-all duration-300 ${isActive ? 'text-white' : 'text-slate-400'} mr-3 ${isSidebarCollapsed ? 'lg:mr-0' : ''}`} 
                  strokeWidth={1.5} 
                />
                
                <span className={`whitespace-nowrap overflow-hidden transition-all duration-300 relative w-auto opacity-100 ${isSidebarCollapsed ? 'lg:w-0 lg:opacity-0 lg:absolute' : ''}`}>
                  {item.label}
                </span>

                {/* Tooltip on hover when collapsed (Desktop only) */}
                {isSidebarCollapsed && (
                  <div className="hidden lg:block absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 whitespace-nowrap">
                    {item.label}
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Profile Footer */}
        <div 
          className={`p-4 border-t border-slate-800 transition-all duration-300 cursor-pointer hover:bg-white/5 ${isSidebarCollapsed ? 'lg:flex lg:justify-center' : ''}`}
          onClick={() => {
            onNavigate('profile');
            setIsMobileMenuOpen(false);
          }}
          title="Ver Perfil"
        >
          <div className="flex items-center overflow-hidden">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex-shrink-0 flex items-center justify-center text-white font-medium text-xs hover:ring-2 hover:ring-indigo-400 transition-all">
              AD
            </div>
            <div className={`ml-3 transition-all duration-300 w-auto opacity-100 ${isSidebarCollapsed ? 'lg:w-0 lg:opacity-0' : ''}`}>
              <p className="text-sm font-medium text-white whitespace-nowrap">Admin Usuario</p>
              <p className="text-xs text-slate-500 whitespace-nowrap">Jefe de Recuperación</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden w-full">
        {/* Header */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-30 flex items-center justify-between px-4 lg:px-8">
          <div className="flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="mr-4 lg:hidden p-2 rounded-md text-slate-500 hover:bg-gray-100"
            >
              <Menu size={20} />
            </button>
            <nav className="hidden sm:flex text-sm font-medium text-slate-500">
              {getBreadcrumb()}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Búsqueda global (Cmd+K)" 
                className="h-9 pl-9 pr-4 rounded-lg bg-gray-100 border-transparent focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm w-64 transition-all placeholder:text-slate-400"
              />
            </div>
            <button className="relative p-2 rounded-full text-slate-400 hover:bg-gray-100 hover:text-slate-600 transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        {/* Page Content Scrollable */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 scroll-smooth">
          <div className="max-w-7xl mx-auto h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
