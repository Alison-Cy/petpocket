import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const AppointmentStatus = sequelize.define('AppointmentStatus', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  descripcion: DataTypes.TEXT
});

AppointmentStatus.associate = (models) => {
  AppointmentStatus.hasMany(models.Appointment, {
    foreignKey: 'estado_cita_id',
    as: 'citas'
  });
};

export default AppointmentStatus;