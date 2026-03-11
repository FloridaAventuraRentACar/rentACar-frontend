import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '', 
});

// Interceptor para agregar el token y la apiKey automáticamente
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers.apiKey = import.meta.env.VITE_API_KEY;
  return config;
  
});

export default axiosInstance;
