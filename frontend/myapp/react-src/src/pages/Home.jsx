import React from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import DeviceCard from '../components/DeviceCard';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const handletologin = () => {
    navigate('/');
    };
  return (
    <div className="App">
      <Sidebar />
      <main className="main">
        <h1>¡Hola Petrolina!</h1>
        <p>Descubre el estado actual de tus dispositivos.</p>
        <div className="device-grid">
          <DeviceCard name="Cafetera Oster" room="Cocina"/>
          <DeviceCard name="Bocina JBL" room="Sala de estar" status="65%" />
          <DeviceCard name="Lámpara PHILLIPS" room="Dormitorio" />
          <button
          className="w-80 h-18 left-1/2 transform -translate-x-1/2 top-[48%] absolute rounded-2xl z-10 focus:outline-none transition duration-150 cursor-pointer shadow-[0px_0px_8px_0px_rgba(0,0,0,0.25)] active:ring-4 active:ring-blue-300"
        style={{ backgroundColor: '#295AA8' }}
        onClick={handletologin}
        type="button"
        >ir a login lpm</button>
        </div>
        
      </main>
      <Topbar />
    </div>
  );
};
export default Home;
