import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function LoginRegister() {
  const navigate = useNavigate();

  const handleGoToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="w-full h-full relative bg-slate-200 overflow-hidden" >
      {/* BG */}
      <div className="w-full h-full left-0 top-0 absolute overflow-hidden">
        <motion.img
            src="/assets/circ-izq-1.svg"
            alt="bg izq"
            className="w-[60%] h-[116%] left-[-12%] top-0 absolute"
            draggable={false}
            initial={{ x: '-50vw', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '-50vw', opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
        />
        <motion.img
            src="/assets/circ-der-1.svg"
            alt="bg der"
            className="w-[60%] h-[116%] right-[-12%] top-[-15%] absolute"
            draggable={false}
            initial={{ x: '50vw', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '50vw', opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </div>

      {/* INICIAR SESIÓN */}
      <motion.button
        className="w-80 h-18 left-1/2 transform -translate-x-1/2 top-[48%] absolute rounded-2xl z-10 focus:outline-none transition duration-150 cursor-pointer shadow-[0px_0px_8px_0px_rgba(0,0,0,0.25)] active:ring-4 active:ring-blue-300 bg-azul-2"
        onClick={handleGoToLogin}
        type="button"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95, y: 0 }}
        transition={{ 
          duration: 0.5, 
          ease: "easeInOut",
          scale: { type: "spring", stiffness: 400, damping: 17 }
        }}
      >
        <span className="text-white text-3xl font-normal font-secondary">Iniciar Sesión</span>
      </motion.button>

      <motion.button
        className="w-80 h-18 left-1/2 transform -translate-x-1/2 top-[60%] absolute rounded-2xl z-10 focus:outline-none transition duration-150 cursor-pointer shadow-[0px_0px_8px_0px_rgba(0,0,0,0.25)] active:ring-4 active:ring-blue-300 bg-white"
        type="button"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95, y: 0 }}
        transition={{ 
          duration: 0.5, 
          ease: "easeInOut",
          scale: { type: "spring", stiffness: 400, damping: 17 }
        }}
      >
        <span className="text-3xl font-normal font-secondary text-azul-2">Registrarse</span>
      </motion.button>
    </div>
  );
}

export default LoginRegister; 