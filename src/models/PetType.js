import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const PetType = sequelize.define('PetType', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.TEXT
  }
}, {
  paranoid: true // Soft delete
});

// Relationships
PetType.associate = (models) => {
  PetType.hasMany(models.Pet, {
    foreignKey: 'petTypeId'
  });
};

export default PetType;