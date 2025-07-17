import express from 'express';
import {
  createUser,
  getAllUsers,
  getUserById,
  getOwnProfile,
  updateUser,
  updateOwnProfile,
  changePassword,
  getUserStats,
  getUsersByRole,
  deactivateUser,
  restoreUser
} from '../controllers/userController.js';
import { authMiddleware } from '../middlewares/auth.js';
import { adminOrVet, adminOnly } from '../middlewares/roleCheck.js';

const router = express.Router();

// Todas las rutas requieren autenticación
router.use(authMiddleware);

// Rutas públicas (propias del usuario)
router.get('/profile', getOwnProfile);
router.patch('/profile', updateOwnProfile);
router.post('/change-password', changePassword);

// Rutas administrativas
router.post('/', adminOrVet, createUser);
router.get('/', adminOrVet, getAllUsers);
router.get('/stats', adminOnly, getUserStats);
router.get('/by-role/:roleName', adminOrVet, getUsersByRole);
router.get('/:id', adminOrVet, getUserById);
router.patch('/:id', adminOnly, updateUser);
router.patch('/:id/restore', adminOnly, restoreUser);
router.delete('/:id', adminOnly, deactivateUser);

export default router;