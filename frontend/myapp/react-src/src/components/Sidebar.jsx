import React, { useRef, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SidebarAnimationContext } from '../App';

function Sidebar({ fadeInSidebar }){
    const navigate = useNavigate();
    const location = useLocation();
    const prevPathRef = useRef();
    const { shouldAnimateSidebar, setShouldAnimateSidebar } = useContext(SidebarAnimationContext);
    // Guardar la ruta anterior
    React.useEffect(() => {
        prevPathRef.current = location.pathname;
    }, [location.pathname]);

    let shouldFade = false;
    if (fadeInSidebar && shouldAnimateSidebar) {
        shouldFade = true;
        // Reset después de usar
        setShouldAnimateSidebar(false);
    }

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

    const getIndicatorPosition = () => {
        switch(location.pathname) {
            case '/home': return '32%';
            case '/notifications': return '42%';
            case '/security': return '51%';
            case '/energy': return '59%';
            case '/settings': return '89%';
            default: return '32%';
        }
    };

    return (
        <motion.div 
            className="w-80 h-full relative pointer-events-none"
            initial={shouldFade ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            transition={{ duration: shouldFade ? 0.8 : 0 }}
        >
            {/* Indicador de sección activa */}
            <motion.div 
                className="w-65 h-[8%] left-0 absolute bg-zinc-100 rounded-tr-[50px] rounded-br-[50px] shadow-[0px_0px_30px_0px_rgba(0,0,0,0.25)]"
                initial={{ x: -100, opacity: 0 }}
                animate={{ 
                    x: 0, 
                    opacity: 1,
                    top: getIndicatorPosition()
                }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                    duration: 0.5
                }}
                layoutId="sidebarIndicator"
            />

            {/* Logo de la app */}
            <img 
                src="/logoazul.png" 
                alt="Logo Ctrl+Home" 
                className="w-30 h-30 min-w-30 left-[27%] top-7 absolute select-none object-contain" 
            />

            {/* Título */}
            <div className="left-[21%] top-[150px] absolute justify-start text-azul-2 text-3xl font-bold font-['Kantumruy Pro'] select-none">Ctrl+Home</div>

            {/* MENU DE NAVEGACIÓN */}
            {/*Home*/}
            <div className="w-65 h-[8%] top-[32%] left-0 absolute cursor-pointer pointer-events-auto" onClick={GoToHome}>
                <img src="/assets/icons/material-symbols_home-rounded.svg" alt="Home" className='w-7 h-7 left-10 top-1/2 transform -translate-y-1/2 absolute select-none'/>
                <div className="left-19 top-1/2 transform -translate-y-1/2 absolute justify-start text-neutral-700 text-xl font-normal font-['Lexend'] select-none">Inicio</div>
            </div>

            {/*Notificaciones*/}
            <div className="w-65 h-[8%] top-[42%] left-0 absolute cursor-pointer pointer-events-auto" onClick={GoToNotifications}>
                <img src="/assets/icons/mingcute_notification-fill.svg" alt="Notifications" className='w-7 h-8 left-10 top-1/2 transform -translate-y-1/2 absolute select-none'/>
                <div className="left-19 top-1/2 transform -translate-y-1/2 absolute justify-start text-neutral-700 text-xl font-normal font-['Lexend'] select-none">Notificaciones</div>
            </div>

            {/*Seguridad*/}
            <div className="w-65 h-[8%] top-[51%] left-0 absolute cursor-pointer pointer-events-auto" onClick={GoToSecurity}>
                <img src="/assets/icons/mdi_security-lock.svg" alt="Security" className='w-7 h-9 left-10 top-1/2 transform -translate-y-1/2 absolute select-none'/>
                <div className="left-19 top-1/2 transform -translate-y-1/2 absolute justify-start text-neutral-700 text-xl font-normal font-['Lexend'] select-none">Seguridad</div>
            </div>

            {/*Ahorro Energético*/}
            <div className="w-65 h-[8%] top-[59%] left-0 absolute cursor-pointer pointer-events-auto" onClick={GoToEnergy}>
                <img src="/assets/icons/ic_baseline-energy-savings-leaf.svg" alt="Energy" className='w-7 h-7 left-10 top-1/2 transform -translate-y-1/2 absolute select-none'/>
                <div className="left-19 top-1/2 transform -translate-y-1/2 absolute justify-start text-neutral-700 text-base font-normal font-['Lexend'] select-none">Ahorro <br/>Energético</div>
            </div>

            {/*Configuración*/}
            <div className="w-65 h-[8%] top-[89%] left-0 absolute cursor-pointer pointer-events-auto" onClick={GoToSettings}>
                <img src="/assets/icons/iconamoon_settings-fill.svg" alt="Settings" className='w-8 h-8 left-10 top-1/2 transform -translate-y-1/2 absolute select-none'/>
                <div className="left-19 top-1/2 transform -translate-y-1/2 absolute justify-start text-neutral-700 text-xl font-normal font-['Lexend'] select-none">Configuración</div>
            </div>
        </motion.div>
    );
};

export default Sidebar;
