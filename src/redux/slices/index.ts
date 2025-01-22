import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ServiceState {
    grid: string[][];
    selectedService: string;
    nearestServiceInfo: any | null;
}

const initialState: ServiceState = {
    grid: Array.from({ length: 13 }, () => Array.from({ length: 16 }, () => "Z")),
    selectedService: "ambulance",
    nearestServiceInfo: null,
};

const serviceSlice = createSlice({
    name: "service",
    initialState,
    reducers: {
        updateGrid(state, action: PayloadAction<{ row: number; col: number; value: string }>) {
            state.grid[action.payload.row][action.payload.col] = action.payload.value;
        },
        setSelectedService(state, action: PayloadAction<string>) {
            state.selectedService = action.payload;
        },
        setNearestServiceInfo(state, action: PayloadAction<any | null>) {
            state.nearestServiceInfo = action.payload;
        },
        setGrid(state, action: PayloadAction<string[][]>) {
            state.grid = action.payload;
        },
    },
});

export const { updateGrid, setSelectedService, setNearestServiceInfo, setGrid } = serviceSlice.actions;

export default serviceSlice.reducer;
