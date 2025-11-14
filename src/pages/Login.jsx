import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { login as loginApi } from '../api/auth.js';
import { useAuth } from '../context/AuthContext.jsx';
import Input from '../components/Input.jsx';
import Button from '../components/Button.jsx';
import Card from '../components/Card.jsx';
import favicon from '../assets/favicon.jpeg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await loginApi(email, password);
      if (response.success) {
        login(response.user, response.token);
        navigate('/');
      }
    } catch (err) {
      // Handle timeout/network errors
      if (err.code === 'ECONNABORTED' || err.message?.includes('timeout')) {
        setError('Connection timeout. Please check if the backend server is running and try again.');
      } else if (err.response?.status === 403) {
        setError('Please verify your email before logging in. Check your inbox for the verification link.');
      } else if (err.response?.data?.errors && Array.isArray(err.response.data.errors)) {
        setError(err.response.data.errors.join(', '));
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.message && !err.message.includes('timeout')) {
        setError(`Error: ${err.message}`);
      } else {
        setError('Login failed. Please check if the backend server is running and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center px-6 sm:px-8 py-12 pt-24 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 left-10 w-96 h-96 bg-purple-DEFAULT/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, -60, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-neon/10 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-6">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="w-14 h-14 rounded-lg overflow-hidden shadow-glow-neon"
            >
              <img src={favicon} alt="NST E-Cell Logo" className="w-full h-full object-cover" />
            </motion.div>
            <div className="text-left">
              <div className="text-2xl font-bold text-text-heading">NST E-Cell</div>
              <div className="text-xs text-purple-neon font-semibold tracking-wider uppercase">Shark Sphere</div>
            </div>
          </div>
          <h1 className="text-h1 font-bold mb-3 text-text-heading">Welcome Back</h1>
          <p className="text-body-lg text-text-body">Sign in to continue your journey</p>
        </div>

        <Card glass className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm"
              >
                {error}
              </motion.div>
            )}

            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@nst.edu.in"
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />

            <Button type="submit" loading={loading} variant="neon" className="w-full">
              Sign In
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-text-body">
            Don't have an account?{' '}
            <Link to="/signup" className="text-purple-neon hover:text-purple-accent font-semibold transition-colors">
              Sign up
            </Link>
          </p>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;
