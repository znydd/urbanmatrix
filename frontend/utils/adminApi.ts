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


export const createBithCertificate = async (name: string, father: string, mother: string, dob:string | null, address: string) => {
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
      return response.data
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const errorMessage: string = error.response.data.detail || 'Api failed for create birth certificate';
        return errorMessage
    }
  }
  };

export const createNid = async (name: string, father: string, mother: string, email: string | null, dob: string | null, birth_cert_no: string | number | null, address: string) => {
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
      return response.data
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const errorMessage: string = error.response.data.detail || 'Api failed for create nid';
        return errorMessage
    }
  }
  };

  export const createDeathCertificate = async (name: string, father: string, mother: string, dod: string | null, birth_cert_no: string | number | null, address: string) => {
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
      return response.data
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 409) {
        const errorMessage: string = error.response.data.detail || 'Conflict occurred';
        return errorMessage
    }
  }
  };

  export const getAllReq = async () => {
    const token = localStorage.getItem('token')
    setAuthToken(token)
    try {
        const response = await api.get("api/admin/allregreq");
        return response.data
    } catch (error) {
        if (error instanceof AxiosError && error.response) {
            const errorMessage: string = error.response.data.detail || 'All docs fetch failed';
            return errorMessage
        }
    }
};



export const downloadAnyDocs = async (filePath: string): Promise<string | undefined> => {
  const token = localStorage.getItem('token')
  setAuthToken(token)
  let split = filePath.split("/");
  filePath = split[0] + "<>" + split[1] + "<>" + split[2];
  console.log(filePath)
  try {
    const response = await api.get(`api/download/anydocs/${filePath}`, {responseType: 'blob'});
    const url = window.URL.createObjectURL(new Blob([response.data]));
    return url
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      const errorMessage: string = error.response.data.detail || 'Death certificate Not found';
      return errorMessage
  }
}
};

export const removeReq = async (req_id: string, doc_type: string) => {
  const token = localStorage.getItem('token')
  console.log(token)
  setAuthToken(token)
  try {
    const response = await api.delete(`api/admin/deletereq/${req_id}<>${doc_type}`, );
    return response.statusText
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 409) {
      const errorMessage: string = error.response.data.detail || 'Conflict occurred';
      return errorMessage
  }
}
}; 



export const approveIssue = async (issue_id: number) => {
  const token = localStorage.getItem('token')
  setAuthToken(token)

  try {
      const response = await api.put(`api/admin/approveissue/${issue_id}`);
      return response.data
  } catch (error) {
      if (error instanceof AxiosError && error.response) {
          const errorMessage: string = error.response.data.detail || "couldn't post issue";
          return errorMessage
      }
  }

}