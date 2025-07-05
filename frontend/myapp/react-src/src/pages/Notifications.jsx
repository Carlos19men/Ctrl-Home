import React from "react";
import Sidebar from "../components/Sidebar";
import Notification from "../components/Notification";
import { motion } from "framer-motion";

const Notifications = () => {
    const notifications = [
        {
            time: "02:15",
            title: "Alarma de humo activada",
            description: "Se activó la alarma de humo en la cocina. Verificar inmediatamente."
        },
        {
            time: "23:41",
            title: "Temperatura elevada",
            description: "La temperatura en la sala ha superado los 30°C."
        },
        {
            time: "21:32",
            title: "Movimiento detectado en el patio",
            description: "Se detectó movimiento en el patio trasero a las 3:15 AM."
        },
        {
            time: "15:32",
            title: "Puerta principal abierta",
            description: "Se detectó que la puerta principal ha estado abierta por más de 5 minutos."
        }
    ];

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
                    <h2 className="text-5xl font-bold text-neutral-700 mb-4 ml-2">Notificaciones</h2>
                </div>

                <div className="flex flex-col gap-8 ml-8 relative">
                    {notifications.map((notification, index) => (
                        <div key={index} className="relative">
                            {/* Línea conectora entre notificaciones */}
                            {index < notifications.length - 1 && (
                                <div className="absolute left-6 top-16 w-0.5 h-28 bg-gray-300 z-0"></div>
                            )}
                            
                            {/* Notificación con timeline integrado */}
                            <div className="relative z-10">
                                <Notification
                                    time={notification.time}
                                    title={notification.title}
                                    description={notification.description}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </motion.main>
        </div>
    );
};

export default Notifications;
