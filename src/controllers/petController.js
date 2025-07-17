import Pet from '../models/Pet.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/apiResponse.js';

export const createPet = asyncHandler(async (req, res) => {
  const { name, species, ownerId } = req.body;
  const pet = await Pet.create({ name, species, ownerId });
  new ApiResponse(res, 201, pet).send();
});

export const getPets = asyncHandler(async (req, res) => {
  const pets = await Pet.findAll({ include: 'Owner' });
  new ApiResponse(res, 200, pets).send();
});