import React from "react";
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import { setNearestServiceInfo } from "../redux/slices/index.ts";
import { getServiceAvailability, updateServiceAvailability } from "../services/index.ts";

function NearestServiceDisplay({ nearestServiceInfo }) {
    const dispatch = useDispatch();
    const { serviceType, distance, location, status, id } = nearestServiceInfo;
    const isServiceOpen = status === "open";

    const handleStatusToggle = async () => {
        try {
            const newStatus = isServiceOpen ? "close" : "open";

            await updateServiceAvailability(id, newStatus);
            const serviceInfo = await getServiceAvailability(id);

            dispatch(setNearestServiceInfo({ ...nearestServiceInfo, status: serviceInfo == 'open' ? 'open' : 'close' }));
            toast.success("Status updated successfully!");
        } catch (error) {
            console.error("Error updating service status:", error);
            toast.success(error?.message ?? 'Error updating status!');
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
                        className={`px-4 py-1 text-sm ${isServiceOpen ? 'bg-red-500' : 'bg-blue-500'} text-white rounded hover:opacity-10`}
                    >
                        {isServiceOpen ? "Close" : "Open"}
                    </button>
                )}
            </div>
        </div>
    );
}

export default NearestServiceDisplay;
