import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const ServicePetType = sequelize.define('ServicePetType', {
  // Puede incluir atributos adicionales para la relación
}, {
  timestamps: false,
  tableName: 'service_pet_types'
});

ServicePetType.associate = (models) => {
  ServicePetType.belongsTo(models.Service, {
    foreignKey: 'servicio_id'
  });
  ServicePetType.belongsTo(models.PetType, {
    foreignKey: 'tipo_mascota_id'
  });
};

export default ServicePetType;