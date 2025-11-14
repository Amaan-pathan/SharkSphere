import { useState, useEffect } from 'react';
import { getAllIdeas } from '../api/ideas.js';
import { toggleVote } from '../api/votes.js';
import { useAuth } from '../context/AuthContext.jsx';

const Dashboard = () => {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [votingIds, setVotingIds] = useState(new Set());
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
        // Update the idea's vote count
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <div className="text-gray-400">Loading ideas...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <div className="text-red-400">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Ideas</h1>
          <p className="text-gray-400">Explore and vote on ideas from the community</p>
        </div>

        {ideas.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg mb-4">No ideas yet</p>
            <p className="text-gray-500">Be the first to share an idea!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            {ideas.map((idea, index) => {
              // Create asymmetric layout with varying sizes
              const isLarge = index % 5 === 0;
              const isMedium = index % 5 === 2;
              const offsetTop = index % 7 === 1 ? 'md:mt-10' : index % 7 === 3 ? 'md:mt-6' : index % 7 === 5 ? 'md:mt-12' : '';
              const offsetLeft = index % 11 === 4 ? 'md:ml-4' : index % 11 === 7 ? 'md:-ml-2' : '';
              
              return (
                <div
                  key={idea.id}
                  className={`bg-gray-900/50 border border-gray-800 rounded-lg hover:border-gray-700 transition-all duration-200 ${offsetTop} ${offsetLeft} ${
                    isLarge ? 'md:col-span-2 lg:col-span-1 p-8' : isMedium ? 'p-7' : 'p-6'
                  }`}
                >
                  <h3 className={`font-semibold mb-3 text-white ${isLarge ? 'text-2xl' : 'text-xl'}`}>
                    {idea.title}
                  </h3>
                  <p className={`text-gray-400 mb-4 leading-relaxed ${
                    isLarge ? 'text-base' : 'text-sm'
                  }`} style={{
                    display: '-webkit-box',
                    WebkitLineClamp: isLarge ? 6 : 4,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {idea.description}
                  </p>
                  
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-800">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <span>by {idea.author.name}</span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleVote(idea.id, 'UPVOTE')}
                        disabled={votingIds.has(idea.id)}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded text-sm transition-colors ${
                          idea.votes?.total > 0
                            ? 'bg-green-900/30 text-green-400 border border-green-800'
                            : 'bg-gray-800 text-gray-400 border border-gray-700 hover:border-gray-600'
                        }`}
                      >
                        <span>↑</span>
                        <span>{idea.votes?.upvotes || 0}</span>
                      </button>
                      <span className="text-gray-500 text-sm font-medium">
                        {idea.votes?.total || 0}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

