import UserService from '../services/userService.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/apiResponse.js';

const userService = new UserService();

export const createUser = asyncHandler(async (req, res) => {
  const user = await userService.createUser(req.body);
  new ApiResponse(res, 201, user).send();
});

export const getAllUsers = asyncHandler(async (req, res) => {
  const includeInactive = req.query.includeInactive === 'true';
  const users = await userService.findAllUsers(includeInactive);
  new ApiResponse(res, 200, users).send();
});

export const getUserById = asyncHandler(async (req, res) => {
  const user = await userService.findUserById(req.params.id);
  new ApiResponse(res, 200, user).send();
});

export const getOwnProfile = asyncHandler(async (req, res) => {
  const user = await userService.findUserById(req.user.id);
  new ApiResponse(res, 200, user).send();
});

export const updateUser = asyncHandler(async (req, res) => {
  const user = await userService.updateUser(req.params.id, req.body);
  new ApiResponse(res, 200, user).send();
});

export const updateOwnProfile = asyncHandler(async (req, res) => {
  const user = await userService.updateUser(req.user.id, req.body);
  new ApiResponse(res, 200, user).send();
});

export const changePassword = asyncHandler(async (req, res) => {
  await userService.changePassword(
    req.user.id,
    req.body.currentPassword,
    req.body.newPassword
  );
  new ApiResponse(res, 200, { message: 'Contraseña actualizada' }).send();
});

export const getUserStats = asyncHandler(async (req, res) => {
  const stats = await userService.getUserStats();
  new ApiResponse(res, 200, stats).send();
});

export const getUsersByRole = asyncHandler(async (req, res) => {
  const users = await userService.findByRole(req.params.roleName);
  new ApiResponse(res, 200, users).send();
});

export const deactivateUser = asyncHandler(async (req, res) => {
  const user = await userService.deactivateUser(req.params.id);
  new ApiResponse(res, 200, user).send();
});

export const restoreUser = asyncHandler(async (req, res) => {
  const user = await userService.restoreUser(req.params.id);
  new ApiResponse(res, 200, user).send();
});