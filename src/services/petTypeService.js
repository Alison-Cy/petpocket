import PetType from '../models/PetType.js';
import ApiError from '../utils/apiError.js';

export default class PetTypeService {
  async createPetType(petTypeData) {
    return await PetType.create(petTypeData);
  }

  async findAllPetTypes() {
    return await PetType.findAll();
  }

  async findPetTypeById(id) {
    const petType = await PetType.findByPk(id);
    if (!petType) throw new ApiError(404, 'Tipo de mascota no encontrado');
    return petType;
  }

  async updatePetType(id, updateData) {
    const petType = await this.findPetTypeById(id);
    return await petType.update(updateData);
  }

  async deletePetType(id) {
    const petType = await this.findPetTypeById(id);
    await petType.destroy();
    return { message: 'Tipo de mascota eliminado' };
  }

  async seedDefaultPetTypes() {
    const defaultTypes = [
      { name: 'Perro', description: 'Mascota canina' },
      { name: 'Gato', description: 'Mascota felina' },
      { name: 'Ave', description: 'Mascota voladora' },
      { name: 'Roedor', description: 'Mascota pequeña' }
    ];

    await PetType.bulkCreate(defaultTypes, { ignoreDuplicates: true });
    return defaultTypes;
  }
}