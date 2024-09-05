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


export const downloadBirthCert = async (filePath: string): Promise<string | undefined> => {
    const token = localStorage.getItem('token')
    setAuthToken(token)
    try {
      const response = await api.get(`api/download/birthcert/${filePath}`, {responseType: 'blob'});
      const url = window.URL.createObjectURL(new Blob([response.data]));
      return url
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const errorMessage: string = error.response.data.detail || 'Birth certificate Not found';
        return errorMessage
    }
  }
  };


export const downloadDeathCert = async (filePath: string): Promise<string | undefined> => {
    const token = localStorage.getItem('token')
    setAuthToken(token)
    try {
      const response = await api.get(`api/download/deathcert/${filePath}`, {responseType: 'blob'});
      const url = window.URL.createObjectURL(new Blob([response.data]));
      return url
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const errorMessage: string = error.response.data.detail || 'Death certificate Not found';
        return errorMessage
    }
  }
  };