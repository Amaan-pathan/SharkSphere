import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { createIdea } from '../api/ideas.js';
import Button from '../components/Button.jsx';
import Input from '../components/Input.jsx';

const CreateIdea = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      const response = await createIdea(title, description);
      if (response.success) {
        setSuccess(true);
        setTitle('');
        setDescription('');
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create idea. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-navy text-gray-900 dark:text-white pt-24 pb-16 px-6 sm:px-8 lg:px-12">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <h1 className="text-h1 font-bold mb-4">Share Your Idea</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            What innovation are you building?
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8 shadow-card"
        >
          {success && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 text-green-700 dark:text-green-300 px-6 py-4 rounded-xl mb-8 text-center"
            >
              <div className="text-2xl mb-2">✨</div>
              <div className="font-semibold">Idea created successfully!</div>
              <div className="text-sm mt-1">Redirecting to dashboard...</div>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-red-700 dark:text-red-300 px-6 py-4 rounded-xl mb-8"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              minLength={5}
              placeholder="A short, descriptive title for your idea"
              helperText="Minimum 5 characters"
            />

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                minLength={10}
                rows={10}
                className="w-full px-4 py-3 bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200 resize-none leading-relaxed"
                placeholder="Describe your idea in detail. What problem does it solve? How does it work? What makes it unique?"
              />
              <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">
                Minimum 10 characters. Be as detailed as possible!
              </p>
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                loading={loading}
                disabled={success}
                className="flex-1"
              >
                {success ? 'Created!' : 'Post Idea'}
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate('/dashboard')}
              >
                Cancel
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateIdea;
