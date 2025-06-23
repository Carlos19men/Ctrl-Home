import React from 'react';

const Topbar = () => {
  return (
    <div className="w-[896px] h-14 relative">
    <div className="w-[896px] h-14 left-0 top-0 absolute bg-zinc-100 rounded-2xl shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] border border-black/50" />
    <div className="w-48 h-14 left-0 top-0 absolute bg-blue-800 rounded-tl-2xl rounded-bl-2xl" />
    <div className="w-14 h-0 left-[360px] top-0 absolute origin-top-left rotate-90 outline outline-1 outline-offset-[-0.50px] outline-black/50"></div>
    <div className="w-14 h-0 left-[535px] top-0 absolute origin-top-left rotate-90 outline outline-1 outline-offset-[-0.50px] outline-black/50"></div>
    <div className="w-14 h-0 left-[712px] top-0 absolute origin-top-left rotate-90 outline outline-1 outline-offset-[-0.50px] outline-black/50"></div>
    <div className="left-[51px] top-[17px] absolute justify-start text-zinc-100 text-xl font-normal font-['Lexend']">Favoritos</div>
    <div className="left-[212px] top-[17px] absolute justify-start text-gray-900 text-xl font-normal font-['Lexend']">Sala de Estar</div>
    <div className="left-[414px] top-[17px] absolute justify-start text-gray-900 text-xl font-normal font-['Lexend']">Cocina</div>
    <div className="left-[570px] top-[17px] absolute justify-start text-gray-900 text-xl font-normal font-['Lexend']">Dormitorio</div>
    <div className="left-[766px] top-[17px] absolute justify-start text-gray-900 text-xl font-normal font-['Lexend']">Ver Más</div>
    </div>
  );
}
export default Topbar;