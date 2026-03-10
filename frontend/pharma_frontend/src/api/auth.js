// src/api/auth.js
import api from './axiosConfig';

export const register = (payload) => api.post('auth/register/', payload);
export const login = (payload) => api.post('auth/token/', payload);
export const refresh = (refreshToken) => api.post('auth/token/refresh/', { refresh: refreshToken });
export const me = (accessToken) => api.get('auth/me/', {
  headers: { Authorization: `Bearer ${accessToken}` }
});