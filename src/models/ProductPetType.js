import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const ProductPetType = sequelize.define('ProductPetType', {
  // Additional attributes for the relationship can be added here
  // For example:
  // recommendedAge: DataTypes.STRING,
  // specialInstructions: DataTypes.TEXT
}, {
  tableName: 'product_pet_types',
  timestamps: true,
  paranoid: true // Soft delete
});

// Relationships
ProductPetType.associate = (models) => {
  ProductPetType.belongsTo(models.Product, {
    foreignKey: 'product_id',
    as: 'product'
  });
  
  ProductPetType.belongsTo(models.PetType, {
    foreignKey: 'pet_type_id',
    as: 'petType'
  });
};

export default ProductPetType;