
import React, { useState, useRef } from 'react';
import { 
  User, 
  Lock, 
  Bell, 
  Camera, 
  Moon, 
  Sun, 
  Monitor, 
  Shield,
  Save
} from 'lucide-react';
import { Card, Input, Label, Button, Tabs, Switch } from '../components/UI';
import { currentUser } from '../mockData';

export const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Información Personal');
  const [isEditing, setIsEditing] = useState(false);
  
  // Profile Picture State
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarPreview(url);
    }
  };

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  // Info Tab Sub-component
  const InfoTab = () => (
    <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-300">
      <Card className="p-6 space-y-6">
        <div className="flex items-center justify-between">
           <h3 className="text-lg font-semibold text-slate-900">Datos Básicos</h3>
           <Button variant="ghost" onClick={() => setIsEditing(!isEditing)} className="text-indigo-600">
             {isEditing ? 'Cancelar' : 'Editar'}
           </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Nombre Completo</Label>
            <Input defaultValue={currentUser.name} disabled={!isEditing} />
          </div>
          <div className="space-y-2">
             <Label>Cargo / Rol</Label>
             <Input defaultValue={currentUser.jobTitle} disabled={!isEditing} />
          </div>
          <div className="space-y-2">
             <Label>Teléfono</Label>
             <Input defaultValue={currentUser.phone} disabled={!isEditing} />
          </div>
          <div className="space-y-2">
             <Label>Correo Electrónico</Label>
             <Input defaultValue={currentUser.email} disabled className="bg-gray-50 text-slate-500 cursor-not-allowed" />
             <p className="text-[10px] text-slate-400">Gestionado por el administrador de la organización.</p>
          </div>
        </div>

        {isEditing && (
          <div className="pt-4 border-t border-gray-100 flex justify-end">
            <Button onClick={() => setIsEditing(false)} className="gap-2">
              <Save size={16} /> Guardar Cambios
            </Button>
          </div>
        )}
      </Card>
    </div>
  );

  // Security Tab Sub-component
  const SecurityTab = () => (
    <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-300 space-y-6">
      {/* Password Change */}
      <Card className="p-6 space-y-6">
         <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
               <Lock size={20} />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">Contraseña</h3>
         </div>
         
         <div className="space-y-4">
           <div className="space-y-2">
             <Label>Contraseña Actual</Label>
             <Input type="password" placeholder="••••••••" />
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="space-y-2">
               <Label>Nueva Contraseña</Label>
               <Input type="password" />
             </div>
             <div className="space-y-2">
               <Label>Confirmar Nueva Contraseña</Label>
               <Input type="password" />
             </div>
           </div>
           <div className="pt-2 flex justify-end">
             <Button variant="outline">Actualizar Contraseña</Button>
           </div>
         </div>
      </Card>

      {/* 2FA */}
      <Card className="p-6">
         <div className="flex items-center justify-between">
           <div className="flex items-center gap-3">
              <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                 <Shield size={20} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Autenticación en Dos Pasos (2FA)</h3>
                <p className="text-sm text-slate-500">Añade una capa extra de seguridad a tu cuenta.</p>
              </div>
           </div>
           <Switch />
         </div>
      </Card>
    </div>
  );

  // Preferences Tab Sub-component
  const PreferencesTab = () => (
    <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-300 space-y-6">
      {/* Theme */}
      <Card className="p-6">
         <h3 className="text-lg font-semibold text-slate-900 mb-4">Apariencia</h3>
         <div className="grid grid-cols-3 gap-4">
            <div className="border-2 border-indigo-600 bg-indigo-50 p-4 rounded-xl flex flex-col items-center cursor-pointer">
               <Sun size={24} className="text-indigo-600 mb-2" />
               <span className="text-sm font-medium text-indigo-900">Claro</span>
            </div>
            <div className="border border-gray-200 hover:border-gray-300 p-4 rounded-xl flex flex-col items-center cursor-pointer opacity-60">
               <Moon size={24} className="text-slate-600 mb-2" />
               <span className="text-sm font-medium text-slate-700">Oscuro</span>
            </div>
            <div className="border border-gray-200 hover:border-gray-300 p-4 rounded-xl flex flex-col items-center cursor-pointer opacity-60">
               <Monitor size={24} className="text-slate-600 mb-2" />
               <span className="text-sm font-medium text-slate-700">Sistema</span>
            </div>
         </div>
      </Card>

      {/* Notifications */}
      <Card className="p-6">
         <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
               <Bell size={20} />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">Notificaciones</h3>
         </div>

         <div className="space-y-6">
            <div className="flex items-center justify-between">
               <div>
                  <p className="font-medium text-slate-900">Resumen por Correo</p>
                  <p className="text-xs text-slate-500">Recibe un resumen semanal de tus KPIs.</p>
               </div>
               <Switch checked />
            </div>
            <div className="flex items-center justify-between">
               <div>
                  <p className="font-medium text-slate-900">Alertas de Navegador</p>
                  <p className="text-xs text-slate-500">Notificaciones push cuando un cliente responde.</p>
               </div>
               <Switch checked />
            </div>
            <div className="flex items-center justify-between">
               <div>
                  <p className="font-medium text-slate-900">Nuevos Dispositivos</p>
                  <p className="text-xs text-slate-500">Avisar cuando se inicie sesión desde otro lugar.</p>
               </div>
               <Switch />
            </div>
         </div>
      </Card>
    </div>
  );

  return (
    <div className="space-y-8 pb-12">
      {/* Header Standard (No Hero) */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Mi Perfil</h1>
        <p className="text-slate-500 mt-1">Gestiona tu información personal y preferencias.</p>
      </div>

      {/* Profile Card & Tabs */}
      <div className="bg-transparent">
         <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-8 border-b border-gray-200">
            <div className="relative group">
               <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-2xl font-bold border-4 border-white shadow-sm overflow-hidden">
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    currentUser.avatar
                  )}
               </div>
               
               {/* Hidden File Input */}
               <input 
                 type="file" 
                 ref={fileInputRef} 
                 onChange={handleFileChange} 
                 accept="image/*" 
                 className="hidden" 
               />

               <button 
                 onClick={handleCameraClick}
                 className="absolute bottom-0 right-0 p-1.5 bg-white rounded-full border border-gray-200 shadow-sm hover:bg-gray-50 text-slate-600 z-10 transition-transform hover:scale-110 active:scale-95"
                 title="Cambiar foto"
               >
                  <Camera size={14} />
               </button>
            </div>
            <div>
               <h2 className="text-xl font-bold text-slate-900">{currentUser.name}</h2>
               <div className="flex items-center gap-2 text-slate-500 text-sm mt-1">
                  <User size={14} />
                  <span>{currentUser.role}</span>
               </div>
            </div>
            <div className="sm:ml-auto">
               <Button variant="outline">Ver Perfil Público</Button>
            </div>
         </div>
            
         {/* Tabs Navigation */}
         <div className="mt-6">
            <Tabs 
              tabs={['Información Personal', 'Seguridad', 'Preferencias']} 
              activeTab={activeTab} 
              onChange={setActiveTab} 
            />
         </div>
      </div>

      {/* Content Area */}
      <div className="mt-2">
         {activeTab === 'Información Personal' && <InfoTab />}
         {activeTab === 'Seguridad' && <SecurityTab />}
         {activeTab === 'Preferencias' && <PreferencesTab />}
      </div>
    </div>
  );
};
