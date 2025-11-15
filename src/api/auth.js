import api from './api.js';

export const register = async (email, password, name) => {
  const data = { email, password, name };
  console.log('Registering with data:', { email, name, passwordLength: password.length });
  const response = await api.post('/auth/register', data);
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

