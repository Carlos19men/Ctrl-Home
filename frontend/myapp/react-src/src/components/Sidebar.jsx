import React from 'react';
import { Home, Bell, Shield, Zap, Settings } from 'lucide-react'; // o los íconos que uses

const Sidebar = () => {
  return (
    <div className="w-72 h-[918px] relative">
    <div className="w-72 h-16 left-0 top-[297px] absolute bg-zinc-100 rounded-tr-[50px] rounded-br-[50px] shadow-[0px_0px_30px_0px_rgba(0,0,0,0.25)]" />
    <div className="w-10 h-10 left-[32px] top-[313px] absolute overflow-hidden">
        <div className="w-7 h-7 left-[6.67px] top-[5.83px] absolute bg-blue-800" />
    </div>
    <div className="w-10 h-10 left-[32px] top-[397px] absolute overflow-hidden">
        <div className="w-[1.39px] h-px left-[20.13px] top-[38.57px] absolute" />
        <div className="w-7 h-8 left-[5.10px] top-[3.33px] absolute bg-blue-800" />
    </div>
    <div className="w-10 h-10 left-[32px] top-[481px] absolute overflow-hidden">
        <div className="w-7 h-9 left-[5px] top-[1.67px] absolute bg-blue-800" />
    </div>
    <div className="w-10 h-10 left-[32px] top-[565px] absolute overflow-hidden">
        <div className="w-7 h-7 left-[5px] top-[5px] absolute bg-blue-800" />
    </div>
    <div className="w-10 h-10 left-[32px] top-[878px] absolute overflow-hidden">
        <div className="w-8 h-8 left-[4px] top-[3.33px] absolute bg-blue-800" />
    </div>
    <div className="left-[84px] top-[150px] absolute justify-start text-blue-800 text-3xl font-bold font-['Kantumruy Pro']">Ctrl+Home</div>
    <div className="left-[75px] top-[320px] absolute justify-start text-neutral-700 text-xl font-normal font-['Lexend']">Inicio</div>
    <div className="left-[75px] top-[404px] absolute justify-start text-neutral-700 text-xl font-normal font-['Lexend']">Notificaciones</div>
    <div className="left-[75px] top-[488px] absolute justify-start text-neutral-700 text-xl font-normal font-['Lexend']">Seguridad</div>
    <div className="left-[75px] top-[885px] absolute justify-start text-neutral-700 text-xl font-normal font-['Lexend']">Configuración</div>
    <div className="left-[75px] top-[565px] absolute justify-start text-neutral-700 text-base font-normal font-['Lexend']">Ahorro <br/>Energético</div>
</div>
  );
};

export default Sidebar;
