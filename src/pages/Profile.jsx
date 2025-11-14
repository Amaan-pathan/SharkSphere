import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext.jsx';
import { getAllIdeas } from '../api/ideas.js';
import Button from '../components/Button.jsx';
import Card from '../components/Card.jsx';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userIdeas, setUserIdeas] = useState([]);
  const [ideasLoading, setIdeasLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserIdeas();
    }
  }, [user]);

  const fetchUserIdeas = async () => {
    try {
      setIdeasLoading(true);
      const response = await getAllIdeas();
      if (response.success) {
        // Filter ideas by current user
        const filtered = response.ideas.filter((idea) => idea.author.id === user.id);
        setUserIdeas(filtered);
      }
    } catch (err) {
      console.error('Failed to fetch user ideas:', err);
    } finally {
      setIdeasLoading(false);
    }
  };

  const handleLogout = () => {
    setLoading(true);
    logout();
    navigate('/');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-navy text-gray-900 dark:text-white pt-24 pb-16 px-6 sm:px-8 lg:px-12">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <h1 className="text-h1 font-bold mb-4">Profile</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">Your account information</p>
        </motion.div>

        {/* User Info Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8 shadow-card mb-8"
        >
          <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-200 dark:border-white/10">
            <div className="w-20 h-20 rounded-2xl bg-accent flex items-center justify-center text-white text-3xl font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-1 text-gray-900 dark:text-white">{user.name}</h2>
              <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">
                Full Name
              </label>
              <div className="text-lg font-medium text-gray-900 dark:text-white bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3">
                {user.name}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">
                Email Address
              </label>
              <div className="text-lg font-medium text-gray-900 dark:text-white bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3">
                {user.email}
              </div>
            </div>

            {user.emailVerified !== undefined && (
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">
                  Verification Status
                </label>
                <div className="flex items-center gap-2">
                  {user.emailVerified ? (
                    <div className="flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 text-green-700 dark:text-green-300 rounded-xl">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="font-semibold">Verified</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 px-4 py-2 bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-500/30 text-yellow-700 dark:text-yellow-300 rounded-xl">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <span className="font-semibold">Not Verified</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="pt-6 border-t border-gray-200 dark:border-white/10">
              <Button
                variant="secondary"
                onClick={handleLogout}
                loading={loading}
                className="w-full border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10"
              >
                Logout
              </Button>
            </div>
          </div>
        </motion.div>

        {/* User's Ideas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold mb-6">Your Ideas</h2>
          {ideasLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">Loading your ideas...</p>
            </div>
          ) : userIdeas.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl">
              <p className="text-gray-600 dark:text-gray-400 mb-4">You haven't shared any ideas yet</p>
              <Button onClick={() => navigate('/create-idea')}>Create Your First Idea</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {userIdeas.map((idea, index) => (
                <motion.div
                  key={idea.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card>
                    <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white line-clamp-2">
                      {idea.title}
                    </h3>
                    <p
                      className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4"
                      style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {idea.description}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-white/10">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {idea.votes?.total || 0} votes
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(idea.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
