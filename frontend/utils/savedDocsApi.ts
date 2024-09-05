import { AxiosError } from "axios";
import axios from "axios";


const API_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const setAuthToken = (token: string | null) => {
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};


export const savedDocs = async () => {
    const token = localStorage.getItem('token')
    setAuthToken(token)
    try {
        const response = await api.get("api/saveddocs/alldocs");
        return response.data
    } catch (error) {
        if (error instanceof AxiosError && error.response) {
            const errorMessage: string = error.response.data.detail || 'All docs fetch failed';
            return errorMessage
        }
    }
};
