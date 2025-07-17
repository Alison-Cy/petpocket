import express from 'express';
import {
  createProductPetType,
  getProductPetTypes,
  deleteProductPetType,
  updateProductPetType
} from '../controllers/productPetTypeController.js';
import { authMiddleware } from '../middlewares/auth.js';
import { adminOrVet } from '../middlewares/roleCheck.js';

const router = express.Router();

router.use(authMiddleware);

// Create association between product and pet type
router.post('/products/:productId/pet-types/:petTypeId', adminOrVet, createProductPetType);

// Get all pet types for a product
router.get('/products/:productId/pet-types', getProductPetTypes);

// Update association
router.put('/products/:productId/pet-types/:petTypeId', adminOrVet, updateProductPetType);

// Delete association
router.delete('/products/:productId/pet-types/:petTypeId', adminOrVet, deleteProductPetType);

export default router;