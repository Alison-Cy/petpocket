import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Pet = sequelize.define('Pet', {
  name: { type: DataTypes.STRING, allowNull: false },
}, { timestamps: true });

Pet.associate = (models) => {
  Pet.belongsTo(models.User, { foreignKey: 'ownerId' });
  Pet.belongsTo(models.PetType, { foreignKey: 'petTypeId' });
  Pet.belongsToMany(models.Service, { through: 'ServicePet' });
  Pet.hasMany(models.Appointment, { foreignKey: 'petId' });
};

export default Pet;