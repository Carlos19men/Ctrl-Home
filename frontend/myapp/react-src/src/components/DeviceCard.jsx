import React, { useState, useEffect } from 'react';
import { connectMQTT, publishCommand } from '../utils/mqtt';

const DeviceCard = ({ name, room, status = 'Encendido', ledId }) => {
  const [isOn, setIsOn] = useState(false);
  const [lastCommand, setLastCommand] = useState(null);

  useEffect(() => {
    // Conectar al broker MQTT cuando el componente se monte
    connectMQTT();
  }, []);

  const handleToggle = (e) => {
    const newState = e.target.checked;
    setIsOn(newState);
    
    if (ledId !== undefined) {
      // Enviar comando al Arduino a través de MQTT
      const command = `SET_LED${ledId}:${newState ? '1' : '0'}`;
      publishCommand(command);
      setLastCommand(command);
      console.log(`💡 ${name} (LED${ledId}): ${newState ? 'Encendido' : 'Apagado'}`);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md flex justify-between items-center hover:shadow-lg transition-shadow duration-300">
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-neutral-700">
          {name}
          {ledId !== undefined && <span className="ml-2 text-sm text-neutral-500">(LED {ledId})</span>}
        </h3>
        <p className="text-neutral-500">{room}</p>
        {lastCommand && (
          <p className="text-xs text-neutral-400">Último comando: {lastCommand}</p>
        )}
      </div>
      <div className="flex flex-col items-end space-y-2">
        <span className={`text-neutral-600 ${isOn ? 'text-green-600' : 'text-red-600'}`}>
          {isOn ? '● Encendido' : '○ Apagado'}
        </span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input 
            type="checkbox" 
            checked={isOn}
            onChange={handleToggle}
            className="sr-only peer" 
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-azul-2"></div>
        </label>
      </div>
    </div>
  );
};

export default DeviceCard;
