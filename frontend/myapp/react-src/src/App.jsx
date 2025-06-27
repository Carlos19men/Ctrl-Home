import React from 'react';
import Home from './pages/Home';
import LoginRegister from './pages/LoginRegister';
import Notifications from './pages/Notifications';
import Security from './pages/Security';
import Energy from './pages/Energy';
import Settings from './pages/Settings';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginRegister />} />
          <Route path="/home" element={<Home />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/security" element={<Security />} />
          <Route path="/energy" element={<Energy />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;