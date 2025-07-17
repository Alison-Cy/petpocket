import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Appointment = sequelize.define('Appointment', {
  date: { type: DataTypes.DATE, allowNull: false },
  notes: { type: DataTypes.TEXT },
}, { timestamps: true });

Appointment.associate = (models) => {
  Appointment.belongsTo(models.User, { foreignKey: 'userId' });
  Appointment.belongsTo(models.Pet, { foreignKey: 'petId' });
  Appointment.belongsTo(models.AppointmentStatus, { foreignKey: 'statusId' });
  Appointment.belongsTo(models.Service, { foreignKey: 'serviceId' });
};

export default Appointment;