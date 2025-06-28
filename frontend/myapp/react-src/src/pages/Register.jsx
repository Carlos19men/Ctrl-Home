import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [passwordMismatchError, setPasswordMismatchError] = useState(false);

  const handleGoBack = () => {
    navigate('/');
  };

  const handleGoToLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    // Validar campos
    const isUsernameValid = username.trim() !== '';
    const isEmailValid = email.trim() !== '';
    const isPasswordValid = password.trim() !== '';
    const isConfirmPasswordValid = confirmPassword.trim() !== '';
    const doPasswordsMatch = password === confirmPassword;
    
    setUsernameError(!isUsernameValid);
    setEmailError(!isEmailValid);
    setPasswordError(!isPasswordValid);
    setConfirmPasswordError(!isConfirmPasswordValid);
    setPasswordMismatchError(isPasswordValid && isConfirmPasswordValid && !doPasswordsMatch);
    
    // Si todos los campos están llenos y las contraseñas coinciden, navegar a Home
    if (isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid && doPasswordsMatch) {
      // Pequeño delay para que el texto se desvanezca en su posición actual
      setTimeout(() => {
        navigate('/home');
      }, 600);
    } else {
      // Desvanecer los errores después de 3 segundos
      setTimeout(() => {
        setUsernameError(false);
        setEmailError(false);
        setPasswordError(false);
        setConfirmPasswordError(false);
        setPasswordMismatchError(false);
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

      {/* REGISTRO */}
      <motion.div 
        className='w-[49%] h-[74%] left-1/2 transform -translate-x-1/2 top-[18%] absolute bg-zinc-100 rounded-2xl'
        initial={{ y: '50vh', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '50vh', opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        {/* Nombre de Usuario */}
        <div className='w-[89%] h-[17%] left-1/2 transform -translate-x-1/2 top-[4%] absolute'>
            <div className='w-full top-0 text-2xl absolute text-azul-2 font-normal font-secondary'>Nombre de Usuario:</div>
            <input 
              type="text" 
              placeholder="Ingresa tu nombre de usuario"
              className={`w-full h-[50%] top-[48%] absolute rounded-2xl px-4 text-azul-2 text-lg font-secondary focus:outline-none focus:ring-2 focus:ring-azul-2 focus:bg-white transition-all duration-500 ease-in-out ${usernameError ? 'ring-2 ring-red-500 bg-gris-1' : 'ring-0 bg-gris-1'}`}
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (usernameError) setUsernameError(false);
              }}
            />
        </div>
        {/* Email */}
        <div className='w-[89%] h-[17%] left-1/2 transform -translate-x-1/2 top-[23%] absolute'>
            <div className='w-full top-0 text-2xl absolute text-azul-2 font-normal font-secondary'>E-mail:</div>
            <input 
              type="email" 
              placeholder="Ingresa tu email"
              className={`w-full h-[50%] top-[48%] absolute rounded-2xl px-4 text-azul-2 text-lg font-secondary focus:outline-none focus:ring-2 focus:ring-azul-2 focus:bg-white transition-all duration-500 ease-in-out ${emailError ? 'ring-2 ring-red-500 bg-gris-1' : 'ring-0 bg-gris-1'}`}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) setEmailError(false);
              }}
            />
        </div>
        {/* Contraseña */}
        <div className='w-[89%] h-[17%] left-1/2 transform -translate-x-1/2 top-[43%] absolute'>
            <div className='w-full top-0 text-2xl absolute text-azul-2 font-normal font-secondary'>Contraseña:</div>
            <input 
              type="password" 
              placeholder="Ingresa tu contraseña"
              className={`w-full h-[50%] top-[48%] absolute rounded-2xl px-4 text-azul-2 text-lg font-secondary focus:outline-none focus:ring-2 focus:ring-azul-2 focus:bg-white transition-all duration-500 ease-in-out ${passwordError || passwordMismatchError ? 'ring-2 ring-red-500 bg-gris-1' : 'ring-0 bg-gris-1'}`}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (passwordError) setPasswordError(false);
                if (passwordMismatchError) setPasswordMismatchError(false);
              }}
            />
        </div>
        {/* Confirmar Contraseña */}
        <div className='w-[89%] h-[17%] left-1/2 transform -translate-x-1/2 top-[63%] absolute'>
            <div className='w-full top-0 text-2xl absolute text-azul-2 font-normal font-secondary'>Confirmar Contraseña:</div>
            <input 
              type="password" 
              placeholder="Confirma tu contraseña"
              className={`w-full h-[50%] top-[48%] absolute rounded-2xl px-4 text-azul-2 text-lg font-secondary focus:outline-none focus:ring-2 focus:ring-azul-2 focus:bg-white transition-all duration-500 ease-in-out ${confirmPasswordError || passwordMismatchError ? 'ring-2 ring-red-500 bg-gris-1' : 'ring-0 bg-gris-1'}`}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (confirmPasswordError) setConfirmPasswordError(false);
                if (passwordMismatchError) setPasswordMismatchError(false);
              }}
            />
        </div>
        {/* Boton */}
        <motion.button
          onClick={handleRegister}
          className="w-[45%] h-[9%] left-1/2 transform -translate-x-1/2 top-[87%] bg-azul-2 rounded-2xl absolute cursor-pointer focus:outline-none"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <div className="w-full text-center top-1/2 transform -translate-y-1/2 absolute text-white text-2xl font-normal font-secondary">Registrarse</div>
        </motion.button>
      </motion.div>

      {/* TEXTO DE ABAJO */}
      <motion.div 
        className="w-[27%] h-[8%] left-1/2 transform -translate-x-1/2 top-[93%] absolute"
        initial={{ y: '50vh', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '50vh', opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <motion.button
          onClick={handleGoToLogin}
          className='w-full text-center text-1xl text-white text-azul-2 font-secondary opacity-70 absolute underline hover:opacity-100 cursor-pointer transition-opacity duration-200'
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          ¿Ya tienes una cuenta? Inicia sesión aquí.
        </motion.button>
      </motion.div>

    </div>
  );
}

export default Register; 