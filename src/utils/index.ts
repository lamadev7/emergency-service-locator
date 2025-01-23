// Determines the appropriate styles for a cell based on its state
export const getCellStyles = (cell: string, rowIndex: any, colIndex: any, nearestService: any, path) => {
    let baseStyles = "w-10 h-10 flex items-center justify-center border cursor-pointer";

    // Add background color based on cell value
    if (cell === "X") baseStyles += " bg-red-500 text-white";
    else if (cell === "Y") baseStyles += " bg-blue-500 text-white";
    else if (cell === "U") baseStyles += " bg-green-500 text-white";
    else baseStyles += " bg-gray-200";

    // Highlight the nearest service
    if (
        nearestService &&
        nearestService.row === rowIndex &&
        nearestService.col === colIndex
    ) {
        baseStyles += " border-4 border-yellow-500";
    }

    // Highlight the path
    if (path.some(([r, c]) => r === rowIndex && c === colIndex)) {
        baseStyles += " border-4 border-green-500";
    }

    return baseStyles;
};