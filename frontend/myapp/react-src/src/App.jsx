import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import LoginRegister from './pages/LoginRegister';
import Dashboard from './pages/Dashboard';
import Devices from './pages/Devices';
import Security from './pages/Security';
import Settings from './pages/Settings';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar si hay un token guardado
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
      setIsAuthenticated(true);
    }
    
    setLoading(false);
  }, []);

  const handleLogin = (userData, token) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('authToken', token);
    localStorage.setItem('userData', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Cargando Ctrl+Home...</p>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/loginregister" 
            element={
              isAuthenticated ? 
              <Navigate to="/dashboard" replace /> : 
              <LoginRegister />
            } 
          />
          <Route 
            path="/login" 
            element={
              isAuthenticated ? 
              <Navigate to="/dashboard" replace /> : 
              <Login onLogin={handleLogin} />
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              isAuthenticated ? 
              <Dashboard user={user} onLogout={handleLogout} /> : 
              <Navigate to="/loginregister" replace />
            } 
          />
          <Route 
            path="/devices" 
            element={
              isAuthenticated ? 
              <Devices user={user} onLogout={handleLogout} /> : 
              <Navigate to="/loginregister" replace />
            } 
          />
          <Route 
            path="/security" 
            element={
              isAuthenticated ? 
              <Security user={user} onLogout={handleLogout} /> : 
              <Navigate to="/loginregister" replace />
            } 
          />
          <Route 
            path="/settings" 
            element={
              isAuthenticated ? 
              <Settings user={user} onLogout={handleLogout} /> : 
              <Navigate to="/loginregister" replace />
            } 
          />
          <Route 
            path="/" 
            element={
              isAuthenticated ? 
              <Navigate to="/dashboard" replace /> : 
              <Navigate to="/loginregister" replace />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;