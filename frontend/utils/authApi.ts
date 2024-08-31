// utils/api.ts
import axios from 'axios';


const API_URL = process.env.NEXT_PUBLIC_API_URL; 

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

export const setAuthToken = (token: string) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export const signup = async (name: string, email: string, password: string) => {
  const signupData = {
      name: name,
      email: email,  
      password: password
    };     
  const response = await api.post('api/auth/signup',signupData);
  return response.data;
};

export const login = async (email: string, password: string) => {
  const loginData = {
    username: email,  
    password: password
  };    
  const response = await api.post('api/auth/login', loginData);
  return response.data;
};
