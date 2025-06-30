
import axios, { AxiosInstance } from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

instance.interceptors.response.use(
  (response:any) => response,
  (error:any) => {
    console.error('Erreur Axios:', error.response?.data?.message || error.message);
    return Promise.reject(error);
  }
);

export default instance;