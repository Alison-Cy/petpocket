import express from 'express';
import {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
  getServicesByCategory,
  getServicesByPetType
} from '../controllers/serviceController.js';
import { authMiddleware } from '../middlewares/auth.js';
import { adminOrVet } from '../middlewares/roleCheck.js';

const router = express.Router();

// Public routes
router.get('/', getAllServices);
router.get('/:id', getServiceById);
router.get('/category/:categoryId', getServicesByCategory);
router.get('/pet-type/:petTypeId', getServicesByPetType);

// Protected routes
router.use(authMiddleware);

// Admin/Vet routes
router.post('/', adminOrVet, createService);
router.put('/:id', adminOrVet, updateService);
router.delete('/:id', adminOrVet, deleteService);

export default router;