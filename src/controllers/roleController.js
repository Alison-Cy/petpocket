import RoleService from '../services/roleService.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/apiResponse.js';

const roleService = new RoleService();

export const createRole = asyncHandler(async (req, res) => {
  const role = await roleService.createRole(req.body);
  new ApiResponse(res, 201, role).send();
});

export const getAllRoles = asyncHandler(async (req, res) => {
  const roles = await roleService.getAllRoles();
  new ApiResponse(res, 200, roles).send();
});

export const getRoleById = asyncHandler(async (req, res) => {
  const role = await roleService.getRoleById(req.params.id);
  new ApiResponse(res, 200, role).send();
});

export const updateRole = asyncHandler(async (req, res) => {
  const role = await roleService.updateRole(req.params.id, req.body);
  new ApiResponse(res, 200, role).send();
});

export const deleteRole = asyncHandler(async (req, res) => {
  const result = await roleService.deleteRole(req.params.id);
  new ApiResponse(res, 200, result).send();
});

export const seedRoles = asyncHandler(async (req, res) => {
  const roles = await roleService.seedDefaultRoles();
  new ApiResponse(res, 201, {
    message: 'Roles por defecto creados',
    roles
  }).send();
});