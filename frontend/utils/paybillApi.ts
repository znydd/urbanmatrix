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

export const fetchElectricityBillInfo = async () => {
    const token = localStorage.getItem('token')
    setAuthToken(token)

    try {
        const response = await api.get("api/paybill/electricity");
        return response.data
    } catch (error) {
        if (error instanceof AxiosError && error.response) {
            const errorMessage: string = error.response.data.detail || 'couldn"t get e-bill info';
            return errorMessage
        }
    }
}

export const payMonthlyElectricityBill = async (month: string) => {
    const token = localStorage.getItem('token')
    setAuthToken(token)

    try {
        const response = await api.post(`api/paybill/electricitypay/${month}`);
        return response.data
    } catch (error) {
        if (error instanceof AxiosError && error.response) {
            const errorMessage: string = error.response.data.detail || 'couldn"t get e-bill info';
            return errorMessage
        }
    }
}




export const fetchGasBillInfo = async () => {
    const token = localStorage.getItem('token')
    setAuthToken(token)

    try {
        const response = await api.get("api/paybill/gas");
        return response.data
    } catch (error) {
        if (error instanceof AxiosError && error.response) {
            const errorMessage: string = error.response.data.detail || 'couldn"t get e-bill info';
            return errorMessage
        }
    }
}


export const payMonthlyGasBill = async (month: string) => {
    const token = localStorage.getItem('token')
    setAuthToken(token)

    try {
        const response = await api.post(`api/paybill/gaspay/${month}`);
        return response.data
    } catch (error) {
        if (error instanceof AxiosError && error.response) {
            const errorMessage: string = error.response.data.detail || 'couldn"t get e-bill info';
            return errorMessage
        }
    }
}



export const fetchWaterBillInfo = async () => {
    const token = localStorage.getItem('token')
    setAuthToken(token)

    try {
        const response = await api.get("api/paybill/water");
        return response.data
    } catch (error) {
        if (error instanceof AxiosError && error.response) {
            const errorMessage: string = error.response.data.detail || 'couldn"t get e-bill info';
            return errorMessage
        }
    }
}


export const payMonthlyWaterBill = async (month: string) => {
    const token = localStorage.getItem('token')
    setAuthToken(token)

    try {
        const response = await api.post(`api/paybill/waterpay/${month}`);
        return response.data
    } catch (error) {
        if (error instanceof AxiosError && error.response) {
            const errorMessage: string = error.response.data.detail || 'couldn"t get e-bill info';
            return errorMessage
        }
    }
}