// Add this to your existing Product model
Product.associate = (models) => {
  Product.belongsTo(models.ProductCategory, {
    foreignKey: 'categoria_id',
    as: 'categoria'
  });
  
  // ... other associations ...
};