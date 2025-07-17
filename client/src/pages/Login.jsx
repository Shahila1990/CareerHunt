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
      console.error('Login failed:', err);
      toast.error('Invalid User.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12">
      <AuthForm title="Login" onSubmit={handleSubmit} />
    </div>
  );
};

export default Login;
