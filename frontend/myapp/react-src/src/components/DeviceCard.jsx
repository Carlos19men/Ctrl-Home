import React from 'react';

const DeviceCard = ({ name, room, status = 'Encendido' }) => {
  return (
    <div className="device-card">
      <div>
        <h3>{name}</h3>
        <p>{room}</p>
      </div>
      <div className="status">
        <span>{status}</span>
        <input type="checkbox" defaultChecked />
      </div>
    </div>
  );
};

export default DeviceCard;
