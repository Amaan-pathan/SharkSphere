import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { register as registerApi } from '../api/auth.js';
import Input from '../components/Input.jsx';
import Button from '../components/Button.jsx';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await registerApi(email, password, name);
      if (response.success) {
        setSuccess(response.message || 'Registration successful! Please check your email to verify your account.');
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    } catch (err) {
      if (err.response?.data?.errors && Array.isArray(err.response.data.errors)) {
        setError(err.response.data.errors.join(', '));
      } else {
        setError(err.response?.data?.message || 'Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-navy flex items-center justify-center px-6 sm:px-8 py-12 pt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
              <span className="text-white font-bold text-xl">E</span>
            </div>
            <div className="text-left">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">E-Cell</div>
              <div className="text-xs text-gold font-semibold tracking-wider uppercase">NST</div>
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-3 text-gray-900 dark:text-white">Create Account</h1>
          <p className="text-gray-600 dark:text-gray-400">Start your entrepreneurial journey today</p>
        </div>

        <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8 shadow-card">
          <form onSubmit={handleSubmit} className="space-y-6">
            {success && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 text-green-700 dark:text-green-300 px-4 py-3 rounded-xl text-sm"
              >
                {success}
              </motion.div>
            )}
            {error && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-red-700 dark:text-red-300 px-4 py-3 rounded-xl text-sm"
              >
                {error}
              </motion.div>
            )}

            <Input
              label="Full Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              minLength={2}
              maxLength={50}
              pattern="[a-zA-Z\s]+"
              placeholder="John Doe"
              helperText="2-50 characters, letters and spaces only"
            />

            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@nst.edu.in"
              helperText="Must be from @nst.edu.in domain"
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              placeholder="Create a strong password"
              helperText="Minimum 8 characters with uppercase, lowercase, and number"
            />

            <Button type="submit" loading={loading} className="w-full">
              Sign Up
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-accent hover:text-accent-dark font-semibold transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
