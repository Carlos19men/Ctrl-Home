import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import LoginRegister from './pages/LoginRegister';
import Login from './pages/Login';
import Notifications from './pages/Notifications';
import Security from './pages/Security';
import Energy from './pages/Energy';
import Settings from './pages/Settings';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import './App.css';

function FloatingText({ location }) {
  const [lastPath, setLastPath] = useState(location.pathname);
  const [isTransitioningFromLogin, setIsTransitioningFromLogin] = useState(false);

  useEffect(() => {
    // Si viene de login y va a home, marcar la transición
    if (lastPath === '/login' && location.pathname === '/home') {
      setIsTransitioningFromLogin(true);
    } else {
      setIsTransitioningFromLogin(false);
    }
    setLastPath(location.pathname);
  }, [location.pathname, lastPath]);

  const getTextPosition = () => {
    switch (location.pathname) {
      case '/':
        return { top: '28%', x: 0, y: 0 };
      case '/login':
        return { top: '12%', x: 0, y: 0 };
      case '/home':
        return { top: '12%', x: 0, y: 0 };
      default:
        return { top: '12%', x: 0, y: 0 };
    }
  };

  const position = getTextPosition();
  const shouldShow = location.pathname === '/' || location.pathname === '/login';
  
  // Si está en transición desde login, mantener posición de login
  const finalTop = isTransitioningFromLogin ? '12%' : position.top;

  return (
    <motion.div 
      className="w-146 h-44 left-1/2 transform -translate-x-1/2 absolute z-50 pointer-events-none"
      initial={false}
      animate={{ 
        top: finalTop,
        x: position.x, 
        y: position.y,
        opacity: shouldShow ? 1 : 0
      }}
      transition={{ 
        duration: 0.8, 
        ease: "easeInOut",
        opacity: { duration: 0.6, ease: "easeInOut" }
      }}
    >
      <div className="left-0 top-0 absolute justify-start text-8xl font-bold select-none font-primary text-azul-2">
        CTRL+HOME
      </div>
      <div className="left-0 top-20 absolute w-full text-center text-3xl font-normal select-none font-secondary text-azul-2">
        Tu casa, a un comando de distancia
      </div>
    </motion.div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LoginRegister />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/security" element={<Security />} />
        <Route path="/energy" element={<Energy />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </AnimatePresence>
  );
}

function AppContent() {
  const location = useLocation();
  
  return (
    <div className="App">
      <AnimatedRoutes />
      <FloatingText location={location} />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;