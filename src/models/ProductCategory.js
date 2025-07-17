import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const ProductCategory = sequelize.define('ProductCategory', {
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  descripcion: {
    type: DataTypes.STRING(255)
  },
  imagen: {
    type: DataTypes.STRING(255)
  }
}, {
  paranoid: true, // Soft delete
  tableName: 'product_categories'
});

// Relationships
ProductCategory.associate = (models) => {
  ProductCategory.hasMany(models.Product, {
    foreignKey: 'categoria_id',
    as: 'productos'
  });
};

export default ProductCategory;