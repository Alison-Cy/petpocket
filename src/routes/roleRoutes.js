import express from 'express';
import {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole,
  seedRoles
} from '../controllers/roleController.js';
import { authMiddleware } from '../middlewares/auth.js';
import { adminOnly } from '../middlewares/roleCheck.js';

const router = express.Router();

// Public routes (if needed)
router.get('/', getAllRoles);
router.get('/:id', getRoleById);

// Protected routes
router.use(authMiddleware);

// Admin-only routes
router.post('/', adminOnly, createRole);
router.put('/:id', adminOnly, updateRole);
router.delete('/:id', adminOnly, deleteRole);
router.post('/seed', adminOnly, seedRoles);

export default router;