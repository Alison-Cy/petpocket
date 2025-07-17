import ProductPetTypeService from '../services/productPetTypeService.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/apiResponse.js';

const productPetTypeService = new ProductPetTypeService();

export const createProductPetType = asyncHandler(async (req, res) => {
  const { productId, petTypeId } = req.params;
  const association = await productPetTypeService.createAssociation(
    productId, 
    petTypeId,
    req.body // Additional data if needed
  );
  new ApiResponse(res, 201, association).send();
});

export const getProductPetTypes = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const associations = await productPetTypeService.getAssociationsByProduct(productId);
  new ApiResponse(res, 200, associations).send();
});

export const deleteProductPetType = asyncHandler(async (req, res) => {
  const { productId, petTypeId } = req.params;
  const result = await productPetTypeService.deleteAssociation(productId, petTypeId);
  new ApiResponse(res, 200, result).send();
});

export const updateProductPetType = asyncHandler(async (req, res) => {
  const { productId, petTypeId } = req.params;
  const association = await productPetTypeService.updateAssociation(
    productId,
    petTypeId,
    req.body
  );
  new ApiResponse(res, 200, association).send();
});