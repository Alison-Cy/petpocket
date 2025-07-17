import ServiceService from '../services/serviceService.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/apiResponse.js';

const serviceService = new ServiceService();

export const createService = asyncHandler(async (req, res) => {
  const service = await serviceService.createService(req.body);
  new ApiResponse(res, 201, service).send();
});

export const getAllServices = asyncHandler(async (req, res) => {
  const services = await serviceService.getAllServices();
  new ApiResponse(res, 200, services).send();
});

export const getServiceById = asyncHandler(async (req, res) => {
  const service = await serviceService.getServiceById(req.params.id);
  new ApiResponse(res, 200, service).send();
});

export const updateService = asyncHandler(async (req, res) => {
  const service = await serviceService.updateService(req.params.id, req.body);
  new ApiResponse(res, 200, service).send();
});

export const deleteService = asyncHandler(async (req, res) => {
  const result = await serviceService.deleteService(req.params.id);
  new ApiResponse(res, 200, result).send();
});

export const getServicesByCategory = asyncHandler(async (req, res) => {
  const services = await serviceService.getServicesByCategory(req.params.categoryId);
  new ApiResponse(res, 200, services).send();
});

export const getServicesByPetType = asyncHandler(async (req, res) => {
  const services = await serviceService.getServicesByPetType(req.params.petTypeId);
  new ApiResponse(res, 200, services).send();
});