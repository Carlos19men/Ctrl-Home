import React from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import DeviceCard from '../components/DeviceCard';

const Home = () => {
  return (
    <div className="App">
      <Sidebar />
      <main className="main">
        <h1>¡Hola Petrolina!</h1>
        <p>Descubre el estado actual de tus dispositivos.</p>
        <div className="device-grid">
          <DeviceCard name="Cafetera Oster" room="Cocina" />
          <DeviceCard name="Bocina JBL" room="Sala de estar" status="65%" />
          <DeviceCard name="Lámpara PHILLIPS" room="Dormitorio" />
        </div>
        
      </main>
      <Topbar />
    </div>
  );
};

export default Home;
