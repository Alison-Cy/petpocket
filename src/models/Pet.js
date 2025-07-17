import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Pet = sequelize.define('Pet', {
  name: { type: DataTypes.STRING, allowNull: false },
  species: { 
    type: DataTypes.ENUM('dog', 'cat', 'bird', 'other'),
    allowNull: false
  },
  breed: DataTypes.STRING,
  age: DataTypes.INTEGER,
  medicalHistory: DataTypes.TEXT
}, {
  paranoid: true // Soft delete
});

// Relación con Dueño (Usuario)
Pet.associate = (models) => {
  Pet.belongsTo(models.User, { 
    foreignKey: 'ownerId',
    as: 'owner'
  });
};

export default Pet;