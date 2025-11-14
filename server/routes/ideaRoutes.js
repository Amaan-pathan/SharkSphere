import express from 'express';
import { createIdea, getAllIdeas, getIdeaById, updateIdea, deleteIdea } from '../controllers/ideaController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getAllIdeas);           // Get all ideas
router.get('/:id', getIdeaById);        // Get single idea

// Protected routes (need authentication)
router.post('/', authenticate, createIdea);           // Create idea
router.put('/:id', authenticate, updateIdea);         // Update idea
router.delete('/:id', authenticate, deleteIdea);      // Delete idea

export default router;