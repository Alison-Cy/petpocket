import express from 'express';
import {
  createPetNote,
  getNotesByPetId,
  getNoteById,
  updateNote,
  deleteNote,
  getAllNotes
} from '../controllers/petNoteController.js';
import { authMiddleware } from '../middlewares/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// CRUD operations
router.post('/', createPetNote);
router.get('/pet/:petId', getNotesByPetId);
router.get('/:id', getNoteById);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

// Admin/Staff only routes
router.get('/', getAllNotes);

export default router;