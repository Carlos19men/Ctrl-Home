import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import DeviceCard from '../components/DeviceCard';

const Dashboard = ({ user, onLogout }) => {
  const [devices, setDevices] = useState([]);
  const [systemStatus, setSystemStatus] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Obtener dispositivos
      const devicesResponse = await fetch('/api/dispositivos');
      const devicesData = await devicesResponse.json();
      
      if (devicesResponse.ok) {
        setDevices(devicesData.dispositivos || []);
      }

      // Obtener estado del sistema
      const statusResponse = await fetch('/api/estado');
      const statusData = await statusResponse.json();
      
      if (statusResponse.ok) {
        setSystemStatus(statusData);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <p>Cargando dashboard...</p>
      </div>
    );
  }

  return (
    <div className="App">
      <Sidebar />
      <main className="main">
        <Topbar user={user} onLogout={onLogout} />
        <div style={{ padding: '20px' }}>
          <h1>¡Hola {user.username}!</h1>
          <p>Bienvenido al panel de control de tu hogar inteligente</p>
          <p>Rol: {user.role}</p>
          
          <div style={{ margin: '20px 0' }}>
            <h2>Estado del Sistema</h2>
            <p>MQTT: {systemStatus.mqtt || 'Conectado'}</p>
            <p>Sistema: {systemStatus.estado || 'Funcionando'}</p>
          </div>

          <div style={{ margin: '20px 0' }}>
            <h2>Dispositivos ({devices.length})</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
              {devices.map((device) => (
                <div key={device.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
                  <h3>{device.nombre}</h3>
                  <p>Tipo: {device.tipo}</p>
                  <p>Estado: {device.estado}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ margin: '20px 0' }}>
            <h2>Acciones Rápidas</h2>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button style={{ padding: '10px 20px', backgroundColor: '#667eea', color: 'white', border: 'none', borderRadius: '5px' }}>
                Escanear Sistema
              </button>
              <button style={{ padding: '10px 20px', backgroundColor: '#667eea', color: 'white', border: 'none', borderRadius: '5px' }}>
                Estado General
              </button>
              <Link to="/devices" style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
                Ver Todos los Dispositivos
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard; 