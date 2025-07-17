import { Op } from 'sequelize';
import Pet from '../models/Pet.js';
import User from '../models/User.js';
import ApiError from '../utils/apiError.js';

export default class PetService {
  async createPet(petData, ownerId, userRole) {
    // Solo clientes pueden asignarse mascotas a sí mismos
    if (userRole === 'CLIENTE' && petData.ownerId !== ownerId) {
      throw new ApiError(403, 'Solo puedes crear mascotas para tu propio perfil');
    }
    return await Pet.create(petData);
  }

  async findAllPets(userRole, userId) {
    const where = {};
    
    // Filtros por rol
    if (userRole === 'CLIENTE') {
      where.ownerId = userId;
    }

    return await Pet.findAll({
      where,
      include: [{
        model: User,
        as: 'owner',
        attributes: ['id', 'name']
      }]
    });
  }

  async findPetById(id, userId, userRole) {
    const pet = await Pet.findByPk(id, {
      include: ['owner']
    });

    if (!pet) throw new ApiError(404, 'Mascota no encontrada');
    
    // Validación de permisos
    if (userRole === 'CLIENTE' && pet.ownerId !== userId) {
      throw new ApiError(403, 'No tienes permiso para ver esta mascota');
    }

    return pet;
  }

  async updatePet(id, updateData, userId, userRole) {
    const pet = await this.findPetById(id, userId, userRole);
    
    if (userRole === 'CLIENTE' && pet.ownerId !== userId) {
      throw new ApiError(403, 'Solo puedes editar tus propias mascotas');
    }

    return await pet.update(updateData);
  }

  async deletePet(id, userId, userRole) {
    const pet = await this.findPetById(id, userId, userRole);
    
    if (userRole === 'CLIENTE' && pet.ownerId !== userId) {
      throw new ApiError(403, 'Solo puedes eliminar tus propias mascotas');
    }

    await pet.destroy();
    return { message: 'Mascota eliminada' };
  }

  async getPetsByOwner(ownerId, userId, userRole) {
    if (userRole === 'CLIENTE' && ownerId !== userId) {
      throw new ApiError(403, 'Solo puedes ver tus propias mascotas');
    }

    return await Pet.findAll({
      where: { ownerId },
      include: ['owner']
    });
  }

  async getPetStats(ownerId) {
    const where = ownerId ? { ownerId } : {};
    
    const stats = await Pet.findAll({
      attributes: [
        [sequelize.fn('COUNT', sequelize.col('id')), 'totalPets'],
        [sequelize.fn('COUNT', sequelize.literal('CASE WHEN species = "dog" THEN 1 END')), 'totalDogs'],
        [sequelize.fn('COUNT', sequelize.literal('CASE WHEN species = "cat" THEN 1 END')), 'totalCats'],
      ],
      where,
      raw: true
    });

    return stats[0];
  }
}