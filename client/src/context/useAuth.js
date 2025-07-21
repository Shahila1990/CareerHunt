// src/context/useAuth.js
import { useContext } from 'react';
import { AuthContext } from './AuthContext'; 
export function useAuth() {
  return useContext(AuthContext);
}

export function logoutUser() {
  localStorage.removeItem('user');
  setUser(null);
}