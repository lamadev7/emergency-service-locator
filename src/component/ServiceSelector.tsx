import React from "react";

function ServiceSelector({ selectedService, setSelectedService }) {
    return (
        <div className="flex justify-center gap-4 mb-4">
            <button
                onClick={() => setSelectedService("ambulance")}
                className={`px-4 py-2 rounded ${selectedService === "ambulance" ? "bg-red-500 text-white" : "bg-gray-300"
                    }`}
            >
                Ambulance
            </button>
            <button
                onClick={() => setSelectedService("hospital")}
                className={`px-4 py-2 rounded ${selectedService === "hospital" ? "bg-blue-500 text-white" : "bg-gray-300"
                    }`}
            >
                Hospital
            </button>
            <button
                onClick={() => setSelectedService("user")}
                className={`px-4 py-2 rounded ${selectedService === "user" ? "bg-green-500 text-white" : "bg-gray-300"
                    }`}
            >
                User
            </button>
        </div>
    );
}

export default ServiceSelector;
