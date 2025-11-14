import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getAllIdeas } from '../api/ideas.js';
import { toggleVote } from '../api/votes.js';
import { useAuth } from '../context/AuthContext.jsx';
import Button from '../components/Button.jsx';
import Card from '../components/Card.jsx';
import Input from '../components/Input.jsx';

const Dashboard = () => {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [votingIds, setVotingIds] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const { user } = useAuth();

  useEffect(() => {
    fetchIdeas();
  }, []);

  const fetchIdeas = async () => {
    try {
      setLoading(true);
      const response = await getAllIdeas();
      if (response.success) {
        setIdeas(response.ideas);
      }
    } catch (err) {
      setError('Failed to load ideas');
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (ideaId, voteType) => {
    if (votingIds.has(ideaId)) return;

    setVotingIds((prev) => new Set(prev).add(ideaId));

    try {
      const response = await toggleVote(ideaId, voteType);
      if (response.success) {
        setIdeas((prevIdeas) =>
          prevIdeas.map((idea) =>
            idea.id === ideaId
              ? { ...idea, votes: response.votes }
              : idea
          )
        );
      }
    } catch (err) {
      console.error('Vote failed:', err);
    } finally {
      setVotingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(ideaId);
        return newSet;
      });
    }
  };

  const filteredAndSortedIdeas = useMemo(() => {
    let filtered = ideas;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (idea) =>
          idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          idea.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort
    if (sortBy === 'newest') {
      filtered = [...filtered].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === 'votes') {
      filtered = [...filtered].sort((a, b) => (b.votes?.total || 0) - (a.votes?.total || 0));
    }

    return filtered;
  }, [ideas, searchQuery, sortBy]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-navy text-gray-900 dark:text-white flex items-center justify-center pt-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-gray-600 dark:text-gray-400">Loading ideas...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-navy text-gray-900 dark:text-white flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="text-red-500 mb-4">{error}</div>
          <Button onClick={fetchIdeas}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-navy text-gray-900 dark:text-white pt-24 pb-16 px-6 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6"
        >
          <div>
            <h1 className="text-h1 font-bold mb-3">Ideas Hub</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Explore and vote on innovative ideas from the community
            </p>
          </div>
          <Link to="/create-idea">
            <Button size="lg">+ Share Idea</Button>
          </Link>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-8 flex flex-col sm:flex-row gap-4"
        >
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Search ideas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mb-0"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="newest">Newest First</option>
            <option value="votes">Most Voted</option>
          </select>
        </motion.div>

        {/* Ideas Grid */}
        {filteredAndSortedIdeas.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-32"
          >
            <div className="text-6xl mb-6">💡</div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              {searchQuery ? 'No ideas found' : 'No ideas yet'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              {searchQuery
                ? 'Try adjusting your search terms'
                : 'Be the first to share an innovative idea with the community'}
            </p>
            {!searchQuery && (
              <Link to="/create-idea">
                <Button size="lg">Create First Idea</Button>
              </Link>
            )}
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredAndSortedIdeas.map((idea, index) => {
                const isPositive = idea.votes?.total > 0;
                const voteCount = idea.votes?.total || 0;

                return (
                  <motion.div
                    key={idea.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.03 }}
                    layout
                  >
                    <Card hover className="h-full flex flex-col">
                      <div className="flex-1 mb-6">
                        <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white line-clamp-2">
                          {idea.title}
                        </h3>
                        <p
                          className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm line-clamp-4"
                          style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 4,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                        >
                          {idea.description}
                        </p>
                      </div>

                      <div className="pt-6 border-t border-gray-200 dark:border-white/10">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-white text-xs font-bold">
                              {idea.author.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                {idea.author.name}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <motion.button
                              onClick={() => handleVote(idea.id, 'UPVOTE')}
                              disabled={votingIds.has(idea.id)}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                                isPositive
                                  ? 'bg-accent/10 text-accent border border-accent/20'
                                  : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/10'
                              }`}
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                              </svg>
                              <span>{idea.votes?.upvotes || 0}</span>
                            </motion.button>
                            <div
                              className={`text-base font-bold min-w-[2rem] text-center ${
                                isPositive ? 'text-accent' : 'text-gray-500 dark:text-gray-400'
                              }`}
                            >
                              {voteCount > 0 ? '+' : ''}{voteCount}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
