import React from "react";

function ServiceSelector({ setSelectedService }) {
    return (
        <div className="flex justify-center gap-4 mb-4">
            <button onClick={() => setSelectedService("ambulance")} className="px-4 py-2 rounded bg-red-500 text-white pointer-events-none">
                Ambulance
            </button>
            <button onClick={() => setSelectedService("hospital")} className="px-4 py-2 rounded bg-blue-500 text-white pointer-events-none">
                Hospital
            </button>
            <button onClick={() => setSelectedService("user")} className="px-4 py-2 rounded pointer-events-none bg-green-500 text-white">
                User
            </button>
        </div >
    );
}

export default ServiceSelector;
