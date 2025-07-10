import { Link, useNavigate } from 'react-router-dom';
import {useAuth} from '../context/useAuth';

const NavBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md px-4 py-3 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-desaturatedDarkCyan">
        CareerHunt
      </Link>

      <div className="space-x-4">
        {!user && (
          <>
            <Link
              to="/login"
              className="text-desaturatedDarkCyan font-medium hover:underline"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-desaturatedDarkCyan font-medium hover:underline"
            >
              Register
            </Link>
          </>
        )}

        {user && (
          <>
            <Link
              to="/saved"
              className="text-desaturatedDarkCyan font-medium hover:underline"
            >
              Saved Jobs
            </Link>

            {user.isAdmin && (
              <Link
                to="/admin"
                className="veryDarkGrayishCyan font-semibold hover:underline"
              >
                Admin Dashboard
              </Link>
            )}

            <button
              onClick={handleLogout}
              className="text-gray-600 font-medium hover:underline"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
