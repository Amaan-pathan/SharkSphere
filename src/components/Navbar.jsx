import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-semibold text-white hover:text-accent transition-colors">
            Ecell
          </Link>

          <div className="flex items-center gap-6">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Dashboard
                </Link>
                <Link
                  to="/create-idea"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Create Idea
                </Link>
                <Link
                  to="/profile"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-accent hover:bg-accent-dark text-white px-4 py-2 rounded-md text-sm transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

