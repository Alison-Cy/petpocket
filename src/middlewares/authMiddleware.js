import jwt from 'jsonwebtoken';
import ApiError from '../utils/apiError.js';

export const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) throw new ApiError(401, 'Token no proporcionado');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Asegúrate que el payload incluya 'role'
    next();
  } catch (error) {
    throw new ApiError(401, 'Token inválido');
  }
};