import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL; 

export interface UserInfo {
  bidder: boolean;
  birth_cert: null | number; // Allow null or number for birth_cert
  email: string;
  name: string;
  nid: null | number; // Allow null or number for nid
}

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


export const getUserInfo = async () => {
    const token = localStorage.getItem('token')
    console.log(token)
    setAuthToken(token)
    const response = await api.get('api/user/userinfo');
    const userInfo: UserInfo = response.data
    return userInfo;
  };