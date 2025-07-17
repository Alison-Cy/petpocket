import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const ProductPetType = sequelize.define('ProductPetType', {
  // Campos adicionales (opcionales)
}, { timestamps: false });

ProductPetType.associate = (models) => {
  ProductPetType.belongsTo(models.Product, { foreignKey: 'productId' });
  ProductPetType.belongsTo(models.PetType, { foreignKey: 'petTypeId' });
};

export default ProductPetType;