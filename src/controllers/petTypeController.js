import PetTypeService from '../services/petTypeService.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/apiResponse.js';

const petTypeService = new PetTypeService();

export const createPetType = asyncHandler(async (req, res) => {
  const petType = await petTypeService.createPetType(req.body);
  new ApiResponse(res, 201, petType).send();
});

export const getAllPetTypes = asyncHandler(async (req, res) => {
  const petTypes = await petTypeService.findAllPetTypes();
  new ApiResponse(res, 200, petTypes).send();
});

export const getPetTypeById = asyncHandler(async (req, res) => {
  const petType = await petTypeService.findPetTypeById(req.params.id);
  new ApiResponse(res, 200, petType).send();
});

export const updatePetType = asyncHandler(async (req, res) => {
  const petType = await petTypeService.updatePetType(req.params.id, req.body);
  new ApiResponse(res, 200, petType).send();
});

export const deletePetType = asyncHandler(async (req, res) => {
  const result = await petTypeService.deletePetType(req.params.id);
  new ApiResponse(res, 200, result).send();
});

export const seedPetTypes = asyncHandler(async (req, res) => {
  const types = await petTypeService.seedDefaultPetTypes();
  new ApiResponse(res, 201, { 
    message: 'Tipos de mascotas creados', 
    types 
  }).send();
});