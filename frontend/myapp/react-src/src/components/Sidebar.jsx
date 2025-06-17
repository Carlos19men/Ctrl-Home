import React from 'react';
import { Home, Bell, Shield, Zap, Settings } from 'lucide-react'; // o los íconos que uses

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-title">Ctrl+Home</div>
      <nav>
        <button><Home size={20}/>Inicio</button>
        <button><Bell size={20}/>Notificaciones</button>
        <button><Shield size={20}/>Seguridad</button>
        <button><Zap size={20}/>Ahorro</button>
        <button><Settings size={20}/>Configuración</button>
      </nav>
    </aside>
  );
};

export default Sidebar;
