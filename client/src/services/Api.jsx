import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import dayjs from 'dayjs';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  withCredentials: true
});

API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user?.token;
  //console.log(token);
  

  if (token) {
    const decoded = jwtDecode(token);
    const isExpired = dayjs.unix(decoded.exp).isBefore(dayjs());

    if (isExpired) {
      localStorage.removeItem('user');
      window.location.href = '/login';
      throw new axios.Cancel('Token expired');
    }

    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;
