import express from 'express';
import {
  createAppointment,
  getAppointment,
  updateAppointment,
  cancelAppointment,
  getUserAppointments,
  getPetAppointments
} from '../controllers/appointmentController.js';
import { authMiddleware } from '../middlewares/auth.js';
import { clientOnly, adminOrVet } from '../middlewares/roleCheck.js';

const router = express.Router();

router.use(authMiddleware);

// Client routes
router.post('/', clientOnly, createAppointment);
router.get('/my-appointments', clientOnly, getUserAppointments);

// General routes
router.get('/:id', getAppointment);
router.get('/pet/:petId', getPetAppointments);

// Admin/Vet routes
router.patch('/:id', adminOrVet, updateAppointment);
router.patch('/:id/cancel', adminOrVet, cancelAppointment);

export default router;