import PetService from '../services/petService.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/apiResponse.js';

const petService = new PetService();

export const createPet = asyncHandler(async (req, res) => {
  const pet = await petService.createPet(req.body, req.user.id, req.user.role);
  new ApiResponse(res, 201, pet).send();
});

export const getAllPets = asyncHandler(async (req, res) => {
  const pets = await petService.findAllPets(req.user.role, req.user.id);
  new ApiResponse(res, 200, pets).send();
});

export const getPetById = asyncHandler(async (req, res) => {
  const pet = await petService.findPetById(req.params.id, req.user.id, req.user.role);
  new ApiResponse(res, 200, pet).send();
});

export const getMyPets = asyncHandler(async (req, res) => {
  const pets = await petService.getPetsByOwner(req.user.id, req.user.id, req.user.role);
  new ApiResponse(res, 200, pets).send();
});

export const getPetsByOwner = asyncHandler(async (req, res) => {
  const pets = await petService.getPetsByOwner(req.params.ownerId, req.user.id, req.user.role);
  new ApiResponse(res, 200, pets).send();
});

export const getPetStats = asyncHandler(async (req, res) => {
  const ownerId = req.query.ownerId ? parseInt(req.query.ownerId) : undefined;
  const stats = await petService.getPetStats(ownerId);
  new ApiResponse(res, 200, stats).send();
});

export const updatePet = asyncHandler(async (req, res) => {
  const pet = await petService.updatePet(
    req.params.id, 
    req.body, 
    req.user.id, 
    req.user.role
  );
  new ApiResponse(res, 200, pet).send();
});

export const deletePet = asyncHandler(async (req, res) => {
  const result = await petService.deletePet(req.params.id, req.user.id, req.user.role);
  new ApiResponse(res, 200, result).send();
});