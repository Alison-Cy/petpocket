import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const ServicePetType = sequelize.define('ServicePetType', {
  // Campos adicionales (opcionales)
}, { timestamps: false });

ServicePetType.associate = (models) => {
  ServicePetType.belongsTo(models.Service, { foreignKey: 'serviceId' });
  ServicePetType.belongsTo(models.PetType, { foreignKey: 'petTypeId' });
};

export default ServicePetType;