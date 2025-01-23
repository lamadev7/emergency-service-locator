import React, { useState } from "react";
import { calculateNearestService } from "../services/index.ts";

function Grid({ grid, onGridUpdate, setLoading, setNearestServiceInfo }) {
    const [nearestService, setNearestService] = useState(null); // Store nearest service cell coordinates
    const [path, setPath] = useState([]); // Store the path cells

    const handleCellClick = async (row, col) => {
        try {
            setLoading(true);
            const newValue = "U";
            onGridUpdate(row, col, newValue);
            const res = await calculateNearestService([row, col]);
            const nearestService = res?.nearestService;

            if (nearestService) {
                setNearestService(nearestService);
                setNearestServiceInfo({
                    id: nearestService.id,
                    serviceType: nearestService.serviceType,
                    distance: nearestService.distance,
                    location: nearestService.location,
                    status: nearestService.status,
                });
            }
            if (res?.path) setPath(res.path);


        } catch (error) {
            console.error(error)
        } finally {
            setLoading(true);
        }
    };

    return (
        <div className="grid grid-cols-16 gap-1 p-2">
            {grid.map((row, rowIndex) =>
                row.map((cell, colIndex) => (
                    <div
                        key={`${rowIndex}-${colIndex}`}
                        className={`w-10 h-10 flex items-center justify-center border ${cell === "X"
                            ? "bg-red-500 text-white"
                            : cell === "Y"
                                ? "bg-blue-500 text-white"
                                : cell === "U"
                                    ? "bg-green-500 text-white"
                                    : "bg-gray-200"
                            } cursor-pointer ${nearestService &&
                                nearestService.row === rowIndex &&
                                nearestService.col === colIndex
                                ? "border-4 border-yellow-500" // Highlight nearest result
                                : ""
                            } ${path.some(([r, c]) => r === rowIndex && c === colIndex)
                                ? "border-4 border-green-500" // Highlight the path with green border
                                : ""
                            }`}
                        onClick={() => handleCellClick(rowIndex, colIndex)}
                    >
                        {cell}
                    </div>
                ))
            )}
        </div>
    );
}

export default Grid;
