import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { motion, AnimatePresence } from 'framer-motion';
import { Pencil, User, Image as ImageIcon, Languages, Globe, Bell, Volume2, BarChart2, RefreshCcw } from "lucide-react";
import CardSetting from "../components/CardSetting";

const Settings = () => {
    const [tab, setTab] = useState('General');
    // Estado para las configuraciones generales
    const [notificaciones, setNotificaciones] = useState(true);
    const [resumenSemanal, setResumenSemanal] = useState(true);
    const [idioma, setIdioma] = useState('Español');
    const [zonaHoraria, setZonaHoraria] = useState('GMT-4 (Caracas)');
    const [sonido, setSonido] = useState('Clásico');
    const [volumen, setVolumen] = useState(70);
    const [avatar, setAvatar] = useState(null);
    const fileInputRef = useRef(null);
    // Estado para el nombre editable
    const [editingName, setEditingName] = useState(false);
    const [userName, setUserName] = useState(() => {
        const savedName = localStorage.getItem('user_name');
        return savedName ? savedName : 'PETROLINA SINFOROSA';
    });
    const nameInputRef = useRef(null);

    // Enfocar el input al activar edición
    useEffect(() => {
        if (editingName && nameInputRef.current) {
            nameInputRef.current.focus();
        }
    }, [editingName]);

    // Cargar nombre y avatar desde localStorage al iniciar
    useEffect(() => {
        const savedAvatar = localStorage.getItem('user_avatar');
        if (savedAvatar) {
            setAvatar(savedAvatar);
        }
        const savedName = localStorage.getItem('user_name');
        if (savedName) {
            setUserName(savedName);
        }
    }, []);

    // Guardar avatar en localStorage cuando cambie
    useEffect(() => {
        if (avatar) {
            localStorage.setItem('user_avatar', avatar);
        }
    }, [avatar]);

    // Guardar nombre en localStorage cuando cambie
    useEffect(() => {
        if (userName) {
            localStorage.setItem('user_name', userName);
        }
    }, [userName]);

    return (
        <div className="App bg-azul-1 min-h-screen w-full relative">
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
                {/* Título */}
                <div className="absolute left-[40px] top-[32px] mb-8">
                    <h2 className="text-5xl font-bold text-neutral-700 mb-4">Configuración</h2>
                </div>
                {/* Área de usuario y tabs */}
                <div className="absolute left-[120px] top-[120px] flex items-center gap-6 mb-8">
                    {/* Círculo azul editable con imagen y lápiz en hover */}
                    <div className="relative group">
                        <div
                            className="rounded-full w-48 h-48 flex items-center justify-center cursor-pointer bg-azul-2 overflow-hidden"
                            style={avatar ? { backgroundImage: `url(${avatar})`, backgroundSize: 'cover', backgroundPosition: 'center', cursor: 'pointer' } : { cursor: 'pointer' }}
                            onClick={() => fileInputRef.current && fileInputRef.current.click()}
                        >
                            {/* Overlay oscuro en hover */}
                            <div className="absolute inset-0 rounded-full pointer-events-none transition-opacity duration-200 opacity-0 group-hover:opacity-40 bg-black" />
                        </div>
                        <button
                            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                            style={{ pointerEvents: 'auto' }}
                            onClick={() => fileInputRef.current && fileInputRef.current.click()}
                            aria-label="Editar avatar"
                        >
                            <Pencil className="w-16 h-16 text-white drop-shadow-lg" />
                        </button>
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            className="hidden"
                            onChange={e => {
                                const file = e.target.files[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onload = ev => setAvatar(ev.target.result);
                                    reader.readAsDataURL(file);
                                }
                            }}
                        />
                    </div>
                    <div className="mt-11">
                        <h2 className="text-4xl font-bold text-neutral-700">
                            {editingName ? (
                                <input
                                    ref={nameInputRef}
                                    type="text"
                                    className="text-4xl font-bold text-neutral-700 bg-transparent border-b-2 border-azul-2 outline-none uppercase pr-2"
                                    value={userName}
                                    onChange={e => setUserName(e.target.value.toUpperCase())}
                                    onBlur={() => setEditingName(false)}
                                    onKeyDown={e => {
                                        if (e.key === 'Enter') setEditingName(false);
                                    }}
                                    style={{ width: 'auto', minWidth: 200 }}
                                />
                            ) : (
                                <>
                                    {userName}
                                    <button type="button" onClick={() => setEditingName(true)}
                                        className="transition-transform duration-150 ease-in-out focus:outline-none"
                                        style={{ verticalAlign: 'middle' }}
                                    >
                                        <span className="inline-block">
                                            <Pencil className="inline w-8 h-8 ml-1 mb-1 cursor-pointer text-azul-2 hover:text-azul-1 active:scale-90 hover:scale-125 transition-transform duration-200 drop-shadow-lg" />
                                        </span>
                                    </button>
                                </>
                            )}
                        </h2>
                        <p className="text-xl text-neutral-600">Administrador</p>
                        <div className="w-[700px] h-12 relative" style={{ left: 20, top: 32 }}>
                        </div>
                    </div>
                </div>

                {/* Contenido de tabs */}
                <div className="absolute left-[10%] top-[50%] w-[90%] min-h-[400px]">
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
                                <div className="flex flex-col gap-4 max-h-[55vh] overflow-y-auto custom-scrollbar pr-2 pb-36">
                                    {/* Notificaciones generales */}
                                    <CardSetting
                                        icon={<Bell className="w-7 h-7 text-azul-2" />}
                                        title="Notificaciones generales"
                                        description="Activa o desactiva todas las notificaciones del sistema."
                                    >
                                        <label className="relative inline-flex items-center cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                checked={notificaciones}
                                                onChange={() => setNotificaciones((v) => !v)}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 rounded-full transition-colors duration-300 peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all after:duration-300 peer-checked:after:translate-x-full peer-checked:after:border-white" />
                                            <span className="ml-2 text-zinc-700">{notificaciones ? 'Activadas' : 'Desactivadas'}</span>
                                        </label>
                                    </CardSetting>
                                    {/* Resumen semanal del hogar */}
                                    <CardSetting
                                        icon={<BarChart2 className="w-7 h-7 text-azul-2" />}
                                        title="Resumen semanal del hogar"
                                        description="Recibe un resumen semanal de la actividad del hogar."
                                    >
                                        <label className="relative inline-flex items-center cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                checked={resumenSemanal}
                                                onChange={() => setResumenSemanal((v) => !v)}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 rounded-full transition-colors duration-300 peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all after:duration-300 peer-checked:after:translate-x-full peer-checked:after:border-white" />
                                            <span className="ml-2 text-zinc-700">{resumenSemanal ? 'Activado' : 'Desactivado'}</span>
                                        </label>
                                    </CardSetting>
                                    {/* Selección de idioma */}
                                    <CardSetting
                                        icon={<Languages className="w-7 h-7 text-azul-2" />}
                                        title="Idioma del sistema"
                                        description="Selecciona el idioma preferido para la interfaz."
                                    >
                                        <select className="border border-zinc-300 rounded-lg px-3 py-2" value={idioma} onChange={e => setIdioma(e.target.value)}>
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
                                        <select className="border border-zinc-300 rounded-lg px-3 py-2" value={zonaHoraria} onChange={e => setZonaHoraria(e.target.value)}>
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
                                        <select className="border border-zinc-300 rounded-lg px-3 py-2 mr-2" value={sonido} onChange={e => setSonido(e.target.value)}>
                                            <option>Clásico</option>
                                            <option>Digital</option>
                                            <option>Campana</option>
                                        </select>
                                        <input type="range" min="0" max="100" value={volumen} onChange={e => setVolumen(Number(e.target.value))} className="accent-azul-2" />
                                    </CardSetting>
                                    {/* Restablecer configuraciones por defecto */}
                                    <CardSetting
                                        icon={<RefreshCcw className="w-7 h-7 text-azul-2" />}
                                        title="Restablecer configuraciones"
                                        description="Vuelve a los valores predeterminados del sistema."
                                        className="mt-20"
                                    >
                                        <button
                                            className="bg-azul-2 text-white font-bold rounded-lg transition-all duration-150 focus:outline-none cursor-pointer hover:bg-blue-700 hover:shadow-lg hover:scale-105 active:scale-95"
                                            style={{ padding: '1.5% 4%', minWidth: 100, minHeight: 36 }}
                                            onClick={() => {
                                                setNotificaciones(true);
                                                setResumenSemanal(true);
                                                setIdioma('Español');
                                                setZonaHoraria('GMT-4 (Caracas)');
                                                setSonido('Clásico');
                                                setVolumen(70);
                                            }}
                                        >
                                            Restablecer
                                        </button>
                                    </CardSetting>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
}

export default Settings;