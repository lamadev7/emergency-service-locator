import React, { useState } from "react";
import { getCellStyles } from "../utils/index.ts";
import { calculateNearestService } from "../services/index.ts";

function Grid({ grid, onGridUpdate, setLoading, setNearestServiceInfo }) {
    const [nearestService, setNearestService] = useState(null); // Stores the nearest service details
    const [path, setPath] = useState([]); // Stores the path cells

    // Handles the cell click event
    const handleCellClick = async (row: number, col: number) => {
        try {
            setLoading(true);

            // Update the grid with the selected cell value
            onGridUpdate(row, col, "U");

            // Fetch nearest service and path information
            const response = await calculateNearestService([row, col]);
            const { nearestService, path } = response || {};

            // Update nearest service details
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

            // Update the path if available
            if (path) setPath(path);
        } catch (error) {
            console.error("Error fetching nearest service:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="grid grid-cols-16 gap-1 p-2">
            {
                grid.map((row: any[], rowIndex: any) =>
                    row.map((cell: any, colIndex: any) => (
                        <div
                            key={`${rowIndex}-${colIndex}`}
                            className={getCellStyles(cell, rowIndex, colIndex, nearestService, path)}
                            onClick={() => handleCellClick(rowIndex, colIndex)}
                        >
                            {cell}
                        </div>
                    ))
                )
            }
        </div>
    );
}

export default Grid;