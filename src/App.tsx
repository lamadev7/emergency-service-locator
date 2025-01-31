import React, { useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";

import Grid from "./component/Grid.tsx";
import { RootState, AppDispatch } from "./redux/store.ts";
import { useFetchServices } from "./services/reactQuery.ts";
import ServiceSelector from "./component/ServiceSelector.tsx";
import NearestServiceDisplay from "./component/NearestServiceDisplay.tsx";
import { setGrid, setSelectedService, setNearestServiceInfo } from "./redux/slices/index.ts";

const queryClient = new QueryClient();

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, isLoading } = useFetchServices();
  const { grid, nearestServiceInfo } = useSelector((state: RootState) => state.service);

  useEffect(() => {
    if (data) {
      const tempGrid = Array.from({ length: 13 }, () => Array.from({ length: 16 }, () => "Z"));
      [...(data.ambulances ?? []), ...(data.hospitals ?? [])].forEach(service => {
        const { location, type } = service;
        const [row, col] = location;
        const value = type === "ambulance" ? "X" : "Y";
        tempGrid[row][col] = value;
      });
      dispatch(setGrid(tempGrid));
    }
  }, [data, dispatch]);

  const handleGridUpdate = (row: string | number, col: string | number, value: string) => {
    let _grid = grid.map(innerArray => [...innerArray]); // Deep copy the grid
    _grid[row][col] = value; // Safely update the value
    dispatch(setGrid(_grid)); // Dispatch the updated grid
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-100 p-4">
        {
          isLoading && (
            <div className="h-screen w-screen opacity-[0.6] bg-slate-300 fixed top-0 left-0 flex items-center justify-center">
              <ClipLoader />
            </div>
          )
        }
        <h1 className="text-2xl font-bold text-center mb-4">Interactive Service Grid</h1>
        <ServiceSelector setSelectedService={(service: string) => dispatch(setSelectedService(service))} />
        <Grid
          grid={grid}
          setLoading={() => { }}
          onGridUpdate={handleGridUpdate}
          setNearestServiceInfo={(info: any) => dispatch(setNearestServiceInfo(info))}
        />
        {
          nearestServiceInfo && (
            <NearestServiceDisplay nearestServiceInfo={nearestServiceInfo} />
          )
        }
      </div>
    </QueryClientProvider>
  );
}

export default App;
