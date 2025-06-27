import React from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleGoToHome = () => {
    navigate('/home');
  };

  return (
    <div className="w-full h-full relative bg-slate-200 overflow-hidden" >

      {/* BG */}
      <div className="w-full h-full left-0 top-0 absolute overflow-hidden">
        <img
            src="/assets/circ-izq.svg"
            alt="bg izq"
            className="w-[60%] h-[116%] left-[-12%] top-0 absolute"
            draggable={false}
        />
        <img
            src="/assets/circ-der.svg"
            alt="bg der"
            className="w-[60%] h-[116%] right-[-12%] top-[-15%] absolute"
            draggable={false}
        />
      </div>
      
      {/* TEXTO */}
      <div className="w-146 h-44 left-1/2 transform -translate-x-1/2 top-[20%] absolute">
        <div className="left-0 top-0 absolute justify-start text-6xl font-bold select-none font-primary text-azul-2">Iniciar Sesión</div>
        <div className="left-0 top-16 absolute w-full text-center text-xl font-normal select-none font-secondary text-azul-2">Ingresa tus credenciales</div>
      </div>

      {/* FORMULARIO */}
      <div className="w-80 left-1/2 transform -translate-x-1/2 top-[40%] absolute z-10">
        <div className="mb-4">
          <input
            type="email"
            placeholder="Correo electrónico"
            className="w-full h-12 px-4 rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:outline-none text-lg font-secondary"
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full h-12 px-4 rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:outline-none text-lg font-secondary"
          />
        </div>
      </div>

      {/* BOTÓN INICIAR SESIÓN */}
      <button
        className="w-80 h-18 left-1/2 transform -translate-x-1/2 top-[60%] absolute rounded-2xl z-10 focus:outline-none transition duration-150 cursor-pointer shadow-[0px_0px_8px_0px_rgba(0,0,0,0.25)] active:ring-4 active:ring-blue-300 bg-azul-2"
        onClick={handleGoToHome}
        type="button"
      >
        <span className="text-white text-2xl font-normal font-secondary">Iniciar Sesión</span>
      </button>

      {/* BOTÓN VOLVER */}
      <button
        className="w-80 h-18 left-1/2 transform -translate-x-1/2 top-[72%] absolute rounded-2xl z-10 focus:outline-none transition duration-150 cursor-pointer shadow-[0px_0px_8px_0px_rgba(0,0,0,0.25)] active:ring-4 active:ring-blue-300 bg-white"
        onClick={() => navigate('/')}
        type="button"
      >
        <span className="text-2xl font-normal font-secondary text-azul-2">Volver</span>
      </button>

    </div>
  );
}

export default Login;
