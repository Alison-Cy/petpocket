import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Appointment = sequelize.define('Appointment', {
  fecha: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  hora: {
    type: DataTypes.TIME,
    allowNull: false
  },
  observaciones: {
    type: DataTypes.TEXT
  },
  precioFinal: {
    type: DataTypes.DECIMAL(10, 2)
  }
}, {
  paranoid: true // Soft delete
});

// Relationships
Appointment.associate = (models) => {
  Appointment.belongsTo(models.User, {
    foreignKey: 'cliente_id',
    as: 'cliente'
  });
  Appointment.belongsTo(models.Pet, {
    foreignKey: 'mascota_id',
    as: 'mascota'
  });
  Appointment.belongsTo(models.Service, {
    foreignKey: 'servicio_id',
    as: 'servicio'
  });
  Appointment.belongsTo(models.AppointmentStatus, {
    foreignKey: 'estado_cita_id',
    as: 'estadoCita'
  });
};

export default Appointment;