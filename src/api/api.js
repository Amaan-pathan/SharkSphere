import axios from 'axios';

// In development, use Vite proxy to avoid CORS issues
// In production, use VITE_API_URL if set
const getBaseURL = () => {
  if (import.meta.env.DEV) {
    // Development: use Vite proxy (relative path) - this bypasses CORS
    return '/api';
  }
  // Production: use environment variable or default
  const apiUrl = import.meta.env.VITE_API_URL || 'https://sharkssphere-backend.onrender.com';
  // Ensure we append /api if not already present
  return apiUrl.endsWith('/api') ? apiUrl : `${apiUrl}/api`;
};

const api = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 second timeout for all requests (increased for slow backend)
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only log detailed errors in development, and skip timeout errors
    if (import.meta.env.DEV && error.code !== 'ECONNABORTED') {
      console.error('API Error:', {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          baseURL: error.config?.baseURL,
        }
      });
    }

    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

