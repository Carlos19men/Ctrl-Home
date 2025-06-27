import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function Login() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="w-full h-full relative bg-slate-200 overflow-hidden" >
      {/* BG */}
      <div className="w-full h-full left-0 top-0 absolute overflow-hidden">
        <motion.img
            src="/assets/circ-izq-2.svg"
            alt="bg izq"
            className="w-[37%] h-[71%] left-[-7%] top-[30%] absolute"
            draggable={false}
            initial={{ x: '-50vw', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '-50vw', opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
        />
        <motion.img
            src="/assets/circ-der-2.svg"
            alt="bg der"
            className="w-[60%] h-[116%] right-[-12%] top-[-15%] absolute"
            draggable={false}
            initial={{ x: '50vw', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '50vw', opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </div>

      {/* BOTON DE REGRESO */}
      <motion.img
        src="/assets/icons/returnbtn.svg"
        alt="boton de regreso"
        className='w-15 h-15 left-5 top-5 absolute cursor-pointer'
        onClick={handleGoBack}
        initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        exit={{ opacity: 0, scale: 0.8, rotate: -15 }}
        whileHover={{ scale: 1.15, rotate: -5 }}
        whileTap={{ scale: 0.9, rotate: -20 }}
        transition={{ 
          duration: 0.5, 
          ease: "easeInOut",
          scale: { type: "spring", stiffness: 400, damping: 17 },
          rotate: { type: "spring", stiffness: 300, damping: 15 }
        }}
      />
    </div>
  );
}

export default Login;
