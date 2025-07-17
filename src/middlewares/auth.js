import jwt from 'jsonwebtoken';
import ApiError from '../utils/apiError.js';

export const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) throw new ApiError(401, 'Autenticación requerida');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    throw new ApiError(401, 'Token inválido');
  }
};