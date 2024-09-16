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


export const postIssue = async (issue_type: string,issue_title:string, issue_desc: string) => {
    const token = localStorage.getItem('token')
    setAuthToken(token)
    const issuePayload = {
        issue_type: issue_type,
        issue_title: issue_title,
        issue_desc: issue_desc
    }

    try {
        const response = await api.post("api/raiseissue/postissue", issuePayload);
        return response.data
    } catch (error) {
        if (error instanceof AxiosError && error.response) {
            const errorMessage: string = error.response.data.detail || "couldn't post issue";
            return errorMessage
        }
    }
  
  }


  export const fetchAllIssues = async () => {
    const token = localStorage.getItem('token')
    setAuthToken(token)
  
    try {
        const response = await api.get(`api/raiseissue/getallissue`);
        return response.data
    } catch (error) {
        if (error instanceof AxiosError && error.response) {
            const errorMessage: string = error.response.data.detail || 'couldn"t post msg/notification';
            return errorMessage
        }
    }
  }
  

  export const fetchFilterIssues = async (issue_type: string) => {
    const token = localStorage.getItem('token')
    setAuthToken(token)
  
    try {
        const response = await api.get(`api/raiseissue/getfilteredissue/${issue_type}`);
        return response.data
    } catch (error) {
        if (error instanceof AxiosError && error.response) {
            const errorMessage: string = error.response.data.detail || 'couldn"t post msg/notification';
            return errorMessage
        }
    }
  }