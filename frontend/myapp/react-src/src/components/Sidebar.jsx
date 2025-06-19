import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-title">Ctrl+Home</div>
      <nav>
        <Link 
          to="/dashboard" 
          className={`sidebar-link ${isActive('/dashboard') ? 'active' : ''}`}
        >
          🏠 Inicio
        </Link>
        <Link 
          to="/devices" 
          className={`sidebar-link ${isActive('/devices') ? 'active' : ''}`}
        >
          📱 Dispositivos
        </Link>
        <Link 
          to="/security" 
          className={`sidebar-link ${isActive('/security') ? 'active' : ''}`}
        >
          🔒 Seguridad
        </Link>
        <Link 
          to="/settings" 
          className={`sidebar-link ${isActive('/settings') ? 'active' : ''}`}
        >
          ⚙️ Configuración
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
