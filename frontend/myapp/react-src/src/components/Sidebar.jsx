import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Sidebar(){
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path;
    };

    const GoToHome = () => {
        navigate('/home');
    }
    const GoToNotifications = () => {
        navigate('/notifications');
    }
    const GoToSecurity = () => {
        navigate('/security');
    }
    const GoToEnergy = () => {
        navigate('/energy');
    }
    const GoToSettings = () => {
        navigate('/settings');
    }

    return (
        <div className="w-72 h-[918px] relative">
            {/* Indicador de sección activa */}
            {isActive('/home') && (
                <div className="w-65 h-16 left-0 top-[297px] absolute bg-zinc-100 rounded-tr-[50px] rounded-br-[50px] shadow-[0px_0px_30px_0px_rgba(0,0,0,0.25)]" />
            )}
            {isActive('/notifications') && (
                <div className="w-65 h-16 left-0 top-[381px] absolute bg-zinc-100 rounded-tr-[50px] rounded-br-[50px] shadow-[0px_0px_30px_0px_rgba(0,0,0,0.25)]" />
            )}
            {isActive('/security') && (
                <div className="w-65 h-16 left-0 top-[465px] absolute bg-zinc-100 rounded-tr-[50px] rounded-br-[50px] shadow-[0px_0px_30px_0px_rgba(0,0,0,0.25)]" />
            )}
            {isActive('/energy') && (
                <div className="w-65 h-16 left-0 top-[549px] absolute bg-zinc-100 rounded-tr-[50px] rounded-br-[50px] shadow-[0px_0px_30px_0px_rgba(0,0,0,0.25)]" />
            )}
            {isActive('/settings') && (
                <div className="w-65 h-16 left-0 top-[862px] absolute bg-zinc-100 rounded-tr-[50px] rounded-br-[50px] shadow-[0px_0px_30px_0px_rgba(0,0,0,0.25)]" />
            )}

            {/* Título */}
            <div className="left-[21%] top-[150px] absolute justify-start text-blue-800 text-3xl font-bold font-['Kantumruy Pro']">Ctrl+Home</div>

            {/* Menú de navegación */}
            <div className="w-10 h-10 left-[32px] top-[308px] absolute overflow-hidden cursor-pointer" onClick={GoToHome}>
                <img src="/assets/icons/material-symbols_home-rounded.svg" alt="Home" className="w-7 h-7 left-[6.67px] top-[5.83px] absolute" />
            </div>
            <div className="left-[75px] top-[315px] absolute justify-start text-neutral-700 text-xl font-normal font-['Lexend'] cursor-pointer" onClick={GoToHome}>Inicio</div>

            <div className="w-10 h-10 left-[32px] top-[397px] absolute overflow-hidden cursor-pointer" onClick={GoToNotifications}>
                <img src="/assets/icons/mingcute_notification-fill.svg" alt="Notifications" className="w-7 h-8 left-[5.10px] top-[3.33px] absolute" />
            </div>
            <div className="left-[75px] top-[400px] absolute justify-start text-neutral-700 text-xl font-normal font-['Lexend'] cursor-pointer" onClick={GoToNotifications}>Notificaciones</div>

            <div className="w-10 h-10 left-[32px] top-[481px] absolute overflow-hidden cursor-pointer" onClick={GoToSecurity}>
                <img src="/assets/icons/mdi_security-lock.svg" alt="Security" className="w-7 h-9 left-[5px] top-[1.67px] absolute" />
            </div>
            <div className="left-[75px] top-[485px] absolute justify-start text-neutral-700 text-xl font-normal font-['Lexend'] cursor-pointer" onClick={GoToSecurity}>Seguridad</div>

            <div className="w-10 h-10 left-[32px] top-[565px] absolute overflow-hidden cursor-pointer" onClick={GoToEnergy}>
                <img src="/assets/icons/ic_baseline-energy-savings-leaf.svg" alt="Energy" className="w-7 h-7 left-[5px] top-[5px] absolute" />
            </div>
            <div className="left-[75px] top-[558px] absolute justify-start text-neutral-700 text-base font-normal font-['Lexend'] cursor-pointer" onClick={GoToEnergy}>Ahorro <br/>Energético</div>

            <div className="w-10 h-10 left-[32px] top-[718px] absolute overflow-hidden cursor-pointer" onClick={GoToSettings}>
                <img src="/assets/icons/iconamoon_settings-fill.svg" alt="Settings" className="w-8 h-8 left-[4px] top-[3.33px] absolute" />
            </div>
            <div className="left-[75px] top-[725px] absolute justify-start text-neutral-700 text-xl font-normal font-['Lexend'] cursor-pointer" onClick={GoToSettings}>Configuración</div>
        </div>
    );
};

export default Sidebar;
