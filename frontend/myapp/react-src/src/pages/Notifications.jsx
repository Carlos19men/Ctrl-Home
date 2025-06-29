// src/pages/Notifications.jsx

import React from "react";
import Sidebar from "../components/Sidebar";
import Notification from "../components/Notification";
import { motion } from "framer-motion";

const Notifications = () => {
    return (
        <div className="App bg-azul-1 flex">
            <Sidebar />
            <motion.main
                className="w-[1247px] bg-zinc-100 rounded-tl-[50px] rounded-bl-[50px] shadow-[0px_0px_30px_0px_rgba(0,0,0,0.35)] min-h-screen p-8"
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
                <div className="mb-8">
                    <h2 className="text-4xl font-bold text-neutral-700 mb-4">Notificaciones</h2>
                    <p className="text-2xl text-neutral-700">Mantente al tanto de tus dispositivos.</p>
                </div>

                <div className="flex flex-col gap-4">
                    <Notification
                        title="Puerta principal abierta"
                        description="Se detectó que la puerta principal ha estado abierta por más de 5 minutos."
                    />
                    <Notification
                        title="Movimiento detectado en el patio"
                        description="Se detectó movimiento en el patio trasero a las 3:15 AM."
                    />
                    <Notification
                        title="Temperatura elevada"
                        description="La temperatura en la sala ha superado los 30°C."
                    />
                </div>
            </motion.main>
        </div>
    );
};

export default Notifications;
