import React from "react";

const NotificationTimelineItem = ({ time, count }) => {
    return (
        <div className="flex items-center relative">
            {/* Hora */}
            <span className="text-neutral-700 font-medium w-12 text-right mr-4">{time}</span>

            {/* Línea vertical */}
            <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center text-neutral-600 font-semibold">
                    {count}
                </div>
                <div className="w-px bg-gray-300 flex-1 mt-1"></div>
            </div>
        </div>
    );
};

export default NotificationTimelineItem;
