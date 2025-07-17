import Role from '../models/Role.js';
import ApiError from '../utils/apiError.js';

export default class RoleService {
  async createRole(createRoleDto) {
    return await Role.create(createRoleDto);
  }

  async findAllRoles(includeInactive = false) {
    const where = includeInactive ? {} : { isActive: true };
    return await Role.findAll({ where });
  }

  async findRoleById(id) {
    const role = await Role.findByPk(id);
    if (!role) throw new ApiError(404, 'Rol no encontrado');
    return role;
  }

  async updateRole(id, updateRoleDto) {
    const role = await this.findRoleById(id);
    return await role.update(updateRoleDto);
  }

  async restoreRole(id) {
    await Role.restore({ where: { id } });
    return this.findRoleById(id);
  }

  async deleteRole(id) {
    const role = await this.findRoleById(id);
    await role.destroy();
    return { message: 'Rol eliminado (soft delete)' };
  }

  async seedDefaultRoles() {
    const defaultRoles = [
      { name: 'ADMIN', description: 'Administrador del sistema' },
      { name: 'VETERINARIO', description: 'Personal médico' },
      { name: 'RECEPCIONISTA', description: 'Atención al cliente' },
      { name: 'CLIENTE', description: 'Dueño de mascotas' }
    ];

    await Role.bulkCreate(defaultRoles, { ignoreDuplicates: true });
  }
}