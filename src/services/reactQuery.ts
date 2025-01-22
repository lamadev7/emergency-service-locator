import { useQuery } from "react-query";
import { fetchAmbulanceServices, fetchHospitalServices } from "./index.ts";

export const useFetchServices = () =>
    useQuery("services", async () => {
        const hospitals = await fetchHospitalServices();
        const ambulances = await fetchAmbulanceServices();

        return { hospitals, ambulances };
    });
