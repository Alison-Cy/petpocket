import ProductPetType from '../models/ProductPetType.js';
import ApiError from '../utils/apiError.js';

export default class ProductPetTypeService {
  async createAssociation(productId, petTypeId, additionalData = {}) {
    return await ProductPetType.create({
      product_id: productId,
      pet_type_id: petTypeId,
      ...additionalData
    });
  }

  async getAssociationsByProduct(productId) {
    return await ProductPetType.findAll({
      where: { product_id: productId },
      include: ['petType']
    });
  }

  async getAssociationsByPetType(petTypeId) {
    return await ProductPetType.findAll({
      where: { pet_type_id: petTypeId },
      include: ['product']
    });
  }

  async deleteAssociation(productId, petTypeId) {
    const association = await ProductPetType.findOne({
      where: { 
        product_id: productId,
        pet_type_id: petTypeId 
      }
    });
    
    if (!association) {
      throw new ApiError(404, 'Asociación no encontrada');
    }
    
    await association.destroy();
    return { message: 'Asociación eliminada' };
  }

  async updateAssociation(productId, petTypeId, updateData) {
    const association = await ProductPetType.findOne({
      where: { 
        product_id: productId,
        pet_type_id: petTypeId 
      }
    });
    
    if (!association) {
      throw new ApiError(404, 'Asociación no encontrada');
    }
    
    return await association.update(updateData);
  }
}