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


export const createBithCertificate = async (name: string, father: string, mother: string, dob:string, address: string) => {
    const token = localStorage.getItem('token')
    setAuthToken(token)
    const user_info_payload= {
        name: name,
        father: father,
        mother: mother, 
        dob: dob,
        address: address
    }
    try {
      const response = await api.post('api/admin/createbirthcert', user_info_payload);
      return response.statusText
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const errorMessage: string = error.response.data.detail || 'Api failed for create birth certificate';
        return errorMessage
    }
  }
  };

export const createNid = async (name: string, father: string, mother: string, email: string, dob: string, birth_cert_no: string, address: string) => {
    const token = localStorage.getItem('token')
    console.log(token)
    setAuthToken(token)
    const user_info_payload= {
        name: name,
        father: father,
        mother: mother, 
        email: email,
        dob: dob,
        birth_cert_no:birth_cert_no,
        address: address
    }
    try {
      const response = await api.post('api/admin/createnid', user_info_payload);
      return response.statusText
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const errorMessage: string = error.response.data.detail || 'Api failed for create nid';
        return errorMessage
    }
  }
  };

  export const createDeathCertificate = async (name: string, father: string, mother: string, dod: string, birth_cert_no: string, address: string) => {
    const token = localStorage.getItem('token')
    console.log(token)
    setAuthToken(token)
    const user_info_payload= {
        name: name,
        father: father,
        mother: mother,
        dod:dod,
        birth_cert_no: birth_cert_no, 
        address: address
    }
    try {
      const response = await api.post('api/admin/createdeathcert', user_info_payload);
      return response.statusText
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 409) {
        const errorMessage: string = error.response.data.detail || 'Conflict occurred';
        return errorMessage
    }
  }
  };