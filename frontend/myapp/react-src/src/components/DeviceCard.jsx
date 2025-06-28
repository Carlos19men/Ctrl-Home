import React from 'react';

const DeviceCard = ({ name, room, status = 'Encendido' }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md flex justify-between items-center hover:shadow-lg transition-shadow duration-300">
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-neutral-700">{name}</h3>
        <p className="text-neutral-500">{room}</p>
      </div>
      <div className="flex flex-col items-end space-y-2">
        <span className="text-neutral-600">{status}</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" defaultChecked className="sr-only peer" />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-800"></div>
        </label>
      </div>
    </div>
  );
};

export default DeviceCard;
