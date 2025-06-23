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
      <main className="w-[1118px] bg-zinc-100 rounded-tl-[50px] rounded-bl-[50px] shadow-[0px_0px_30px_0px_rgba(0,0,0,0.25)]">
        <Topbar />
        <div className="w-20 h-20 relative overflow-hidden">
          <div className="w-6 h-6 left-[25px] top-[15.62px] absolute bg-blue-800" />
          <div className="w-16 h-16 left-[3.12px] top-[3.12px] absolute bg-blue-800" />
        </div>
        <div className="w-[706px] h-24 relative">
          <div className="left-0 top-0 absolute justify-start text-neutral-700 text-5xl font-bold font-['Kantumruy Pro']">HOLA PETROLINA!</div>
          <div className="left-0 top-[55px] absolute justify-start text-neutral-700 text-3xl font-normal font-['Lexend']">Descubre el estado actual de tus dispositivos.</div>
          <div className="left-[867px] top-[8px] absolute justify-start text-neutral-700 text-3xl font-normal font-['Lexend']">17:53pm</div>
          <div className="left-[889px] top-[48px] absolute justify-start text-neutral-700 text-2xl font-light font-['Lexend']">15/06/25</div>
        </div>
        <div className="device-grid">
          {/*<DeviceCard name="Cafetera Oster" room="Cocina"/>
          <DeviceCard name="Bocina JBL" room="Sala de estar" status="65%" />
          <DeviceCard name="Lámpara PHILLIPS" room="Dormitorio" />
          
         <button
            className="w-80 h-18 left-1/2 transform -translate-x-1/2 top-[48%] absolute rounded-2xl z-10 focus:outline-none transition duration-150 cursor-pointer shadow-[0px_0px_8px_0px_rgba(0,0,0,0.25)] active:ring-4 active:ring-blue-300"
            style={{ backgroundColor: '#295AA8' }}
            onClick={handletologin}
            type="button">ir a login lpm</button>*/}
        </div>
        
      </main>
      
    </div>
  );
};
export default Home;
