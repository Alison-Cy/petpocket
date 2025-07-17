import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Role = sequelize.define('Role', {
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
    validate: {
      isIn: [['ADMIN', 'VETERINARIO', 'RECEPCIONISTA', 'CLIENTE']] // Example roles
    }
  },
  descripcion: {
    type: DataTypes.STRING(200)
  }
}, {
  paranoid: true // Soft delete
});

// Relationships
Role.associate = (models) => {
  Role.hasMany(models.User, {
    foreignKey: 'rol_id',
    as: 'usuarios'
  });
};

export default Role;