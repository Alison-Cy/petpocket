import UserService from '../services/userService.js';
import AuthService from '../services/authService.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/apiResponse.js';

const userService = new UserService();
const authService = new AuthService();

export const register = asyncHandler(async (req, res) => {
  const user = await authService.register(req.body);
  new ApiResponse(res, 201, user).send();
});

export const login = asyncHandler(async (req, res) => {
  const { correo, contrasena } = req.body;
  const result = await authService.login(correo, contrasena);
  new ApiResponse(res, 200, result).send();
});

export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await userService.findUserById(req.user.id);
  new ApiResponse(res, 200, user).send();
});

export const updateProfile = asyncHandler(async (req, res) => {
  const user = await userService.updateUser(req.user.id, req.body);
  new ApiResponse(res, 200, user).send();
});

export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  await userService.changePassword(req.user.id, currentPassword, newPassword);
  new ApiResponse(res, 200, { message: 'Contraseña actualizada' }).send();
});