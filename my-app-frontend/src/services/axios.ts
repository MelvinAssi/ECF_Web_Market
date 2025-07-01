import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

instance.interceptors.response.use(
  response => response,
  error => {
    console.error('Erreur Axios:', error.response?.data?.message || error.message);
    return Promise.reject(error);
  }
);

export default instance;
