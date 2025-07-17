import jwt from 'jsonwebtoken';
import UserService from './userService.js';
import ApiError from '../utils/apiError.js';

const userService = new UserService();

export default class AuthService {
  async login(email, password) {
    const user = await userService.findUserByEmail(email);
    if (!user) throw new ApiError(404, 'Usuario no encontrado');

    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new ApiError(401, 'Credenciales inválidas');

    const token = jwt.sign(
      { 
        id: user.id,
        correo: user.correo,
        rol: user.rol.nombre 
      },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    return {
      user: {
        id: user.id,
        nombres: user.nombres,
        apellidos: user.apellidos,
        correo: user.correo,
        rol: user.rol
      },
      token
    };
  }

  async register(userData) {
    return await userService.createUser(userData);
  }
}