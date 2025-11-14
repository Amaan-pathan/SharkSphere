import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register as registerApi } from '../api/auth.js';

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
        // Redirect after 3 seconds
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    } catch (err) {
      // Handle validation errors array or single message
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
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Create an account</h1>
          <p className="text-gray-400">Get started with your ideas</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {success && (
            <div className="bg-green-900/20 border border-green-800 text-green-300 px-4 py-3 rounded-md text-sm">
              {success}
            </div>
          )}
          {error && (
            <div className="bg-red-900/20 border border-red-800 text-red-300 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              minLength={2}
              maxLength={50}
              pattern="[a-zA-Z\s]+"
              className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors"
              placeholder="John Doe"
            />
            <p className="mt-1 text-xs text-gray-500">2-50 characters, letters and spaces only</p>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors"
              placeholder="you@adypu.edu.in"
            />
            <p className="mt-1 text-xs text-gray-500">Must be from @adypu.edu.in domain</p>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors"
              placeholder="••••••••"
            />
            <p className="mt-1 text-xs text-gray-500">Minimum 8 characters with uppercase, lowercase, and number</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent hover:bg-accent-dark text-white font-medium py-3 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-accent hover:text-accent-light transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;

