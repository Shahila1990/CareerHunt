import AuthForm from '../components/AuthForm';
import {useAuth} from '../context/useAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      await register(formData);
      navigate('/');
    } catch (err) {
      console.error('Registration failed:', err);
      toast.error('Something went wrong. Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12">
      <AuthForm title="Register" onSubmit={handleSubmit} />
    </div>
  );
};

export default Register;
