import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { motion, AnimatePresence } from 'framer-motion';
import { Pencil } from "lucide-react";

const Settings = () => {
    const [tab, setTab] = useState('General');

    return (
        <div className="App bg-azul-1 flex">
            <Sidebar />
            <motion.main className="w-[1247px] bg-zinc-100 rounded-tl-[50px] rounded-bl-[50px] shadow-[0px_0px_30px_0px_rgba(0,0,0,0.35)] p-8" initial={{ x: '100%', opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: '100%', opacity: 0 }} transition={{ type: "spring", stiffness: 100, damping: 20, duration: 0.8 }}>
                <div className="mb-8">
                    <h2 className="text-5xl font-bold text-neutral-700 mb-4 ml-2">Configuración</h2>
                </div>
                <div className="flex items-center gap-6 mb-8">
                    <div className="bg-azul-2 rounded-full w-24 h-24 flex items-center justify-center">
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-neutral-700">PETROLINA SINFOROSA <button><Pencil className="inline w-4 h-4 text-azul-1 ml-1" /></button></h2>
                        <p className="text-sm text-neutral-600">Administrador</p>
                        <div className="w-[700px] h-12 relative mt-4">
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
                <div className="p-6 min-h-[400px]">
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
                                <div className="flex flex-col gap-4">
                                    <div className="bg-white rounded-xl p-6 shadow-sm" />
                                    <div className="bg-white rounded-xl p-6 shadow-sm" />
                                    <div className="bg-white rounded-xl p-6 shadow-sm" />
                                    <div className="bg-white rounded-xl p-6 shadow-sm" />
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
                                className="w-full max-w-xl h-48 bg-zinc-200 rounded-md"
                            />
                        )}
                        {tab === 'Miembros' && (
                            <motion.div
                                key="Miembros"
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -40 }}
                                transition={{ duration: 0.3 }}
                                className="w-full max-w-xl h-48 bg-zinc-200 rounded-md"
                            />
                        )}
                        {tab === 'Seguridad' && (
                            <motion.div
                                key="Seguridad"
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -40 }}
                                transition={{ duration: 0.3 }}
                                className="w-full max-w-xl h-48 bg-zinc-200 rounded-md"
                            />
                        )}
                    </AnimatePresence>
                </div>
        
            </motion.main>
        </div>
    );
}

export default Settings;