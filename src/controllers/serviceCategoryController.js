import ServiceCategoryService from '../services/serviceCategoryService.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/apiResponse.js';

const serviceCategoryService = new ServiceCategoryService();

export const createCategory = asyncHandler(async (req, res) => {
  const category = await serviceCategoryService.createCategory(req.body);
  new ApiResponse(res, 201, category).send();
});

export const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await serviceCategoryService.getAllCategories();
  new ApiResponse(res, 200, categories).send();
});

export const getCategoryById = asyncHandler(async (req, res) => {
  const category = await serviceCategoryService.getCategoryById(req.params.id);
  new ApiResponse(res, 200, category).send();
});

export const updateCategory = asyncHandler(async (req, res) => {
  const category = await serviceCategoryService.updateCategory(
    req.params.id, 
    req.body
  );
  new ApiResponse(res, 200, category).send();
});

export const deleteCategory = asyncHandler(async (req, res) => {
  const result = await serviceCategoryService.deleteCategory(req.params.id);
  new ApiResponse(res, 200, result).send();
});

export const seedCategories = asyncHandler(async (req, res) => {
  const categories = await serviceCategoryService.seedDefaultCategories();
  new ApiResponse(res, 201, { 
    message: 'Categorías creadas', 
    categories 
  }).send();
});