import api from './api.js';

export const toggleVote = async (ideaId, voteType) => {
  const response = await api.post(`/ideas/${ideaId}/vote`, { voteType });
  return response.data;
};

export const removeVote = async (ideaId) => {
  const response = await api.delete(`/ideas/${ideaId}/vote`);
  return response.data;
};

export const getVoteStats = async (ideaId) => {
  const response = await api.get(`/ideas/${ideaId}/votes`);
  return response.data;
};

