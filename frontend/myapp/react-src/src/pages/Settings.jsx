import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { motion, AnimatePresence } from 'framer-motion';
import { Pencil, User, Image as ImageIcon, Languages, Globe, Bell, Volume2, BarChart2, RefreshCcw } from "lucide-react";
import CardSetting from "../components/CardSetting";

const Settings = () => {
    const [tab, setTab] = useState('General');
    const [notificaciones, setNotificaciones] = useState(true);
    const [resumenSemanal, setResumenSemanal] = useState(true);

    return (
        <div className="App bg-azul-1 flex">
            <Sidebar />
            <motion.main className="w-[1247px] bg-zinc-100 rounded-tl-[50px] rounded-bl-[50px] shadow-[0px_0px_30px_0px_rgba(0,0,0,0.35)] p-8" initial={{ x: '100%', opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: '100%', opacity: 0 }} transition={{ type: "spring", stiffness: 100, damping: 20, duration: 0.8 }}>
                <div className="mb-8">
                    <h2 className="text-5xl font-bold text-neutral-700 mb-4 ml-2">Configuración</h2>
                </div>
                <div className="flex items-center gap-6 mb-8 ml-10">
                    <div className="bg-azul-2 rounded-full w-48 h-48 flex items-center justify-center">
                    </div>
                    <div>
                        <h2 className="text-4xl font-bold text-neutral-700 mt-18">PETROLINA SINFOROSA <button><Pencil className="inline w-8 h-8 text-azul-2 ml-1 mb-1" /></button></h2>
                        <p className="text-xl text-neutral-600 mt-2">Administrador</p>
                        <div className="w-[700px] h-12 relative mt-8 ml-5">
                            {/* Fondo y bordes */}
                            <div className="w-[700px] h-12 left-0 top-0 absolute rounded-2xl shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] border border-black/50" />
                            {/* Rectángulo azul animado */}
                            <motion.div
                                layout
                                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                className="h-12 absolute bg-azul-2 z-10"
                                style={{
                                    width: '176px',
                                    left: tab === 'General' ? 0 : tab === 'Apariencia' ? 175 : tab === 'Miembros' ? 350 : 525,
                                    borderTopLeftRadius: tab === 'General' ? '1rem' : 0,
                                    borderBottomLeftRadius: tab === 'General' ? '1rem' : 0,
                                    borderTopRightRadius: tab === 'Seguridad' ? '1rem' : 0,
                                    borderBottomRightRadius: tab === 'Seguridad' ? '1rem' : 0,
                                }}
                            />
                            {/* Separadores grises, ocultos si la sección a la izquierda está activa */}
                            {tab !== 'General' && <div className="w-12 h-0 left-[175px] top-0 absolute origin-top-left rotate-90 border-t border-gray-300"></div>}
                            {tab !== 'Apariencia' && <div className="w-12 h-0 left-[350px] top-0 absolute origin-top-left rotate-90 border-t border-gray-300"></div>}
                            {tab !== 'Miembros' && <div className="w-12 h-0 left-[525px] top-0 absolute origin-top-left rotate-90 border-t border-gray-300"></div>}
                            {/* Textos de tabs */}
                            <button onClick={() => setTab('General')} className={`left-[50px] top-[12px] absolute text-xl font-normal font-['Lexend'] transition-colors duration-200 z-20 ${tab === 'General' ? 'text-white' : 'text-gray-900'}`}>General</button>
                            <button onClick={() => setTab('Apariencia')} className={`left-[210px] top-[12px] absolute text-xl font-normal font-['Lexend'] transition-colors duration-200 z-20 ${tab === 'Apariencia' ? 'text-white' : 'text-gray-900'}`}>Apariencia</button>
                            <button onClick={() => setTab('Miembros')} className={`left-[385px] top-[12px] absolute text-xl font-normal font-['Lexend'] transition-colors duration-200 z-20 ${tab === 'Miembros' ? 'text-white' : 'text-gray-900'}`}>Miembros</button>
                            <button onClick={() => setTab('Seguridad')} className={`left-[558px] top-[12px] absolute text-xl font-normal font-['Lexend'] transition-colors duration-200 z-20 ${tab === 'Seguridad' ? 'text-white' : 'text-gray-900'}`}>Seguridad</button>
                        </div>
                    </div>
                </div>
                <div className="p-2 min-h-[400px]">
                    <AnimatePresence mode="wait">
                        {tab === 'General' && (
                            <motion.div
                                key="General"
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -40 }}
                                transition={{ duration: 0.3 }}
                                className="w-full"
                            >
                                <h3 className="text-2xl font-semibold text-neutral-700 mb-2">General</h3>
                                <hr className="mb-4 border-zinc-200" />
                                <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto custom-scrollbar pr-2 pb-36">
                                    {/* Notificaciones generales */}
                                    <CardSetting
                                        icon={<Bell className="w-7 h-7 text-azul-2" />}
                                        title="Notificaciones generales"
                                        description="Activa o desactiva todas las notificaciones del sistema."
                                    >
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={notificaciones}
                                                onChange={() => setNotificaciones((v) => !v)}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 rounded-full transition-colors duration-300 peer-checked:bg-azul-2 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                                            <span className="ml-2 text-zinc-700">{notificaciones ? 'Activadas' : 'Desactivadas'}</span>
                                        </label>
                                    </CardSetting>
                                    {/* Resumen semanal del hogar */}
                                    <CardSetting
                                        icon={<BarChart2 className="w-7 h-7 text-azul-2" />}
                                        title="Resumen semanal del hogar"
                                        description="Recibe un resumen semanal de la actividad del hogar."
                                    >
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={resumenSemanal}
                                                onChange={() => setResumenSemanal((v) => !v)}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 rounded-full transition-colors duration-300 peer-checked:bg-azul-2 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                                            <span className="ml-2 text-zinc-700">{resumenSemanal ? 'Activado' : 'Desactivado'}</span>
                                        </label>
                                    </CardSetting>
                                    {/* Selección de idioma */}
                                    <CardSetting
                                        icon={<Languages className="w-7 h-7 text-azul-2" />}
                                        title="Idioma del sistema"
                                        description="Selecciona el idioma preferido para la interfaz."
                                    >
                                        <select className="border border-zinc-300 rounded-lg px-3 py-2">
                                            <option>Español</option>
                                            <option disabled>Próximamente más idiomas</option>
                                        </select>
                                    </CardSetting>
                                    {/* Zona horaria */}
                                    <CardSetting
                                        icon={<Globe className="w-7 h-7 text-azul-2" />}
                                        title="Zona horaria"
                                        description="Configura la zona horaria para los registros y notificaciones."
                                    >
                                        <select className="border border-zinc-300 rounded-lg px-3 py-2">
                                            <option>GMT-4 (Caracas)</option>
                                            <option>GMT-6 (CDMX)</option>
                                            <option>GMT-3 (Buenos Aires)</option>
                                            <option>GMT-5 (Bogotá)</option>
                                            <option>GMT+1 (Madrid)</option>
                                        </select>
                                    </CardSetting>
                                    {/* Sonido de alertas */}
                                    <CardSetting
                                        icon={<Volume2 className="w-7 h-7 text-azul-2" />}
                                        title="Sonido de alertas"
                                        description="Personaliza el tono y volumen de las alertas."
                                    >
                                        <select className="border border-zinc-300 rounded-lg px-3 py-2 mr-2">
                                            <option>Clásico</option>
                                            <option>Digital</option>
                                            <option>Campana</option>
                                        </select>
                                        <input type="range" min="0" max="100" defaultValue="70" className="accent-azul-2" />
                                    </CardSetting>
                                    {/* Restablecer configuraciones por defecto */}
                                    <CardSetting
                                        icon={<RefreshCcw className="w-7 h-7 text-azul-2" />}
                                        title="Restablecer configuraciones"
                                        description="Vuelve a los valores predeterminados del sistema."
                                        className="mt-20"
                                    >
                                        <button className="bg-azul-2 text-white px-4 py-2 rounded-lg hover:bg-azul-1 transition">Restablecer</button>
                                    </CardSetting>
                                </div>
                            </motion.div>
                        )}
                        {tab === 'Apariencia' && (
                            <motion.div
                                key="Apariencia"
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -40 }}
                                transition={{ duration: 0.3 }}
                                className="w-full"
                            >
                                <h3 className="text-2xl font-semibold text-neutral-700 mb-2">Apariencia</h3>
                                <hr className="mb-4 border-zinc-200" />
                                <div className="flex flex-col gap-4">
                                    <div className="bg-white rounded-xl p-6 shadow-sm" />
                                    <div className="bg-white rounded-xl p-6 shadow-sm" />
                                </div>
                            </motion.div>
                        )}
                        {tab === 'Miembros' && (
                            <motion.div
                                key="Miembros"
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -40 }}
                                transition={{ duration: 0.3 }}
                                className="w-full"
                            >
                                <h3 className="text-2xl font-semibold text-neutral-700 mb-2">Miembros</h3>
                                <hr className="mb-4 border-zinc-200" />
                                <div className="flex flex-col gap-4">
                                    <div className="bg-white rounded-xl p-6 shadow-sm" />
                                    <div className="bg-white rounded-xl p-6 shadow-sm" />
                                </div>
                            </motion.div>
                        )}
                        {tab === 'Seguridad' && (
                            <motion.div
                                key="Seguridad"
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -40 }}
                                transition={{ duration: 0.3 }}
                                className="w-full"
                            >
                                <h3 className="text-2xl font-semibold text-neutral-700 mb-2">Seguridad</h3>
                                <hr className="mb-4 border-zinc-200" />
                                <div className="flex flex-col gap-4">
                                    <div className="bg-white rounded-xl p-6 shadow-sm" />
                                    <div className="bg-white rounded-xl p-6 shadow-sm" />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
        
            </motion.main>
        </div>
    );
}

export default Settings;