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


export const searchBirthCert = async (birth_cert_no: string) => {
    const token = localStorage.getItem('token')
    setAuthToken(token)
    const user_info_payload= {
        birth_cert_no: birth_cert_no
    }
    try {
      const response = await api.post('api/searchdocs/birthcert', user_info_payload);
      return response.data
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const errorMessage: string = error.response.data.detail || 'Birth certificate Not found';
        return errorMessage
    }
  }
  };

  export const searchDeathCert = async (death_cert_no: string) => {
    const token = localStorage.getItem('token')
    setAuthToken(token)
    const user_info_payload= {
        death_cert_no: death_cert_no
    }
    try {
      const response = await api.post('api/searchdocs/deathcert', user_info_payload);
      return response.data
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const errorMessage: string = error.response.data.detail || 'Death certificate Not found';
        return errorMessage
    }
  }
  };