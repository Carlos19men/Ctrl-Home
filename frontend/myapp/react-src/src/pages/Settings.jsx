import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { motion } from 'framer-motion';
import { Pencil } from "lucide-react";

const Settings = () => {
    const [tab, setTab] = useState('General');

    return (
        <div className="App bg-azul-1 flex">
            <Sidebar />
            <motion.main className="w-[1247px] bg-zinc-100 rounded-tl-[50px] rounded-bl-[50px] shadow-[0px_0px_30px_0px_rgba(0,0,0,0.35)] p-8" initial={{ x: '100%', opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: '100%', opacity: 0 }} transition={{ type: "spring", stiffness: 100, damping: 20, duration: 0.8 }}>
                <div className="flex items-center gap-6 mb-8">
                    <div className="bg-white rounded-full p-4 border-4 border-azul-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-azul-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5a8.25 8.25 0 1115 0v.75a.75.75 0 01-.75.75h-13.5a.75.75 0 01-.75-.75V19.5z" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-neutral-700">PETROLINA SINFOROSA <button><Pencil className="inline w-4 h-4 text-azul-1 ml-1" /></button></h2>
                        <p className="text-sm text-neutral-600">Administrador</p>
                        <div className="flex gap-2 mt-4">
                            {['General', 'Apariencia', 'Miembros', 'Seguridad'].map((item) => (
                                <button key={item} onClick={() => setTab(item)} className={`px-4 py-2 rounded-md text-sm font-medium ${tab === item ? 'bg-azul-1 text-white' : 'bg-white text-neutral-700 border'}`}>
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow p-6 min-h-[400px] flex flex-col justify-center items-center">
                    {tab === 'General' && (<div className="w-full max-w-xl space-y-4"><div className="h-12 bg-zinc-200 rounded-md w-full" /><div className="h-12 bg-zinc-200 rounded-md w-full" /><div className="h-12 bg-zinc-200 rounded-md w-full" /><div className="h-12 bg-zinc-200 rounded-md w-full" /></div>)}
                    {tab === 'Apariencia' && (<div className="w-full max-w-xl h-48 bg-zinc-200 rounded-md" />)}
                    {tab === 'Miembros' && (<div className="w-full max-w-xl h-48 bg-zinc-200 rounded-md" />)}
                    {tab === 'Seguridad' && (<div className="w-full max-w-xl h-48 bg-zinc-200 rounded-md" />)}
                </div>
            </motion.main>
        </div>
    );
}

export default Settings;