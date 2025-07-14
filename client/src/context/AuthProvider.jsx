import { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import API from '../services/Api';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  
  const refreshSavedJobs = async () => {
    if (!user) return;
    try {
      const res = await API.get('/user/saved', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const updatedUser = {
        ...user,
        savedJobs: res.data.map((job) => job._id),
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (err) {
      console.error('Failed to refresh saved jobs', err);
    }
  };

 
  useEffect(() => {
    const fetchUserAndSavedJobs = async () => {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) return;

      const parsedUser = JSON.parse(storedUser);

      try {
        const res = await API.get('/user/saved', {
          headers: {
            Authorization: `Bearer ${parsedUser.token}`,
          },
        });

        const updatedUser = {
          ...parsedUser,
          savedJobs: res.data.map((job) => job._id),
        };

        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
      } catch (err) {
        console.error('Failed to fetch saved jobs on mount:', err);
      }
    };

    fetchUserAndSavedJobs();
  }, []);

  const login = async (userData) => {
    const savedRes = await API.get('/user/saved', {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    });

    const updatedUser = {
      ...userData,
      savedJobs: savedRes.data.map((job) => job._id),
    };

    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const register = async (formData) => {
    const res = await API.post('/auth/register', formData);
    const userData = res.data;
    localStorage.setItem('token', userData.token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, refreshSavedJobs }}
    >
      {children}
    </AuthContext.Provider>
  );
};
