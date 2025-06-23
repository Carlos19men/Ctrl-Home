import React from 'react';
import { useNavigate } from 'react-router-dom';

function LoginRegister() {
  const navigate = useNavigate();

  const handleGoToLogin = () => {
    navigate('/home');
  };

  return (
    <div className="w-full h-full relative bg-slate-200 overflow-hidden" >

      {/* BG */}
      <div className="w-full h-full left-0 top-0 absolute overflow-hidden">
        <img
            src="/src/assets/circ-izq.svg"
            alt="bg izq"
            className="w-[60%] h-[116%] left-[-12%] top-0 absolute"
            draggable={false}
        />
        <img
            src="/src/assets/circ-der.svg"
            alt="bg der"
            className="w-[60%] h-[116%] right-[-12%] top-[-15%] absolute"
            draggable={false}
        />
      </div>
      
      {/* TEXTO */}
      <div className="w-146 h-44 left-1/2 transform -translate-x-1/2 top-[28%] absolute">
        <div className="left-0 top-0 absolute justify-start text-8xl font-bold select-none" style={{ fontFamily: 'Kantumruy Pro, sans-serif', color: '#295AA8', userSelect: 'none' }}>CTRL+HOME</div>
        <div className="left-0 top-20 absolute w-full text-center text-3xl font-normal select-none" style={{ fontFamily: 'Lexend, sans-serif', color: '#295AA8', userSelect: 'none' }}>Tu casa, a un comando de distancia</div>
      </div>

      {/* INICIAR SESIÓN */}
      <button
        className="w-80 h-18 left-1/2 transform -translate-x-1/2 top-[48%] absolute rounded-2xl z-10 focus:outline-none transition duration-150 cursor-pointer shadow-[0px_0px_8px_0px_rgba(0,0,0,0.25)] active:ring-4 active:ring-blue-300"
        style={{ backgroundColor: '#295AA8' }}
        onClick={handleGoToLogin}
        type="button"
      >
        <span className="text-white text-3xl font-normal" style={{ fontFamily: 'Lexend, sans-serif' }}>Iniciar Sesión</span>
      </button>

      <button
        className="w-80 h-18 left-1/2 transform -translate-x-1/2 top-[60%] absolute rounded-2xl z-10 focus:outline-none transition duration-150 cursor-pointer shadow-[0px_0px_8px_0px_rgba(0,0,0,0.25)] active:ring-4 active:ring-blue-300"
        style={{ backgroundColor: '#fff' }}
        type="button"
      >
        <span className="text-3xl font-normal" style={{ fontFamily: 'Lexend, sans-serif', color: '#295AA8' }}>Registrarse</span>
      </button>

    </div>
  );
}

export default LoginRegister; 