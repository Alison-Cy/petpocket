import Role from '../models/Role.js';
import ApiError from '../utils/apiError.js';

export default class RoleService {
  async createRole(roleData) {
    return await Role.create(roleData);
  }

  async getAllRoles() {
    return await Role.findAll({
      order: [['nombre', 'ASC']]
    });
  }

  async getRoleById(id) {
    const role = await Role.findByPk(id);
    if (!role) throw new ApiError(404, 'Rol no encontrado');
    return role;
  }

  async updateRole(id, updateData) {
    const role = await this.getRoleById(id);
    return await role.update(updateData);
  }

  async deleteRole(id) {
    const role = await this.getRoleById(id);
    await role.destroy();
    return { message: 'Rol eliminado' };
  }

  async seedDefaultRoles() {
    const defaultRoles = [
      { nombre: 'ADMIN', descripcion: 'Administrador del sistema' },
      { nombre: 'VETERINARIO', descripcion: 'Personal médico autorizado' },
      { nombre: 'RECEPCIONISTA', descripcion: 'Personal de recepción' },
      { nombre: 'CLIENTE', descripcion: 'Dueños de mascotas' }
    ];

    await Role.bulkCreate(defaultRoles, {
      ignoreDuplicates: true
    });
    return defaultRoles;
  }
}