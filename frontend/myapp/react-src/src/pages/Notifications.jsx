import React from "react";
import Sidebar from "../components/Sidebar";
import Notification from "../components/Notification";
import { motion } from "framer-motion";

const Notifications = () => {
    const notifications = [
        {
            date: "2025-07-05",
            time: "02:15",
            title: "Alarma de humo activada",
            description: "Se activó la alarma de humo en la cocina. Verificar inmediatamente."
        },
        {
            date: "2025-07-05",
            time: "23:41",
            title: "Temperatura elevada",
            description: "La temperatura en la sala ha superado los 30°C."
        },
        {
            date: "2025-07-04",
            time: "21:32",
            title: "Movimiento detectado en el patio",
            description: "Se detectó movimiento en el patio trasero a las 3:15 AM."
        },
        {
            date: "2025-07-04",
            time: "15:32",
            title: "Puerta principal abierta",
            description: "Se detectó que la puerta principal ha estado abierta por más de 5 minutos."
        },
        {
            date: "2025-07-03",
            time: "10:15",
            title: "Dispositivo desconectado",
            description: "El sensor de movimiento del garaje se ha desconectado."
        },
        {
            date: "2025-07-03",
            time: "08:30",
            title: "Batería baja",
            description: "La batería del sensor de temperatura está por agotarse."
        },
        {
            date: "2025-07-02",
            time: "19:10",
            title: "Ventana abierta",
            description: "La ventana del dormitorio principal está abierta."
        },
        {
            date: "2025-07-02",
            time: "17:45",
            title: "Nuevo usuario registrado",
            description: "Se ha registrado un nuevo usuario en el sistema."
        },
        {
            date: "2025-07-01",
            time: "12:30",
            title: "Actualización de firmware",
            description: "El dispositivo de seguridad ha actualizado su firmware."
        },
        {
            date: "2025-06-30",
            time: "22:00",
            title: "Corte de energía detectado",
            description: "Se detectó un corte de energía en la zona de la cocina."
        },
        {
            date: "2025-06-30",
            time: "09:20",
            title: "Sensor de puerta restablecido",
            description: "El sensor de la puerta principal ha sido restablecido."
        },
        {
            date: "2025-06-29",
            time: "14:05",
            title: "Movimiento en el garaje",
            description: "Se detectó movimiento en el garaje a las 14:05."
        },
        {
            date: "2025-06-29",
            time: "07:50",
            title: "Temperatura normalizada",
            description: "La temperatura en la sala ha vuelto a la normalidad."
        },
        {
            date: "2025-06-28",
            time: "18:30",
            title: "Puerta trasera cerrada",
            description: "La puerta trasera ha sido cerrada correctamente."
        },
        {
            date: "2025-06-28",
            time: "06:15",
            title: "Alarma desactivada",
            description: "La alarma de humo ha sido desactivada manualmente."
        }
    ];

    // Función para formatear la fecha
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        const beforeYesterday = new Date(today);
        beforeYesterday.setDate(beforeYesterday.getDate() - 2);

        if (date.toDateString() === today.toDateString()) {
            return "Hoy";
        } else if (date.toDateString() === yesterday.toDateString()) {
            return "Ayer";
        } else if (date.toDateString() === beforeYesterday.toDateString()) {
            return "Antes de ayer";
        } else {
            return date.toLocaleDateString('es-ES', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }
    };

    // Agrupar notificaciones por fecha
    const groupedNotifications = notifications.reduce((groups, notification) => {
        const date = notification.date;
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(notification);
        return groups;
    }, {});

    // Ordenar las fechas (más reciente primero)
    const sortedDates = Object.keys(groupedNotifications).sort((a, b) => new Date(b) - new Date(a));

    return (
        <div className="App bg-azul-1 flex">
            <Sidebar />
            <motion.main
                className="w-[1247px] bg-zinc-100 rounded-tl-[50px] rounded-bl-[50px] shadow-[0px_0px_30px_0px_rgba(0,0,0,0.35)] min-h-screen p-8 relative"
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

                <div className="flex flex-col gap-8 ml-16 relative max-h-[80vh] overflow-y-auto custom-scrollbar pr-4">
                    {sortedDates.map((date, dateIndex) => (
                        <div key={date} className="relative">
                            {/* Fecha pequeña y discreta al inicio del grupo */}
                            <div className="mb-2 ml-2">
                                <span className="text-sm text-neutral-500 font-medium capitalize">
                                    {formatDate(date)}
                                </span>
                            </div>

                            {/* Notificaciones del día */}
                            {groupedNotifications[date].map((notification, index) => (
                                <div key={`${date}-${index}`} className="relative mb-8">
                                    {/* Línea conectora entre notificaciones del mismo día */}
                                    {index < groupedNotifications[date].length - 1 && (
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
                    ))}
                </div>
            </motion.main>
        </div>
    );
};

export default Notifications;
