import axios from 'axios';

export const fetchHospitalServices = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/services`, { params: { type: 'hospital' } });
        return response?.data?.data ?? [];
    } catch (error) {
        console.error("Error fetching hospital services:", error);
        return [];
    }
};

export const fetchAmbulanceServices = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/services`, { params: { type: 'ambulance' } });
        return response?.data?.data ?? [];
    } catch (error) {
        console.error("Error fetching ambulance services:", error);
        return [];
    }
};

export const calculateNearestService = async (currentLocation: [number, number]) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/services/nearest`, {
            params: { currentLocation },
        });
        return response?.data?.data;
    } catch (error) {
        console.error("Error fetching nearest services:", error);
        return [];
    }
};


export const getServiceAvailability = async (serviceId: string) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/services/status`, { params: { serviceId } });
        return response?.data?.data;
    } catch (error) {
        console.error("Error fetching ambulance services:", error);
        return [];
    }
};

export const updateServiceAvailability = async (serviceId: string, status: string) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/services/update`, {
            serviceId,
            status
        });
        return response?.data?.data;
    } catch (error) {
        console.error("Error fetching nearest services:", error);
        return [];
    }
};


