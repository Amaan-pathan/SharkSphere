import api from './api.js';

export const register = async (email, password, name) => {
  const response = await api.post('/auth/register', { email, password, name });
  return response.data;
};

export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const getMe = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

