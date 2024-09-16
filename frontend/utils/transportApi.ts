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




export const fetchAllStartingPoints = async () => {
    const token = localStorage.getItem('token')
    setAuthToken(token)

    try {
        const response = await api.get("api/transportroute/startpoint");
        return response.data
    } catch (error) {
        if (error instanceof AxiosError && error.response) {
            const errorMessage: string = error.response.data.detail || 'couldn"t post msg/notification';
            return errorMessage
        }
    }
}

export const fetchPossibleDestination = async (start: string) => {
  const token = localStorage.getItem('token')
  setAuthToken(token)

  try {
      const response = await api.post(`api/transportroute/possibledestination/${start}`);
      return response.data
  } catch (error) {
      if (error instanceof AxiosError && error.response) {
          const errorMessage: string = error.response.data.detail || 'couldn"t post msg/notification';
          return errorMessage
      }
  }

}


export const fetchAllTransport = async (route_id: string) => {
  const token = localStorage.getItem('token')
  setAuthToken(token)

  try {
      const response = await api.get(`api/transportroute/alltransport/${route_id}`);
      return response.data
  } catch (error) {
      if (error instanceof AxiosError && error.response) {
          const errorMessage: string = error.response.data.detail || 'couldn"t post msg/notification';
          return errorMessage
      }
  }
}