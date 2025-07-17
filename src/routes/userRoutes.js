import express from 'express';
import {
  register,
  login,
  getUserProfile,
  updateProfile,
  changePassword
} from '../controllers/userController.js';
import { authMiddleware } from '../middlewares/auth.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.use(authMiddleware);
router.get('/profile', getUserProfile);
router.patch('/profile', updateProfile);
router.post('/change-password', changePassword);

export default router;