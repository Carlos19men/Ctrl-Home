import React from 'react';

const Topbar = ({ user, onLogout }) => {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <h2>Ctrl+Home</h2>
      </div>
      <div className="topbar-right">
        <span className="user-info">
          👤 {user?.username} ({user?.role})
        </span>
        <button 
          onClick={onLogout}
          className="logout-button"
        >
          🚪 Cerrar Sesión
        </button>
      </div>
    </header>
  );
}

export default Topbar;