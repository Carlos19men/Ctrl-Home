import React from "react";
import { Bell } from "lucide-react";

const Notification = ({ title, description, time }) => {
    return (
        <div className="flex items-center gap-4">
            {/* Círculo con hora sin líneas */}
            <div className="w-12 h-12 rounded-full bg-white border-2 border-gray-400 flex items-center justify-center text-xs font-medium text-neutral-700">
                {time}
            </div>

            {/* Tarjeta de notificación */}
            <div className="flex items-start gap-5 bg-white rounded-lg shadow p-4 w-full max-w-4xl border border-neutral-200">
                <div className="bg-azul-2 rounded-md p-3 flex items-center justify-center">
                    <Bell className="text-white w-12 h-12" />
                </div>
                <div>
                    <h3 className="text-2xl font-semibold text-neutral-800">{title}</h3>
                    <p className="text-sm text-neutral-600 mt-1">{description}</p>
                </div>
            </div>
        </div>
    );
};

export default Notification;
