import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { Menu, X } from 'lucide-react'; // or use Heroicons/FontAwesome

const NavBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md px-4 py-3 flex justify-between items-center relative z-30">
      {/* Logo */}
      <Link to="/" className="text-xl font-bold text-desaturatedDarkCyan">
        CareerHunt
      </Link>

      {/* Hamburger Icon (Mobile) */}
      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          className="text-desaturatedDarkCyan focus:outline-none"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Links (Desktop) */}
      <div className="hidden md:flex space-x-4 items-center">
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

        {/* {user && !user.isAdmin && (
          <Link
            to="/saved"
            className="text-desaturatedDarkCyan font-medium hover:underline"
          >
            Saved Jobs
          </Link>
        )} */}

        {user && !user.isAdmin && (
          <Link
            to="/profile"
            className="text-desaturatedDarkCyan font-medium hover:underline"
          >
            My Profile
          </Link>
        )}

        {user?.isAdmin && (
          <Link
            to="/admin"
            className="text-veryDarkGrayishCyan font-semibold hover:underline"
          >
            Admin Dashboard
          </Link>
        )}

        {user && (
          <button
            onClick={handleLogout}
            className="text-desaturatedDarkCyan font-medium hover:underline"
          >
            Logout
          </button>
        )}
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md rounded-b-md flex flex-col items-start px-4 py-3 space-y-2 md:hidden">
          {!user && (
            <>
              <Link
                to="/login"
                onClick={toggleMenu}
                className="text-desaturatedDarkCyan font-medium hover:underline"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={toggleMenu}
                className="text-desaturatedDarkCyan font-medium hover:underline"
              >
                Register
              </Link>
            </>
          )}

          {/* {user && !user.isAdmin && (
            <Link
              to="/saved"
              onClick={toggleMenu}
              className="text-desaturatedDarkCyan font-medium hover:underline"
            >
              Saved Jobs
            </Link>
          )} */}

          {user && !user.isAdmin && (
            <Link to="/profile" className="text-sm">
              My Profile
            </Link>
          )}

          {user?.isAdmin && (
            <Link
              to="/admin"
              onClick={toggleMenu}
              className="veryDarkGrayishCyan font-semibold hover:underline"
            >
              Admin Dashboard
            </Link>
          )}

          {user && (
            <button
              onClick={() => {
                toggleMenu();
                handleLogout();
              }}
              className="text-desaturatedDarkCyan font-medium hover:underline"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
