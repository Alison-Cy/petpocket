import Service from '../models/Service.js';
import ApiError from '../utils/apiError.js';

export default class ServiceService {
  async createService(serviceData) {
    const service = await Service.create(serviceData);
    
    if (serviceData.tiposMascotaIds) {
      await service.setTiposMascota(serviceData.tiposMascotaIds);
    }
    
    return service;
  }

  async getAllServices() {
    return await Service.findAll({
      include: ['categoria', 'tiposMascota'],
      order: [['nombre', 'ASC']]
    });
  }

  async getServiceById(id) {
    const service = await Service.findByPk(id, {
      include: ['categoria', 'tiposMascota', 'citas']
    });
    if (!service) throw new ApiError(404, 'Servicio no encontrado');
    return service;
  }

  async updateService(id, updateData) {
    const service = await this.getServiceById(id);
    const updatedService = await service.update(updateData);
    
    if (updateData.tiposMascotaIds) {
      await updatedService.setTiposMascota(updateData.tiposMascotaIds);
    }
    
    return updatedService;
  }

  async deleteService(id) {
    const service = await this.getServiceById(id);
    await service.destroy();
    return { message: 'Servicio eliminado' };
  }

  async getServicesByCategory(categoryId) {
    return await Service.findAll({
      where: { categoria_id: categoryId },
      include: ['tiposMascota']
    });
  }

  async getServicesByPetType(petTypeId) {
    return await Service.findAll({
      include: [{
        association: 'tiposMascota',
        where: { id: petTypeId }
      }]
    });
  }
}