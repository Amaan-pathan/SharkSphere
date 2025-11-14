import express from 'express';
import { toggleVote, removeVote, getVoteStats } from '../controllers/voteController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/:id/votes', getVoteStats);
router.post('/:id/vote', authenticate, toggleVote);
router.delete('/:id/vote', authenticate, removeVote);

export default router;