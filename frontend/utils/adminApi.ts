import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL; 

// export interface UserInfo {
//   name: string;
//   father: string;
//   mother: string;
//   address: string;
// }

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


export const createBithCertificate = async (name: string, father: string, mother: string, address: string) => {
    const token = localStorage.getItem('token')
    console.log(token)
    setAuthToken(token)
    const user_info_payload= {
        name: name,
        father: father,
        mother: mother, 
        address: address
    }
    const response = await api.post('api/admin/createbirthcert', user_info_payload);
    const birth_cert_info = response.data
    return birth_cert_info;
  };