import express from 'express';
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  seedCategories
} from '../controllers/serviceCategoryController.js';
import { authMiddleware } from '../middlewares/auth.js';
import { adminOnly, adminOrVet } from '../middlewares/roleCheck.js';

const router = express.Router();

// Public routes
router.get('/', getAllCategories);
router.get('/:id', getCategoryById);

// Protected routes
router.use(authMiddleware);

// Admin/Vet routes
router.post('/', adminOrVet, createCategory);
router.put('/:id', adminOrVet, updateCategory);

// Admin-only routes
router.post('/seed', adminOnly, seedCategories);
router.delete('/:id', adminOnly, deleteCategory);

export default router;