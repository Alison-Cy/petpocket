import bcrypt from 'bcryptjs';
import { Op } from 'sequelize';
import User from '../models/User.js';
import Role from '../models/Role.js';
import ApiError from '../utils/apiError.js';

export default class UserService {
  async createUser(createUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    return await User.create({ ...createUserDto, password: hashedPassword });
  }

  async findAllUsers(includeInactive = false) {
    const where = includeInactive ? {} : { isActive: true };
    return await User.findAll({ 
      where,
      include: [{
        model: Role,
        attributes: ['name']
      }],
      attributes: { exclude: ['password'] }
    });
  }

  async findUserById(id) {
    const user = await User.findByPk(id, {
      include: [Role],
      attributes: { exclude: ['password'] }
    });
    if (!user) throw new ApiError(404, 'Usuario no encontrado');
    return user;
  }

  async updateUser(id, updateUserDto) {
    const user = await this.findUserById(id);
    return await user.update(updateUserDto);
  }

  async changePassword(userId, currentPassword, newPassword) {
    const user = await User.findByPk(userId);
    if (!user) throw new ApiError(404, 'Usuario no encontrado');

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) throw new ApiError(400, 'Contraseña actual incorrecta');

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
  }

  async getUserStats() {
    const stats = await User.findAll({
      attributes: [
        [sequelize.fn('COUNT', sequelize.col('id')), 'totalUsers'],
        [sequelize.fn('COUNT', sequelize.literal('CASE WHEN "isActive" = true THEN 1 END')), 'activeUsers'],
      ],
      raw: true
    });
    return stats[0];
  }

  async findByRole(roleName) {
    return await User.findAll({
      include: [{
        model: Role,
        where: { name: roleName }
      }],
      attributes: { exclude: ['password'] }
    });
  }

  async deactivateUser(id) {
    const user = await this.findUserById(id);
    user.isActive = false;
    await user.save();
    return user;
  }

  async restoreUser(id) {
    await User.restore({ where: { id } });
    return this.findUserById(id);
  }
}