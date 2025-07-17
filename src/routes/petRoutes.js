import express from 'express';
import {
  createPet,
  getAllPets,
  getPetById,
  getMyPets,
  getPetsByOwner,
  getPetStats,
  updatePet,
  deletePet
} from '../controllers/petController.js';
import { authMiddleware } from '../middlewares/auth.js';
import { clientOnly, adminOrVet, adminVetOrClient } from '../middlewares/roleCheck.js';

const router = express.Router();

// Todas las rutas requieren autenticación
router.use(authMiddleware);

// Rutas generales
router.get('/', adminVetOrClient, getAllPets);
router.get('/stats', adminOrVet, getPetStats);
router.get('/:id', adminVetOrClient, getPetById);

// Rutas para clientes
router.get('/my-pets', clientOnly, getMyPets);
router.get('/owner/:ownerId', adminVetOrClient, getPetsByOwner);

// Operaciones CRUD
router.post('/', adminVetOrClient, createPet);
router.patch('/:id', adminVetOrClient, updatePet);
router.delete('/:id', adminVetOrClient, deletePet);

export default router;