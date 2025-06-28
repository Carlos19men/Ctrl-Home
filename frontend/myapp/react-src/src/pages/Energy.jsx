import React from 'react';
import Sidebar from '../components/Sidebar';
import { motion } from 'framer-motion';

const Energy = () => {
    return (
        <div className="App bg-azul-1">
            <Sidebar />
            <motion.main 
                className="w-[1247px] bg-zinc-100 rounded-tl-[50px] rounded-bl-[50px] shadow-[0px_0px_30px_0px_rgba(0,0,0,0.35)]"
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
                <div className="p-8">
                    <h2 className="text-4xl font-bold text-neutral-700 mb-6">Ahorro Energético</h2>
                    <p className="text-2xl text-neutral-700">Optimiza el consumo de energía de tu hogar.</p>
                </div>
            </motion.main>
        </div>
    );
}

export default Energy;