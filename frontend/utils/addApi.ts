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

export const addBirthCert = async (birth_cert_no: string) => {
    const token = localStorage.getItem('token')
    setAuthToken(token)
    try {
        const response = await api.post(`api/adddocs/birthcert/${birth_cert_no}`);
        console.log(response.data)
        return response.data
    } catch (error) {
        if (error instanceof AxiosError && error.response) {
            const errorMessage: string = error.response.data.detail || 'Birth certificate add failed';
            return errorMessage
        }
    }
};


export const addDeathCert = async (death_cert_no: string) => {
    const token = localStorage.getItem('token')
    setAuthToken(token)
    try {
        const response = await api.post(`api/adddocs/deathcert/${death_cert_no}`);
        console.log(response.data)
        return response.data
    } catch (error) {
        if (error instanceof AxiosError && error.response) {
            const errorMessage: string = error.response.data.detail || 'Death certificate add failed';
            return errorMessage
        }
    }
};

