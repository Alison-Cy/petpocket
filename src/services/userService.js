import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import ApiError from '../utils/apiError.js';

export default class UserService {
  async createUser(userData) {
    return await User.create(userData);
  }

  async findUserById(id) {
    const user = await User.findByPk(id, {
      include: ['rol', 'mascotas', 'citas']
    });
    if (!user) throw new ApiError(404, 'Usuario no encontrado');
    return user;
  }

  async findUserByEmail(email) {
    return await User.findOne({ 
      where: { correo: email },
      include: ['rol']
    });
  }

  async updateUser(id, updateData) {
    const user = await this.findUserById(id);
    return await user.update(updateData);
  }

  async deleteUser(id) {
    const user = await this.findUserById(id);
    await user.destroy();
    return { message: 'Usuario eliminado' };
  }

  async getAllUsers() {
    return await User.findAll({
      include: ['rol'],
      order: [['apellidos', 'ASC']]
    });
  }

  async changePassword(userId, currentPassword, newPassword) {
    const user = await User.findByPk(userId);
    if (!user) throw new ApiError(404, 'Usuario no encontrado');

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) throw new ApiError(400, 'Contraseña actual incorrecta');

    user.contrasena = newPassword;
    await user.save();
  }
}