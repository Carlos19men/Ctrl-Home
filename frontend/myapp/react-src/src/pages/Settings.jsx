import React from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

const Settings = ({ user, onLogout }) => {
  return (
    <div className="App">
      <Sidebar />
      <main className="main">
        <Topbar user={user} onLogout={onLogout} />
        <div style={{ padding: '20px' }}>
          <h1>Configuración</h1>
          <p>Configuración del sistema Ctrl+Home</p>
          <p>Usuario: {user.username} | Rol: {user.role}</p>
          
          <div style={{ margin: '20px 0' }}>
            <h2>Configuración del Sistema</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
                <h3>🌐 Configuración de Red</h3>
                <p>MQTT Broker: tcp://localhost:1883</p>
                <p>HTTP Server: Puerto 8080</p>
                <p>Estado: Conectado</p>
              </div>
              <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
                <h3>⚙️ Configuración General</h3>
                <p>Zona horaria: UTC-5</p>
                <p>Idioma: Español</p>
                <p>Notificaciones: Activas</p>
              </div>
              <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
                <h3>🔧 Mantenimiento</h3>
                <p>Última actualización: Hoy</p>
                <p>Versión: 1.0.0</p>
                <p>Estado: Actualizado</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings; 