import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { createIdea } from '../api/ideas.js';
import Button from '../components/Button.jsx';
import Input from '../components/Input.jsx';
import Card from '../components/Card.jsx';

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
    <div className="min-h-screen bg-bg-primary text-text-heading pt-24 pb-16 px-6 sm:px-8 lg:px-12">
      <div className="max-w-content mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <h1 className="text-h1 font-semibold mb-4 text-text-heading">Share Your Idea</h1>
          <p className="text-body-lg text-text-body">
            What innovation are you building?
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card className="p-8">
            {success && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-500/10 border border-green-500/30 text-green-400 px-6 py-4 rounded-card mb-8 text-center"
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
                className="bg-red-500/10 border border-red-500/30 text-red-400 px-6 py-4 rounded-card mb-8"
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
                <label className="block text-sm font-semibold text-text-body mb-2">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  minLength={10}
                  rows={10}
                  className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-card text-text-heading placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-purple-accent focus:border-purple-accent transition-all duration-200 resize-none leading-relaxed"
                  placeholder="Describe your idea in detail. What problem does it solve? How does it work? What makes it unique?"
                />
                <p className="mt-1.5 text-xs text-text-muted">
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
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateIdea;
