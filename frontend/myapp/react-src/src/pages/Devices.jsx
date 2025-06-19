import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

const Devices = ({ user, onLogout }) => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    try {
      const response = await fetch('/api/dispositivos');
      const data = await response.json();
      
      if (response.ok) {
        setDevices(data.dispositivos || []);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching devices:', error);
      setLoading(false);
    }
  };

  const toggleDevice = async (deviceId, currentState) => {
    try {
      const newState = currentState === 'encendido' ? 'apagado' : 'encendido';
      const response = await fetch(`/api/dispositivos/${deviceId}/toggle`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ estado: newState })
      });

      if (response.ok) {
        // Actualizar el estado local
        setDevices(devices.map(device => 
          device.id === deviceId 
            ? { ...device, estado: newState }
            : device
        ));
      }
    } catch (error) {
      console.error('Error toggling device:', error);
    }
  };

  if (loading) {
    return (
      <div className="App">
        <Sidebar />
        <main className="main">
          <Topbar user={user} onLogout={onLogout} />
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <p>Cargando dispositivos...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="App">
      <Sidebar />
      <main className="main">
        <Topbar user={user} onLogout={onLogout} />
        <div style={{ padding: '20px' }}>
          <h1>Dispositivos IoT</h1>
          <p>Gestión completa de dispositivos inteligentes</p>
          <p>Usuario: {user.username} | Rol: {user.role}</p>
          
          <div style={{ margin: '20px 0' }}>
            <h2>Dispositivos Conectados ({devices.length})</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              {devices.map((device) => (
                <div key={device.id} style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <h3>{device.nombre}</h3>
                    <span style={{ 
                      padding: '5px 10px', 
                      borderRadius: '15px', 
                      backgroundColor: device.estado === 'encendido' ? '#4CAF50' : '#f44336',
                      color: 'white',
                      fontSize: '12px'
                    }}>
                      {device.estado}
                    </span>
                  </div>
                  <p><strong>Tipo:</strong> {device.tipo}</p>
                  <p><strong>ID:</strong> {device.id}</p>
                  <p><strong>Ubicación:</strong> {device.ubicacion || 'No especificada'}</p>
                  
                  <div style={{ marginTop: '15px' }}>
                    <button 
                      onClick={() => toggleDevice(device.id, device.estado)}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: device.estado === 'encendido' ? '#f44336' : '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                      }}
                    >
                      {device.estado === 'encendido' ? 'Apagar' : 'Encender'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {devices.length === 0 && (
              <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                <p>No hay dispositivos conectados</p>
                <p>Los dispositivos aparecerán aquí cuando se conecten al sistema</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Devices; 