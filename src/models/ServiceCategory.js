import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const ServiceCategory = sequelize.define('ServiceCategory', {
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  descripcion: {
    type: DataTypes.STRING(255)
  }
}, {
  paranoid: true // Soft delete
});

// Relationships
ServiceCategory.associate = (models) => {
  ServiceCategory.hasMany(models.Service, {
    foreignKey: 'categoria_id',
    as: 'servicios'
  });
};

export default ServiceCategory;