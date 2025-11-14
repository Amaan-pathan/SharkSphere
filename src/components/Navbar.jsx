import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import Button from './Button.jsx';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="sticky top-0 z-50 bg-surface/95 backdrop-blur-xl border-b border-charcoal"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-xl bg-gold flex items-center justify-center"
            >
              <span className="text-black font-bold text-lg">E</span>
            </motion.div>
            <div>
              <div className="text-lg font-bold text-text-primary">E-Cell</div>
              <div className="text-[10px] text-gold-muted font-semibold tracking-wider uppercase">NST</div>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            {user ? (
              <>
                <NavLink to="/dashboard" isActive={isActive('/dashboard')}>
                  Dashboard
                </NavLink>
                <NavLink to="/create-idea" isActive={isActive('/create-idea')}>
                  Create
                </NavLink>
                <NavLink to="/profile" isActive={isActive('/profile')}>
                  Profile
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="ml-4 px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" isActive={isActive('/login')}>
                  Login
                </NavLink>
                <Link to="/signup" className="ml-4">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </>
            )}
            <button
              onClick={toggleTheme}
              className="ml-4 p-2 rounded-lg hover:bg-surface transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

const NavLink = ({ to, isActive, children }) => {
  return (
    <Link
      to={to}
      className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
        isActive
          ? 'text-text-primary'
          : 'text-text-secondary hover:text-text-primary'
      }`}
    >
      {children}
      {isActive && (
        <motion.div
          layoutId="activeTab"
          className="absolute inset-0 bg-surface rounded-lg"
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        />
      )}
    </Link>
  );
};

export default Navbar;
