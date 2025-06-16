import React from 'react';
import { Home, Bell, Shield, Zap, Settings } from 'lucide-react'; // o los íconos que uses

const Sidebar = () => {
  return (
    <aside className="w-20 md:w-56 bg-blue-200 text-white flex flex-col items-center py-6">
      <div className="text-xl font-bold mb-8">Ctrl+Home</div>
      <nav className="space-y-6">
        <button className="flex items-center gap-2"><Home size={20}/>Inicio</button>
        <button className="flex items-center gap-2"><Bell size={20}/>Notificaciones</button>
        <button className="flex items-center gap-2"><Shield size={20}/>Seguridad</button>
        <button className="flex items-center gap-2"><Zap size={20}/>Ahorro</button>
        <button className="flex items-center gap-2"><Settings size={20}/>Configuración</button>
      </nav>
    </aside>
  );
};

export default Sidebar;
