// context/useAuth.js or AuthProvider.jsx
import {jwtDecode} from 'jwt-decode';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuthCheck = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const now = Date.now();

        if (decoded.exp * 1000 < now) {
          // Token expired
          localStorage.removeItem('token');
          // Clear user context if any
          navigate('/login'); // Redirect to login page
        } else {
          // Optional: set a timer to auto logout at exact expiry
          const timeUntilExpiry = decoded.exp * 1000 - now;
          setTimeout(() => {
            localStorage.removeItem('token');
            navigate('/login');
          }, timeUntilExpiry);
        }
      } catch (err) {
        // Invalid token
        localStorage.removeItem('token');
        navigate('/login');
      }
    }
  }, []);
};

export default useAuthCheck;
