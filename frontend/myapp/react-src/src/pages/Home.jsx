import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import DeviceCard from '../components/DeviceCard';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState('favoritos');

  const handletologin = () => {
    navigate('/');
  };

  const renderSectionContent = () => {
    switch(currentSection) {
      case 'favoritos':
        return (
          <div className="mt-20 ml-8 px-12">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-5xl font-bold text-neutral-700 mb-6 font-['Kantumruy Pro']">¡HOLA PETROLINA!</h2>
                <p className="text-3xl text-neutral-700 font-['Lexend']">Descubre el estado actual de tus dispositivos.</p>
              </div>
              <div className="text-right">
                <p className="text-3xl text-neutral-700 font-['Lexend'] mb-2">17:53pm</p>
                <p className="text-2xl text-neutral-700 font-light font-['Lexend']">15/06/25</p>
              </div>
            </div>
            <div className="device-grid mt-12">
              <DeviceCard name="Cafetera Oster" room="Cocina"/>
              <DeviceCard name="Bocina JBL" room="Sala de estar" status="65%" />
              <DeviceCard name="Lámpara PHILLIPS" room="Dormitorio" />
            </div>
          </div>
        );
      
      case 'sala':
        return (
          <div className="mt-20 ml-8 px-12">
            <h2 className="text-4xl font-bold text-neutral-700 mb-6">Sala de Estar</h2>
            <p className="text-2xl text-neutral-700 mb-12">Gestiona los dispositivos de tu sala</p>
            <div className="device-grid">
              <DeviceCard name="Smart TV Samsung" room="Sala de estar" />
              <DeviceCard name="Bocina JBL" room="Sala de estar" status="65%" />
              <DeviceCard name="Lámpara de pie" room="Sala de estar" />
              <DeviceCard name="Ventilador de techo" room="Sala de estar" />
            </div>
          </div>
        );

      case 'cocina':
        return (
          <div className="mt-20 ml-8 px-12">
            <h2 className="text-4xl font-bold text-neutral-700 mb-6">Cocina</h2>
            <p className="text-2xl text-neutral-700 mb-12">Controla tus electrodomésticos</p>
            <div className="device-grid">
              <DeviceCard name="Cafetera Oster" room="Cocina" />
              <DeviceCard name="Microondas" room="Cocina" />
              <DeviceCard name="Refrigerador" room="Cocina" />
              <DeviceCard name="Lavavajillas" room="Cocina" />
            </div>
          </div>
        );

      case 'dormitorio':
        return (
          <div className="mt-20 ml-8 px-12">
            <h2 className="text-4xl font-bold text-neutral-700 mb-6">Dormitorio</h2>
            <p className="text-2xl text-neutral-700 mb-12">Configura el ambiente perfecto para descansar</p>
            <div className="device-grid">
              <DeviceCard name="Aire Acondicionado" room="Dormitorio" />
              <DeviceCard name="Lámpara PHILLIPS" room="Dormitorio" />
              <DeviceCard name="TV Dormitorio" room="Dormitorio" />
              <DeviceCard name="Persiana Inteligente" room="Dormitorio" />
            </div>
          </div>
        );

      case 'vermas':
        return (
          <div className="mt-20 ml-8 h-[calc(100vh-250px)] px-12">
            <h2 className="text-4xl font-bold text-neutral-700 mb-6">Otros Espacios</h2>
            <p className="text-2xl text-neutral-700 mb-12">Explora todos tus dispositivos conectados</p>
            <div className="overflow-y-auto h-full scrollbar-hide">
              <div className="grid grid-cols-2 gap-8 pr-4">
                <div className="p-6 bg-white rounded-xl shadow-md">
                  <h3 className="text-2xl font-semibold mb-4">Baño</h3>
                  <div className="space-y-4">
                    <DeviceCard name="Calentador Inteligente" room="Baño" />
                    <DeviceCard name="Luz Principal" room="Baño" />
                    <DeviceCard name="Espejo Inteligente" room="Baño" />
                  </div>
                </div>
                <div className="p-6 bg-white rounded-xl shadow-md">
                  <h3 className="text-2xl font-semibold mb-4">Jardín</h3>
                  <div className="space-y-4">
                    <DeviceCard name="Sistema de Riego" room="Jardín" />
                    <DeviceCard name="Luces Exteriores" room="Jardín" />
                    <DeviceCard name="Sensor de Movimiento" room="Jardín" />
                  </div>
                </div>
                <div className="p-6 bg-white rounded-xl shadow-md">
                  <h3 className="text-2xl font-semibold mb-4">Garaje</h3>
                  <div className="space-y-4">
                    <DeviceCard name="Puerta Automática" room="Garaje" />
                    <DeviceCard name="Cámara de Seguridad" room="Garaje" />
                    <DeviceCard name="Sensor de CO2" room="Garaje" />
                  </div>
                </div>
                <div className="p-6 bg-white rounded-xl shadow-md">
                  <h3 className="text-2xl font-semibold mb-4">Lavandería</h3>
                  <div className="space-y-4">
                    <DeviceCard name="Lavadora Smart" room="Lavandería" />
                    <DeviceCard name="Secadora Inteligente" room="Lavandería" />
                    <DeviceCard name="Plancha Automática" room="Lavandería" />
                  </div>
                </div>
                <div className="p-6 bg-white rounded-xl shadow-md">
                  <h3 className="text-2xl font-semibold mb-4">Oficina</h3>
                  <div className="space-y-4">
                    <DeviceCard name="Computadora" room="Oficina" />
                    <DeviceCard name="Impresora WiFi" room="Oficina" />
                    <DeviceCard name="Lámpara de Escritorio" room="Oficina" />
                  </div>
                </div>
                <div className="p-6 bg-white rounded-xl shadow-md">
                  <h3 className="text-2xl font-semibold mb-4">Gimnasio</h3>
                  <div className="space-y-4">
                    <DeviceCard name="Caminadora" room="Gimnasio" />
                    <DeviceCard name="Ventilador" room="Gimnasio" />
                    <DeviceCard name="Sistema de Audio" room="Gimnasio" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="App">
      <Sidebar />
      <main className="w-[1247px] bg-zinc-100 rounded-tl-[50px] rounded-bl-[50px] shadow-[0px_0px_30px_0px_rgba(0,0,0,0.35)]">
        <div className="p-5">
          <div className="flex justify-between items-center mt-5">
            <Topbar onSectionChange={setCurrentSection} />
            {/*Para simular la foto de perfil del usuario */}
            <div className="w-14 h-14 rounded-full bg-blue-800 flex items-center justify-center text-white text-xl font-bold mr-25 mt-2"></div>
          </div>

          {renderSectionContent()}
        </div>
      </main>
    </div>
  );
}

// Agregar estilos para ocultar la barra de scroll
const style = document.createElement('style');
style.textContent = `
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
`;
document.head.appendChild(style);

export default Home;
