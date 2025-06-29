// src/components/Notification.jsx
import React from "react";
import { Bell } from "lucide-react"; // o usa cualquier icono de cerradura si prefieres

const Notification = ({ title, description }) => {
    return (
        <div className="flex items-start gap-4 bg-white rounded-lg shadow p-4 max-w-md border border-neutral-200">
            <div className="bg-blue-600 rounded-md p-2 flex items-center justify-center">
                <Bell className="text-white w-6 h-6" />
            </div>
            <div>
                <h3 className="text-base font-semibold text-neutral-800">{title}</h3>
                <p className="text-sm text-neutral-600">{description}</p>
            </div>
        </div>
    );
};

export default Notification;
