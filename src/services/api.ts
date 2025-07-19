import axios from 'axios';

const api = axios.create({
  baseURL: process.env.VITE_API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('@app:token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use( // TODO: tratar toda a gama de erros, triggar snack com erro 5xx
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('@app:token');
      localStorage.removeItem('@app:user');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

export default api;