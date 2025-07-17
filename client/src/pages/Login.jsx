import React from 'react';
import AuthForm from '../components/AuthForm';
import { useAuth } from '../context/useAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      await login(formData);
      navigate('/'); 
    } catch (err) {
      if (err.response) {
        const status = err.response.status;

        if (status === 401) {
          toast.error('Invalid credentials.');
        } else if (status === 403) {
          toast.error('Access denied.');
        } else if (status === 500) {
          toast.error('Server error. Please try again later.');
        } else {
          toast.error(err.response.data?.message || 'Login failed.');
        }
      } else {
        toast.error('Network error. Please check your connection.');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12">
      <AuthForm title="Login" onSubmit={handleSubmit} />
    </div>
  );
};

export default Login;
