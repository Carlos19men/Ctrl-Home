import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleLogin = () => {
    // Validar campos
    const isEmailValid = email.trim() !== '';
    const isPasswordValid = password.trim() !== '';
    
    setEmailError(!isEmailValid);
    setPasswordError(!isPasswordValid);
    
    // Si ambos campos están llenos, navegar a Home
    if (isEmailValid && isPasswordValid) {
      // Pequeño delay para que el texto se desvanezca en su posición actual
      setTimeout(() => {
        navigate('/home');
      }, 600);
    } else {
      // Desvanecer los errores después de 3 segundos
      setTimeout(() => {
        setEmailError(false);
        setPasswordError(false);
      }, 3000);
    }
  };

  return (
    <div className="w-full h-full relative bg-slate-200 overflow-hidden" >
      {/* BG */}
      <div className="w-full h-full left-0 top-0 absolute overflow-hidden">
        <motion.img
            src="/assets/circ-izq-2.svg"
            alt="bg izq"
            className="w-[37%] h-[71%] left-[-7%] top-[30%] absolute select-none"
            draggable={false}
            initial={{ x: '-50vw', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '-50vw', opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
        />
        <motion.img
            src="/assets/circ-der-2.svg"
            alt="bg der"
            className="w-[60%] h-[116%] right-[-12%] top-[-15%] absolute select-none"
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
        className='w-15 h-15 left-5 top-5 absolute cursor-pointer select-none'
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

      {/* INICIAR SESION */}
      <motion.div 
        className='w-[50%] h-[44%] left-1/2 transform -translate-x-1/2 top-[32%] absolute bg-zinc-100 rounded-2xl'
        initial={{ y: '50vh', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '50vh', opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        {/* EMAIL / USUARIO*/}
        <div className='w-[90%] h-[28%] left-1/2 transform -translate-x-1/2 top-[6%] absolute'>
          <div className='left-0 top-0 absolute justify-start text-azul-2 text-2xl font-normal font-secondary'>E-mail/usuario:</div>
          <input 
            type="email" 
            placeholder="Ingresa tu email o usuario"
            className={`w-full h-[50%] left-0 top-10 absolute bg-gris-1 rounded-2xl px-4 text-azul-2 text-lg font-secondary focus:outline-none focus:ring-2 focus:ring-azul-2 focus:bg-white transition-all duration-500 ease-in-out ${emailError ? 'ring-2 ring-red-500 bg-red-50' : 'ring-0 bg-gris-1'}`}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (emailError) setEmailError(false);
            }}
          />
        </div>
        {/* CLAVE */}
        <div className='w-[90%] h-[28%] left-1/2 transform -translate-x-1/2 top-[38%] absolute'>
          <div className='left-0 top-0 absolute justify-start text-azul-2 text-2xl font-normal font-secondary'>Contraseña:</div>
          <input 
            type="password" 
            placeholder="Ingresa tu contraseña"
            className={`w-full h-[50%] left-0 top-10 absolute bg-gris-1 rounded-2xl px-4 text-azul-2 text-lg font-secondary focus:outline-none focus:ring-2 focus:ring-azul-2 focus:bg-white transition-all duration-500 ease-in-out ${passwordError ? 'ring-2 ring-red-500 bg-red-50' : 'ring-0 bg-gris-1'}`}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (passwordError) setPasswordError(false);
            }}
          />
        </div>
        {/* BOTON */}
        <motion.button
          onClick={handleLogin}
          className="w-[45%] h-[14%] left-1/2 transform -translate-x-1/2 top-[78%] absolute bg-azul-2 rounded-2xl cursor-pointer focus:outline-none"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <div className="w-full text-center top-1/2 transform -translate-y-1/2 absolute justify-start text-white text-2xl font-normal font-secondary">Iniciar Sesión</div>
        </motion.button>
      </motion.div>
      
      {/* TEXTO DE ABAJO */}
      <motion.div 
        className="w-[27%] h-[8%] left-1/2 transform -translate-x-1/2 top-[78%] absolute"
        initial={{ y: '50vh', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '50vh', opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <div className='w-full h-[60%] text-center top-0 font-secondary text-2xl text-azul-2 underline absolute'>¿Olvido su contraseña?</div>
        <div className='w-full text-center top-[60%] font-secondary text-1xl text-azul-2 underline absolute opacity-70'>¿No tienes una cuenta? Registrate aquí.</div>
      </motion.div>
    </div>
  );
}

export default Login;
