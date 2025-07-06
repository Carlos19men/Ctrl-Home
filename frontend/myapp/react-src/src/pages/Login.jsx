import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SidebarAnimationContext } from '../App';

function Login() {
  const navigate = useNavigate();
  const { setShouldAnimateSidebar } = useContext(SidebarAnimationContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [roleError, setRoleError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [cheerpLoaded, setCheerpLoaded] = useState(false);

  // Cargar el módulo Cheerp al montar el componente
  useEffect(() => {
    const loadCheerpModule = async () => {
      try {
        // Crear script dinámicamente para cargar el módulo
        const script = document.createElement('script');
        script.src = '/cheerp_backend.js';
        script.onload = () => {
          setCheerpLoaded(true);
          console.log('Módulo Cheerp cargado exitosamente');
        };
        script.onerror = () => {
          console.error('Error al cargar el módulo Cheerp');
          setLoginError('Error al cargar el módulo de validación');
        };
        document.head.appendChild(script);
      } catch (error) {
        console.error('Error al cargar Cheerp:', error);
        setLoginError('Error al cargar el módulo de validación');
      }
    };

    loadCheerpModule();
  }, []);

  const handleGoBack = () => {
    navigate('/');
  };

  const handleGoToRegister = () => {
    navigate('/register');
  };

  const validateCredentialsWithCheerp = (username, password, role) => {
    try {
      // Verificar que las funciones estén disponibles
      if (typeof window.validateCredentials !== 'function' || 
          typeof window.writeToBuffer !== 'function') {
        throw new Error('Funciones de validación no disponibles');
      }

      const encoder = new TextEncoder();
      const usernameBytes = encoder.encode(username);
      const passwordBytes = encoder.encode(password);
      const roleBytes = encoder.encode(role);

      // Escribir datos en el buffer
      for (let i = 0; i < usernameBytes.length; i++) {
        window.writeToBuffer(i, usernameBytes[i]);
      }
      for (let i = 0; i < passwordBytes.length; i++) {
        window.writeToBuffer(100 + i, passwordBytes[i]);
      }
      for (let i = 0; i < roleBytes.length; i++) {
        window.writeToBuffer(200 + i, roleBytes[i]);
      }

      // Validar credenciales
      const result = window.validateCredentials(0, usernameBytes.length, 100, passwordBytes.length, 200, roleBytes.length);
      return result === 1;
    } catch (error) {
      console.error('Error en validación Cheerp:', error);
      return false;
    }
  };

  const handleLogin = async () => {
    setIsLoading(true);
    setLoginError('');

    // Validar campos
    const isEmailValid = email.trim() !== '';
    const isPasswordValid = password.trim() !== '';
    const isRoleValid = role.trim() !== '';
    
    setEmailError(!isEmailValid);
    setPasswordError(!isPasswordValid);
    setRoleError(!isRoleValid);
    
    if (!isEmailValid || !isPasswordValid || !isRoleValid) {
      setIsLoading(false);
      setTimeout(() => {
        setEmailError(false);
        setPasswordError(false);
        setRoleError(false);
      }, 3000);
      return;
    }

    // Si el módulo Cheerp no está cargado, usar validación básica
    if (!cheerpLoaded) {
      console.warn('Módulo Cheerp no cargado, usando validación básica');
      setShouldAnimateSidebar(true);
      navigate('/home');
      setIsLoading(false);
      return;
    }

    // Validar con backend C++
    const isValid = validateCredentialsWithCheerp(email, password, role);
    
    if (isValid) {
      setShouldAnimateSidebar(true);
      navigate('/home');
    } else {
      setLoginError('Credenciales inválidas. Verifica usuario, contraseña y rol.');
      setTimeout(() => {
        setLoginError('');
      }, 5000);
    }
    
    setIsLoading(false);
  };

  return (
    <div className="w-full h-full relative bg-azul-1 overflow-hidden" >
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
        className='w-[50%] h-[60%] left-1/2 transform -translate-x-1/2 top-[25%] absolute bg-zinc-100 rounded-2xl'
        initial={{ y: '50vh', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '50vh', opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        {/* EMAIL / USUARIO*/}
        <div className='w-[90%] h-[20%] left-1/2 transform -translate-x-1/2 top-[4%] absolute'>
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
        <div className='w-[90%] h-[20%] left-1/2 transform -translate-x-1/2 top-[28%] absolute'>
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

        {/* ROL */}
        <div className='w-[90%] h-[20%] left-1/2 transform -translate-x-1/2 top-[52%] absolute'>
          <div className='left-0 top-0 absolute justify-start text-azul-2 text-2xl font-normal font-secondary'>Rol:</div>
          <select 
            className={`w-full h-[50%] left-0 top-10 absolute bg-gris-1 rounded-2xl px-4 text-azul-2 text-lg font-secondary focus:outline-none focus:ring-2 focus:ring-azul-2 focus:bg-white transition-all duration-500 ease-in-out ${roleError ? 'ring-2 ring-red-500 bg-red-50' : 'ring-0 bg-gris-1'}`}
            value={role}
            onChange={(e) => {
              setRole(e.target.value);
              if (roleError) setRoleError(false);
            }}
          >
            <option value="admin">Administrador</option>
            <option value="usuario">Usuario</option>
          </select>
        </div>

        {/* MENSAJE DE ERROR */}
        {loginError && (
          <div className='w-[90%] left-1/2 transform -translate-x-1/2 top-[76%] absolute'>
            <div className='text-center text-red-500 text-sm font-secondary bg-red-50 rounded-lg p-2'>
              {loginError}
            </div>
          </div>
        )}

        {/* BOTON */}
        <motion.button
          onClick={handleLogin}
          disabled={isLoading}
          className={`w-[45%] h-[12%] left-1/2 transform -translate-x-1/2 top-[88%] absolute bg-azul-2 rounded-2xl cursor-pointer focus:outline-none ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          whileHover={!isLoading ? { scale: 1.05 } : {}}
          whileTap={!isLoading ? { scale: 0.95 } : {}}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <div className="w-full text-center top-1/2 transform -translate-y-1/2 absolute justify-start text-white text-2xl font-normal font-secondary">
            {isLoading ? 'Validando...' : 'Iniciar Sesión'}
          </div>
        </motion.button>
      </motion.div>
      
      {/* TEXTO DE ABAJO */}
      <motion.div 
        className="w-[27%] h-[8%] left-1/2 transform -translate-x-1/2 top-[88%] absolute"
        initial={{ y: '50vh', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '50vh', opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <div className='w-full h-[60%] text-center top-0 font-secondary text-2xl text-azul-2 underline absolute'>¿Olvido su contraseña?</div>
        <motion.button
          onClick={handleGoToRegister}
          className='w-full text-center top-[60%] font-secondary text-1xl text-azul-2 underline absolute opacity-70 hover:opacity-100 cursor-pointer transition-opacity duration-200'
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          ¿No tienes una cuenta? Registrate aquí.
        </motion.button>
      </motion.div>
    </div>
  );
}

export default Login;
