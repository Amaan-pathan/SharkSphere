import prisma from "../config/db.js";

export const toggleVote = async (req, res) => {
  try {
    const { id: ideaId } = req.params;
    const userId = req.user.id;
    const { voteType } = req.body;

    // Validate voteType
    if (!voteType || (voteType !== 'UPVOTE' && voteType !== 'DOWNVOTE')) {
      return res.status(400).json({
        success: false,
        message: 'Invalid vote type. Must be UPVOTE or DOWNVOTE'
      });
    }

    // Check if idea exists
    const idea = await prisma.idea.findUnique({
      where: { id: ideaId }
    });

    if (!idea) {
      return res.status(404).json({
        success: false,
        message: "Idea not found"
      });
    }

    // Find existing vote by this user on this idea
    const existingVote = await prisma.vote.findUnique({
      where: {
        userId_ideaId: { userId, ideaId }
      }
    });

    let message = '';

    // If vote exists
    if (existingVote) {
      // If same voteType → delete vote (toggle off)
      if (existingVote.voteType === voteType) {
        await prisma.vote.delete({
          where: { id: existingVote.id }
        });
        message = 'Vote removed';
      } 
      // If different voteType → update vote
      else {
        await prisma.vote.update({
          where: { id: existingVote.id },
          data: { voteType }
        });
        message = `Vote changed to ${voteType}`;
      }
    } 
    // If vote doesn't exist → create new vote
    else {
      await prisma.vote.create({
        data: {
          userId,
          ideaId,
          voteType
        }
      });
      message = `${voteType} added`;
    }

    // Get updated vote counts
    const votes = await prisma.vote.findMany({
      where: { ideaId }
    });

    const upvotes = votes.filter(v => v.voteType === 'UPVOTE').length;
    const downvotes = votes.filter(v => v.voteType === 'DOWNVOTE').length;
    const total = upvotes - downvotes;

    // Return response with vote counts
    return res.status(200).json({
      success: true,
      message,
      votes: {
        upvotes,
        downvotes,
        total
      }
    });

  } catch (error) {
    console.error('Toggle vote error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while toggling vote'
    });
  }
};

export const removeVote = async (req, res) => {
  try {
    const { id: ideaId } = req.params;
    const userId = req.user.id;

    // Find existing vote
    const existingVote = await prisma.vote.findUnique({
      where: {
        userId_ideaId: { userId, ideaId }
      }
    });

    // If vote doesn't exist, return 404
    if (!existingVote) {
      return res.status(404).json({
        success: false,
        message: "You haven't voted on this idea"
      });
    }

    // Delete vote
    await prisma.vote.delete({
      where: { id: existingVote.id }
    });

    // Get updated vote counts
    const votes = await prisma.vote.findMany({
      where: { ideaId }
    });

    const upvotes = votes.filter(v => v.voteType === 'UPVOTE').length;
    const downvotes = votes.filter(v => v.voteType === 'DOWNVOTE').length;
    const total = upvotes - downvotes;

    // Return response
    return res.status(200).json({
      success: true,
      message: 'Vote removed successfully',
      votes: {
        upvotes,
        downvotes,
        total
      }
    });

  } catch (error) {
    console.error('Remove vote error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while removing vote'
    });
  }
};

export const getVoteStats = async (req, res) => {
  try {
    const { id: ideaId } = req.params;
    const userId = req.user?.id; // Optional - might not be authenticated

    // Check if idea exists
    const idea = await prisma.idea.findUnique({
      where: { id: ideaId }
    });

    if (!idea) {
      return res.status(404).json({
        success: false,
        message: "Idea not found"
      });
    }

    // Get all votes for this idea
    const votes = await prisma.vote.findMany({
      where: { ideaId }
    });

    // Calculate vote counts
    const upvotes = votes.filter(v => v.voteType === 'UPVOTE').length;
    const downvotes = votes.filter(v => v.voteType === 'DOWNVOTE').length;
    const total = upvotes - downvotes;

    // If user is authenticated, find their vote
    let userVote = null;
    if (userId) {
      const userVoteRecord = await prisma.vote.findUnique({
        where: {
          userId_ideaId: { userId, ideaId }
        }
      });
      userVote = userVoteRecord ? userVoteRecord.voteType : null;
    }

    // Return vote stats
    return res.status(200).json({
      success: true,
      votes: {
        upvotes,
        downvotes,
        total,
        userVote
      }
    });

  } catch (error) {
    console.error('Get vote stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching vote stats'
    });
  }
};