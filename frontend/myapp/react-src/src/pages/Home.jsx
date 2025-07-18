import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import DeviceCard from '../components/DeviceCard';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function Home() {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState('favoritos');
  const [currentTime, setCurrentTime] = useState(new Date());
  // Obtener el nombre del usuario desde localStorage
  const userName = (localStorage.getItem('user_name') || 'PETROLINA').toUpperCase();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).toLowerCase();
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    });
  };

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
                <h2 className="text-5xl font-bold text-neutral-700 mb-6 font-['Kantumruy Pro']">¡HOLA {userName}!</h2>
                <p className="text-3xl text-neutral-700 font-['Lexend']">Descubre el estado actual de tus dispositivos.</p>
              </div>
              <div className="text-right">
                <p className="text-3xl text-neutral-700 font-['Lexend'] mb-2">{formatTime(currentTime)}</p>
                <p className="text-2xl text-neutral-700 font-light font-['Lexend']">{formatDate(currentTime)}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6 mt-12">
              <DeviceCard name="Luz Principal" room="Sala de estar" ledId={10}/>
              <DeviceCard name="Luz Principal" room="Cocina" ledId={2}/>
              <DeviceCard name="Luz Principal" room="Dormitorio" ledId={3}/>
              <DeviceCard name="Luz Ambiente" room="Dormitorio" ledId={4}/>
            </div>
          </div>
        );
      
      case 'sala':
        return (
          <div className="mt-20 ml-8 px-12">
            <h2 className="text-4xl font-bold text-neutral-700 mb-6">Sala de Estar</h2>
            <p className="text-2xl text-neutral-700 mb-12">Gestiona los dispositivos de tu sala</p>
            <div className="grid grid-cols-3 gap-6">
              <DeviceCard name="Luz Principal" room="Sala de estar" ledId={10}/>
              <DeviceCard name="Ventilador de techo" room="Sala de estar" />
            </div>
          </div>
        );

      case 'cocina':
        return (
          <div className="mt-20 ml-8 px-12">
            <h2 className="text-4xl font-bold text-neutral-700 mb-6">Cocina</h2>
            <p className="text-2xl text-neutral-700 mb-12">Controla tus electrodomésticos</p>
            <div className="grid grid-cols-3 gap-6">
              <DeviceCard name="Luz Principal" room="Cocina" ledId={2}/>
              <DeviceCard name="Microondas" room="Cocina" />
              <DeviceCard name="Refrigerador" room="Cocina" />
            </div>
          </div>
        );

      case 'dormitorio':
        return (
          <div className="mt-20 ml-8 px-12">
            <h2 className="text-4xl font-bold text-neutral-700 mb-6">Dormitorio</h2>
            <p className="text-2xl text-neutral-700 mb-12">Configura el ambiente perfecto para descansar</p>
            <div className="grid grid-cols-3 gap-6">
              <DeviceCard name="Luz Principal" room="Dormitorio" ledId={3}/>
              <DeviceCard name="Luz Ambiente" room="Dormitorio" ledId={4}/>
              <DeviceCard name="Aire Acondicionado" room="Dormitorio" />
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
    <div className="App bg-azul-1">
      <Sidebar fadeInSidebar />
      <motion.main 
        className="w-[1247px] bg-zinc-100 rounded-tl-[50px] rounded-bl-[50px] shadow-[0px_0px_30px_0px_rgba(0,0,0,0.35)] relative"
        initial={{ x: '100%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '100%', opacity: 0 }}
        transition={{ 
          type: "spring",
          stiffness: 100,
          damping: 20,
          duration: 0.8
        }}
      >
        <div className="p-5">
          <div className="flex justify-between items-center mt-5">
            <Topbar onSectionChange={setCurrentSection} />
            {/*Para simular la foto de perfil del usuario */}
            <div className="w-14 h-14 rounded-full bg-azul-2 flex items-center justify-center text-white text-xl font-bold mr-25 mt-2"></div>
          </div>

          {renderSectionContent()}
        </div>
      </motion.main>
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
