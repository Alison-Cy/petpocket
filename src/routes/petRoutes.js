import express from 'express';
import { createPet, getPets } from '../controllers/petController.js';
import authMiddleware from '../middlewares/auth.js';
const router = express.Router();

router.use(authMiddleware);
router.post('/', createPet);
router.get('/', getPets);

export default router;