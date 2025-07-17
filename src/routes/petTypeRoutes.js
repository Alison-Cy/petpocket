import express from 'express';
import {
  createPetType,
  getAllPetTypes,
  getPetTypeById,
  updatePetType,
  deletePetType,
  seedPetTypes
} from '../controllers/petTypeController.js';
import { authMiddleware } from '../middlewares/auth.js';
import { adminOnly, adminOrVet } from '../middlewares/roleCheck.js';

const router = express.Router();

// Public routes
router.get('/', getAllPetTypes);
router.get('/:id', getPetTypeById);

// Protected routes
router.use(authMiddleware);

// Admin/Vet routes
router.post('/', adminOrVet, createPetType);
router.patch('/:id', adminOrVet, updatePetType);

// Admin-only routes
router.post('/seed', adminOnly, seedPetTypes);
router.delete('/:id', adminOnly, deletePetType);

export default router;