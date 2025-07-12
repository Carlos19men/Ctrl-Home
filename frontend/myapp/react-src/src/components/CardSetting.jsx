import React from "react";

const CardSetting = ({ icon, title, description, children }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm flex items-center gap-6">
    <div className="w-12 h-12 rounded-lg bg-zinc-200 flex items-center justify-center text-xl">
      {icon}
    </div>
    <div className="flex-1">
      <span className="text-lg font-semibold text-neutral-800">{title}</span>
      <p className="text-sm text-zinc-500">{description}</p>
    </div>
    {children}
  </div>
);

export default CardSetting; 