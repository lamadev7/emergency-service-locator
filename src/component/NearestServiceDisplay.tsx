import React from "react";
import { useDispatch } from "react-redux";
import { getServiceAvailability, updateServiceAvailability } from "../services/index.ts";
import { setNearestServiceInfo } from "../redux/slices/index.ts";

function NearestServiceDisplay({ nearestServiceInfo }) {
    const dispatch = useDispatch();
    const { serviceType, distance, location, status, id } = nearestServiceInfo;

    const handleStatusToggle = async () => {
        try {
            const newStatus = status === "open" ? "close" : "open";

            await updateServiceAvailability(id, newStatus);
            const serviceInfo = await getServiceAvailability(id);
            dispatch(setNearestServiceInfo({ ...nearestServiceInfo, status: serviceInfo?.status }))
        } catch (error) {
            console.error("Error updating service status:", error);
        }
    };

    return (
        <div className="p-4 bg-white shadow rounded mt-4">
            <h2 className="text-lg font-bold mb-2">Nearest Service Info</h2>
            <p>
                <strong>Type:</strong> {serviceType}
            </p>
            <p>
                <strong>Distance:</strong> {distance}
            </p>
            <p>
                <strong>Location:</strong> Row {location.row}, Col {location.col}
            </p>
            <div className="flex items-center gap-2 mt-2">
                <p>
                    <strong>Status:</strong> {status}
                </p>
                {status && (
                    <button
                        onClick={handleStatusToggle}
                        className="px-4 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        {status === "open" ? "Close" : "Open"}
                    </button>
                )}
            </div>
        </div>
    );
}

export default NearestServiceDisplay;
