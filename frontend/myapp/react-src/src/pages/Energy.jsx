import React, { useRef, useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Notification from '../components/Notification';
import { motion } from 'framer-motion';

const Energy = () => {
    const contenedorRef = useRef(null);
    const innerRef = useRef(null);
    const textoHoyRef = useRef(null);
    const totalRef = useRef(null);
    const habitacionesRef = useRef(null);
    const [circleSize, setCircleSize] = useState(0);
    const [fontSizeHoy, setFontSizeHoy] = useState(32);
    const [fontSizeTotal, setFontSizeTotal] = useState(16);
    const [fontSizeHabitaciones, setFontSizeHabitaciones] = useState(14);

    // Datos dinámicos de consumo por habitación
    const habitaciones = [
        { nombre: 'Sala de\nEstar', consumo: 8592 },
        { nombre: 'Cocina', consumo: 17184 },
        { nombre: 'Dormitorio', consumo: 21480 },
        { nombre: 'Otros', consumo: 12888 }
    ];

    // Calcular el consumo actual como la suma de todas las habitaciones
    const consumoActual = habitaciones.reduce((sum, h) => sum + h.consumo, 0);
    const consumoTotal = 80192;
    
    // Calcular el porcentaje limitado al 100% máximo
    const porcentajeCalculado = Math.round((consumoActual / consumoTotal) * 100);
    const porcentaje = Math.min(porcentajeCalculado, 100);
    
    // Determinar si se ha superado el límite diario
    const limiteSuperado = consumoActual > consumoTotal;

    // Calcular el valor máximo para normalizar las barras (la habitación con mayor consumo)
    const maxConsumo = Math.max(...habitaciones.map(h => h.consumo));
    const minConsumo = Math.min(...habitaciones.map(h => h.consumo));

    // Calcular alturas de barras (normalizadas al 100%)
    const barras = habitaciones.map(habitacion => ({
        ...habitacion,
        altura: (habitacion.consumo / maxConsumo) * 100
    }));

    // Calcular el total de consumo por habitación
    const totalConsumoHabitaciones = habitaciones.reduce((sum, h) => sum + h.consumo, 0);

    // Notificaciones relacionadas con energía
    const energyNotifications = [
        {
            date: "2025-01-15",
            time: "14:30",
            title: "Consumo energético elevado",
            description: "El consumo en el dormitorio ha superado el 80% del límite diario establecido."
        },
        {
            date: "2025-01-15",
            time: "12:15",
            title: "Dispositivo de alto consumo detectado",
            description: "Se detectó un dispositivo consumiendo 2.5kW en la cocina. Verificar si es necesario."
        },
        {
            date: "2025-01-15",
            time: "10:45",
            title: "Eficiencia energética mejorada",
            description: "El sistema de iluminación automática ha reducido el consumo en un 15% esta mañana."
        },
        {
            date: "2025-01-14",
            time: "23:20",
            title: "Modo ahorro activado",
            description: "El sistema ha activado automáticamente el modo ahorro de energía durante la noche."
        },
        {
            date: "2025-01-14",
            time: "20:15",
            title: "Temperatura del refrigerador optimizada",
            description: "La temperatura del refrigerador se ha ajustado automáticamente para optimizar el consumo."
        },
        {
            date: "2025-01-14",
            time: "18:30",
            title: "Panel solar funcionando al 95%",
            description: "Los paneles solares están generando energía al 95% de su capacidad máxima."
        }
    ];

    // Función para formatear la fecha
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (date.toDateString() === today.toDateString()) {
            return "Hoy";
        } else if (date.toDateString() === yesterday.toDateString()) {
            return "Ayer";
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
    const groupedNotifications = energyNotifications.reduce((groups, notification) => {
        const date = notification.date;
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(notification);
        return groups;
    }, {});

    // Ordenar las fechas (más reciente primero)
    const sortedDates = Object.keys(groupedNotifications).sort((a, b) => new Date(b) - new Date(a));

    useEffect(() => {
        function updateSize() {
            if (innerRef.current) {
                const { offsetWidth, offsetHeight } = innerRef.current;
                setCircleSize(Math.min(offsetWidth, offsetHeight));
            }
            if (textoHoyRef.current) {
                const width = textoHoyRef.current.offsetWidth;
                setFontSizeHoy(width * 0.05); // Ajusta el factor si lo deseas
            }
            if (totalRef.current) {
                const width = totalRef.current.offsetWidth;
                setFontSizeTotal(width * 0.03); // Factor más pequeño para el texto del total
            }
            if (habitacionesRef.current) {
                const width = habitacionesRef.current.offsetWidth;
                setFontSizeHabitaciones(width * 0.04); // Factor para los nombres de habitaciones
            }
        }
        updateSize();
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    return (
        <div className="App bg-azul-1">
            <Sidebar />
            <motion.div 
                className="w-[1247px] bg-zinc-100 rounded-tl-[50px] rounded-bl-[50px] shadow-[0px_0px_30px_0px_rgba(0,0,0,0.35)] relative"
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
                {/* Titulo */}
                <div className="left-[5%] top-[8%] absolute justify-start text-neutral-700 text-5xl font-bold font-secondary">AHORRO ENERGÉTICO</div>
                
                {/* Consumo Energetico Hoy */}
                <div className='w-[44%] h-[49%] left-[5%] top-[18%] absolute bg-zinc-100 rounded-2xl shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)]'>
                    <div ref={innerRef} className='w-[58%] h-[64%] left-1/2 transform -translate-x-1/2 top-[9%] absolute'>
                        {/* Circular Progress SVG */}
                        <svg 
                            width={circleSize} 
                            height={circleSize} 
                            className='left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 absolute'
                            style={{ position: 'absolute' }}
                        >
                            <circle
                                cx={circleSize / 2}
                                cy={circleSize / 2}
                                r={(circleSize / 2) - 10}
                                stroke="var(--clr-azul-1)"
                                strokeWidth="10"
                                fill="none"
                            />
                            <circle
                                cx={circleSize / 2}
                                cy={circleSize / 2}
                                r={(circleSize / 2) - 10}
                                stroke={limiteSuperado ? "#ef4444" : "var(--clr-azul-2)"}
                                strokeWidth="10"
                                fill="none"
                                strokeDasharray={2 * Math.PI * ((circleSize / 2) - 10)}
                                strokeDashoffset={2 * Math.PI * ((circleSize / 2) - 10) * (1 - porcentaje / 100)}
                                strokeLinecap="round"
                                transform={`rotate(-90 ${circleSize / 2} ${circleSize / 2})`}
                                style={{ transition: 'stroke-dashoffset 0.5s, stroke 0.3s' }}
                            />
                        </svg>
                        <span
                            className="left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 absolute justify-start text-gray-900 font-bold font-secondary"
                            style={{
                                pointerEvents: 'none',
                                fontSize: circleSize * 0.28,
                                lineHeight: 1,
                            }}
                        >
                            {porcentajeCalculado}%
                        </span>
                    </div>
                    <div
                        ref={textoHoyRef}
                        className="w-full left-1/2 transform -translate-x-1/2 bottom-[5%] absolute text-center justify-start"
                        style={{ fontSize: fontSizeHoy }}
                    >
                        <span className="text-gray-900 font-normal font-secondary">
                            Consumo Energético hoy:<br/>{consumoActual}kWh/
                        </span>
                        <span className="text-gray-900 font-bold font-secondary">
                            {consumoTotal}kWh
                        </span>
                        <span className="text-gray-900 font-normal font-secondary"> </span>
                    </div>
                </div>
                
                {/* Consumo por Habitacion */}
                <div className='w-[44%] h-[49%] right-[5%] top-[18%] bg-zinc-100 rounded-2xl shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)] absolute'>
                    {/* Grafico de Barras */}
                    <div className='w-[93%] h-[86%] left-1/2 transform -translate-x-1/2 top-[13%] absolute'>
                        {/* Marcas */}
                        <div className='w-full h-[80%] top-0 left-0 absolute'>
                            {/* 100% del máximo */}
                            <div className='w-full h-[6%] top-0 left-0 absolute'>
                                <div className='w-[84%] left-[12%] top-1/2 transform -translate-y-1/2 absolute outline-1 outline-offset-[-0.50px] outline-black/25'></div>
                                <div className='w-[8%] left-0 top-1/2 transform -translate-y-1/2 absolute text-center text-black text-sm font-normal font-secondary'>{maxConsumo.toLocaleString()}</div>
                            </div>

                            {/* 80% del máximo */}
                            <div className='w-full h-[6%] top-[20%] left-0 absolute'>
                                <div className='w-[84%] left-[12%] top-1/2 transform -translate-y-1/2 absolute outline-1 outline-offset-[-0.50px] outline-black/25'></div>
                                <div className='w-[8%] left-0 top-1/2 transform -translate-y-1/2 absolute text-center text-black text-sm font-normal font-secondary'>{Math.round(maxConsumo * 0.8).toLocaleString()}</div>
                            </div>

                            {/* 60% del máximo */}
                            <div className='w-full h-[6%] top-[40%] left-0 absolute'>
                                <div className='w-[84%] left-[12%] top-1/2 transform -translate-y-1/2 absolute outline-1 outline-offset-[-0.50px] outline-black/25'></div>
                                <div className='w-[8%] left-0 top-1/2 transform -translate-y-1/2 absolute text-center text-black text-sm font-normal font-secondary'>{Math.round(maxConsumo * 0.6).toLocaleString()}</div>
                            </div>

                            {/* 40% del máximo */}
                            <div className='w-full h-[6%] top-[60%] left-0 absolute'>
                                <div className='w-[84%] left-[12%] top-1/2 transform -translate-y-1/2 absolute outline-1 outline-offset-[-0.50px] outline-black/25'></div>
                                <div className='w-[8%] left-0 top-1/2 transform -translate-y-1/2 absolute text-center text-black text-sm font-normal font-secondary'>{Math.round(maxConsumo * 0.4).toLocaleString()}</div>
                            </div>

                            {/* 20% del máximo */}
                            <div className='w-full h-[6%] top-[80%] left-0 absolute'>
                                <div className='w-[84%] left-[12%] top-1/2 transform -translate-y-1/2 absolute outline-1 outline-offset-[-0.50px] outline-black/25'></div>
                                <div className='w-[8%] left-0 top-1/2 transform -translate-y-1/2 absolute text-center text-black text-sm font-normal font-secondary'>{Math.round(maxConsumo * 0.2).toLocaleString()}</div>
                            </div>

                            {/* 0 */}
                            <div className='w-full h-[6%] top-[100%] left-0 absolute'>
                                <div className='w-[84%] left-[12%] top-1/2 transform -translate-y-1/2 absolute outline-1 outline-offset-[-0.50px] outline-black/25'></div>
                                <div className='w-[8%] left-0 top-1/2 transform -translate-y-1/2 absolute text-center text-black text-sm font-normal font-secondary'>0</div>
                            </div>
                        </div>

                        {/* Barras dinámicas */}
                        <div className="w-[85%] h-[81%] left-[10%] top-[2%] absolute">
                            {barras.map((barra, index) => (
                                <motion.div
                                    key={index}
                                    className="absolute bg-azul-2 rounded-tl-2xl rounded-tr-2xl"
                                    style={{
                                        width: '18%',
                                        height: `${barra.altura}%`,
                                        left: `${6 + (index * 24)}%`,
                                        bottom: 0
                                    }}
                                    initial={{ height: 0 }}
                                    animate={{ height: `${barra.altura}%` }}
                                    transition={{ 
                                        duration: 0.8, 
                                        delay: index * 0.1,
                                        ease: "easeOut"
                                    }}
                                />
                            ))}
                        </div>

                        {/* Habitaciones */}
                        <div 
                            ref={habitacionesRef}
                            className="w-[85%] h-[9%] left-[10%] top-[85%] absolute"
                        >
                            {barras.map((barra, index) => (
                                <div 
                                    key={index}
                                    className='w-[18%] h-[40%] font-medium text-center font-secondary absolute leading-tight'
                                    style={{ 
                                        left: `${6 + (index * 24)}%`,
                                        fontSize: fontSizeHabitaciones
                                    }}
                                >
                                    {barra.nombre}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Información adicional */}
                    <div 
                        ref={totalRef}
                        className="w-full top-2 text-center text-gray-600 font-secondary absolute"
                        style={{ fontSize: fontSizeTotal }}
                    >
                        Total: {totalConsumoHabitaciones}kWh
                    </div>
                </div>

                {/* Contenedor de Notificaciones */}
                <div className="w-[90%] h-[30%] left-[5%] top-[70%] absolute overflow-y-auto custom-scrollbar">
                    {sortedDates.map((date, dateIndex) => (
                        <div key={date} className="relative mb-4">
                            {/* Fecha */}
                            <div className="mb-2">
                                <span className="text-sm text-neutral-500 font-medium capitalize">
                                    {formatDate(date)}
                                </span>
                            </div>

                            {/* Notificaciones del día */}
                            {groupedNotifications[date].map((notification, index) => (
                                <div key={`${date}-${index}`} className="relative mb-4 ml-4">
                                    {/* Línea conectora */}
                                    {index < groupedNotifications[date].length - 1 && (
                                        <div className="absolute left-6 top-16 w-0.5 h-20 bg-gray-300 z-0"></div>
                                    )}
                                    
                                    {/* Notificación */}
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
            </motion.div>
        </div>
    );
}

export default Energy;