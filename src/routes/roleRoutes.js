import express from 'express';
import RoleService from '../services/roleService.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { adminOnly, adminOrVet } from '../middleware/roleMiddleware.js';

const router = express.Router();
const roleService = new RoleService();

// Todos los endpoints requieren autenticación
router.use(authMiddleware);

// POST /roles - Solo ADMIN
router.post('/', adminOnly, async (req, res, next) => {
  try {
    const role = await roleService.createRole(req.body);
    res.status(201).json(role);
  } catch (error) {
    next(error);
  }
});

// GET /roles - ADMIN y VETERINARIO
router.get('/', adminOrVet, async (req, res, next) => {
  try {
    const includeInactive = req.query.includeInactive === 'true';
    const roles = await roleService.findAllRoles(includeInactive);
    res.json(roles);
  } catch (error) {
    next(error);
  }
});

// POST /roles/seed - Solo ADMIN
router.post('/seed', adminOnly, async (req, res, next) => {
  try {
    await roleService.seedDefaultRoles();
    res.json({ message: 'Roles por defecto creados' });
  } catch (error) {
    next(error);
  }
});

// Resto de endpoints (GET /:id, PATCH /:id, etc.)
// ... implementación similar ...

export default router;