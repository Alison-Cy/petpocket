import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Role = sequelize.define('Role', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isIn: [['ADMIN', 'VETERINARIO', 'RECEPCIONISTA', 'CLIENTE']]
    }
  },
  description: DataTypes.TEXT,
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  paranoid: true // Soft delete
});

export default Role;