import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createIdea } from '../api/ideas.js';

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
    <div className="min-h-screen bg-gray-950 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Share an Idea</h1>
          <p className="text-gray-400">What are you building?</p>
        </div>

        {success && (
          <div className="bg-green-900/20 border border-green-800 text-green-300 px-4 py-3 rounded-md mb-6">
            Idea created successfully! Redirecting...
          </div>
        )}

        {error && (
          <div className="bg-red-900/20 border border-red-800 text-red-300 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              minLength={5}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors"
              placeholder="A short, descriptive title"
            />
            <p className="mt-1 text-xs text-gray-500">Minimum 5 characters</p>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              minLength={10}
              rows={8}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors resize-none"
              placeholder="Describe your idea in detail..."
            />
            <p className="mt-1 text-xs text-gray-500">Minimum 10 characters</p>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading || success}
              className="bg-accent hover:bg-accent-dark text-white font-medium px-6 py-3 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating...' : success ? 'Created!' : 'Post Idea'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="border border-gray-700 hover:border-gray-600 text-white font-medium px-6 py-3 rounded-md transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateIdea;

