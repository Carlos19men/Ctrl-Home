import React from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

const Security = ({ user, onLogout }) => (
  <div className="App">
    <Sidebar />
    <main className="main">
      <Topbar user={user} onLogout={onLogout} />
      <div style={{ padding: '20px' }}>
        <h1>Seguridad</h1>
        <p>Panel de seguridad y control de accesos.</p>
        <p>Usuario: {user?.username} | Rol: {user?.role}</p>
        
        <div style={{ margin: '20px 0' }}>
          <h2>Estado de Seguridad</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
              <h3>🔒 Sistema de Alarmas</h3>
              <p>Estado: Activo</p>
              <p>Última verificación: Hace 5 minutos</p>
            </div>
            <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
              <h3>📹 Cámaras de Seguridad</h3>
              <p>Estado: En línea</p>
              <p>Cámaras activas: 4/4</p>
            </div>
            <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
              <h3>🚪 Sensores de Puertas</h3>
              <p>Estado: Funcionando</p>
              <p>Sensores activos: 6/6</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
);

export default Security;
