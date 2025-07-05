import React, { useState, useEffect, createContext, useContext } from 'react';
import Home from './pages/Home';
import LoginRegister from './pages/LoginRegister';
import Login from './pages/Login';
import Register from './pages/Register';
import Notifications from './pages/Notifications';
import Security from './pages/Security';
import Energy from './pages/Energy';
import Settings from './pages/Settings';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import './App.css';

// Contexto para navegación
export const NavigationContext = createContext({ prevPath: null, currentPath: null });

function NavigationProvider({ children }) {
  const location = useLocation();
  const [prevPath, setPrevPath] = useState(null);
  const [currentPath, setCurrentPath] = useState(location.pathname);

  useEffect(() => {
    setPrevPath(currentPath);
    setCurrentPath(location.pathname);
  }, [location.pathname]);

  return (
    <NavigationContext.Provider value={{ prevPath, currentPath }}>
      {children}
    </NavigationContext.Provider>
  );
}

// Nuevo: NavigationProviderWithRouter para envolver Router
function NavigationProviderWithRouter({ children }) {
  return (
    <Router>
      <NavigationProvider>{children}</NavigationProvider>
    </Router>
  );
}

// Contexto para animación de sidebar
export const SidebarAnimationContext = createContext({
  shouldAnimateSidebar: false,
  setShouldAnimateSidebar: () => {}
});

function SidebarAnimationProvider({ children }) {
  const [shouldAnimateSidebar, setShouldAnimateSidebar] = useState(false);

  return (
    <SidebarAnimationContext.Provider value={{ shouldAnimateSidebar, setShouldAnimateSidebar }}>
      {children}
    </SidebarAnimationContext.Provider>
  );
}

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
      case '/register':
        return { top: '2%', x: 0, y: 0 };
      case '/home':
        return { top: '12%', x: 0, y: 0 };
      default:
        return { top: '12%', x: 0, y: 0 };
    }
  };

  const position = getTextPosition();
  const shouldShow = location.pathname === '/' || location.pathname === '/login' || location.pathname === '/register';
  
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
        <Route path="/register" element={<Register />} />
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
    <SidebarAnimationProvider>
      <div className="App">
        <AnimatedRoutes />
        <FloatingText location={location} />
      </div>
    </SidebarAnimationProvider>
  );
}

function App() {
  return (
    <NavigationProviderWithRouter>
      <AppContent />
    </NavigationProviderWithRouter>
  );
}

export default App;