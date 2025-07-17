import ServiceCategory from '../models/ServiceCategory.js';
import ApiError from '../utils/apiError.js';

export default class ServiceCategoryService {
  async createCategory(categoryData) {
    return await ServiceCategory.create(categoryData);
  }

  async getAllCategories() {
    return await ServiceCategory.findAll({
      include: ['servicios'],
      order: [['nombre', 'ASC']]
    });
  }

  async getCategoryById(id) {
    const category = await ServiceCategory.findByPk(id, {
      include: ['servicios']
    });
    if (!category) throw new ApiError(404, 'Categoría no encontrada');
    return category;
  }

  async updateCategory(id, updateData) {
    const category = await this.getCategoryById(id);
    return await category.update(updateData);
  }

  async deleteCategory(id) {
    const category = await this.getCategoryById(id);
    await category.destroy();
    return { message: 'Categoría eliminada' };
  }

  async seedDefaultCategories() {
    const defaultCategories = [
      { nombre: 'Consultas', descripcion: 'Servicios de consulta médica' },
      { nombre: 'Vacunación', descripcion: 'Aplicación de vacunas' },
      { nombre: 'Estética', descripcion: 'Servicios de belleza para mascotas' },
      { nombre: 'Cirugías', descripcion: 'Procedimientos quirúrgicos' }
    ];

    await ServiceCategory.bulkCreate(defaultCategories, { 
      ignoreDuplicates: true 
    });
    return defaultCategories;
  }
}