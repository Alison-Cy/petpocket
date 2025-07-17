import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { generateToken } from '../utils/jwt.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/apiResponse.js';

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  
  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, 'Credenciales inválidas');
  }

  const token = generateToken(user.id);
  new ApiResponse(res, 200, { token }).send();
});