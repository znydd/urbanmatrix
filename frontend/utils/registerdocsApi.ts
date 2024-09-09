import { AxiosError } from "axios";
import axios from "axios";


const API_URL = process.env.NEXT_PUBLIC_API_URL; 

const api = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'maltipart/form-data',
    },
  });

const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};


export const registerBithCert = async (formData: FormData) => {
    const token = localStorage.getItem('token')
    setAuthToken(token)
   
    try {
      const response = await api.post('api/registerdocs/birthcert', formData);
      console.log(response.statusText)
      return response.statusText
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const errorMessage: string = error.response.data.detail || 'Api failed for create birth certificate';
        return errorMessage
    }
  }
  };


  export const registerNid = async (formData: FormData) => {
    const token = localStorage.getItem('token')
    setAuthToken(token)
   
    try {
      const response = await api.post('api/registerdocs/nid', formData);
      console.log(response.statusText)
      return response.statusText
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const errorMessage: string = error.response.data.detail || 'Api failed for create NID';
        return errorMessage
    }
  }
  };

  export const registerDeathCert = async (formData: FormData) => {
    const token = localStorage.getItem('token')
    setAuthToken(token)
   
    try {
      const response = await api.post('api/registerdocs/deathcert', formData);
      console.log(response.statusText)
      return response.statusText
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const errorMessage: string = error.response.data.detail || 'Api failed for create Death Certificate';
        return errorMessage
    }
  }
  };