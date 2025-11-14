import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2, Eye } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { getAllIdeas, deleteIdea } from '../api/ideas.js';
import Button from '../components/Button.jsx';
import Card from '../components/Card.jsx';
import IdeaModal from '../components/IdeaModal.jsx';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userIdeas, setUserIdeas] = useState([]);
  const [ideasLoading, setIdeasLoading] = useState(true);
  const [deletingIds, setDeletingIds] = useState(new Set());
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleDelete = async (ideaId) => {
    if (!window.confirm('Are you sure you want to delete this idea? This action cannot be undone.')) {
      return;
    }

    if (deletingIds.has(ideaId)) return;

    setDeletingIds((prev) => new Set(prev).add(ideaId));

    try {
      const response = await deleteIdea(ideaId);
      if (response.success) {
        // Remove the idea from the list
        setUserIdeas((prevIdeas) => prevIdeas.filter((idea) => idea.id !== ideaId));
        // Close modal if the deleted idea was open
        if (selectedIdea?.id === ideaId) {
          setIsModalOpen(false);
          setSelectedIdea(null);
        }
      }
    } catch (err) {
      console.error('Delete failed:', err);
      alert(err.response?.data?.message || 'Failed to delete idea. Please try again.');
    } finally {
      setDeletingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(ideaId);
        return newSet;
      });
    }
  };

  const handleViewDetails = (idea) => {
    setSelectedIdea(idea);
    setIsModalOpen(true);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-bg-primary text-text-heading pt-24 pb-16 px-6 sm:px-8 lg:px-12">
      <div className="max-w-content mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <h1 className="text-h1 font-semibold mb-4 text-text-heading">Profile</h1>
          <p className="text-body-lg text-text-body">Your account information</p>
        </motion.div>

        {/* User Info Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card className="mb-8">
            <div className="flex items-center gap-6 mb-8 pb-8 border-b border-border">
              <div className="w-20 h-20 rounded-card bg-purple-accent flex items-center justify-center text-white text-3xl font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-h2 font-semibold mb-1 text-text-heading">{user.name}</h2>
                <p className="text-body text-text-body">{user.email}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold text-text-muted mb-2 uppercase tracking-wider">
                  Full Name
                </label>
                <div className="text-body-lg font-medium text-text-heading bg-bg-primary border border-border rounded-card px-4 py-3">
                  {user.name}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-muted mb-2 uppercase tracking-wider">
                  Email Address
                </label>
                <div className="text-body-lg font-medium text-text-heading bg-bg-primary border border-border rounded-card px-4 py-3">
                  {user.email}
                </div>
              </div>

              {user.emailVerified !== undefined && (
                <div>
                  <label className="block text-xs font-semibold text-text-muted mb-2 uppercase tracking-wider">
                    Verification Status
                  </label>
                  <div className="flex items-center gap-2">
                    {user.emailVerified ? (
                      <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 text-green-400 rounded-card">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="font-semibold">Verified</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 rounded-card">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <span className="font-semibold">Not Verified</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="pt-6 border-t border-border">
                <Button
                  variant="secondary"
                  onClick={handleLogout}
                  loading={loading}
                  className="w-full border-red-500/30 text-red-400 hover:bg-red-500/10"
                >
                  Logout
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* User's Ideas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <h2 className="text-h2 font-semibold mb-6 text-text-heading">Your Ideas</h2>
          {ideasLoading ? (
            <div className="text-center py-12">
              <p className="text-text-body">Loading your ideas...</p>
            </div>
          ) : userIdeas.length === 0 ? (
            <Card className="text-center py-12">
              <p className="text-text-body mb-4">You haven't shared any ideas yet</p>
              <Button onClick={() => navigate('/create-idea')}>Create Your First Idea</Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {userIdeas.map((idea, index) => (
                <motion.div
                  key={idea.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="h-full"
                >
                  <Card hover className="h-full flex flex-col min-h-[280px]">
                    <div className="flex-1 mb-4 flex flex-col">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <h3 className="text-h3 font-semibold text-text-heading line-clamp-2 flex-1">
                          {idea.title}
                        </h3>
                        <motion.button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(idea.id);
                          }}
                          disabled={deletingIds.has(idea.id)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="flex-shrink-0 p-2 rounded-card text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Delete idea"
                        >
                          <Trash2 className="w-4 h-4" strokeWidth={2} />
                        </motion.button>
                      </div>
                      <p
                        className="text-body text-text-body line-clamp-3 flex-1 mb-4"
                        style={{
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {idea.description}
                      </p>
                      <motion.button
                        onClick={() => handleViewDetails(idea)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-2 text-sm font-medium text-purple-accent hover:text-purple-accent/80 transition-colors mb-4"
                      >
                        <Eye className="w-4 h-4" />
                        View Details
                      </motion.button>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
                      <div className="text-sm text-text-muted">
                        {idea.votes?.total || 0} votes
                      </div>
                      <div className="text-xs text-text-muted">
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

      {/* Idea Detail Modal */}
      <IdeaModal
        idea={selectedIdea}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedIdea(null);
        }}
      />
    </div>
  );
};

export default Profile;
