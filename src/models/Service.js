import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Service = sequelize.define('Service', {
  nombre: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  imagen: {
    type: DataTypes.STRING(255)
  },
  duracionMinutos: {
    type: DataTypes.INTEGER,
    defaultValue: 60
  }
}, {
  paranoid: true, // Soft delete
  defaultScope: {
    include: ['categoria', 'tiposMascota']
  }
});

// Relationships
Service.associate = (models) => {
  Service.belongsTo(models.ServiceCategory, {
    foreignKey: 'categoria_id',
    as: 'categoria'
  });

  Service.belongsToMany(models.PetType, {
    through: models.ServicePetType,
    foreignKey: 'servicio_id',
    as: 'tiposMascota'
  });

  Service.hasMany(models.Appointment, {
    foreignKey: 'servicio_id',
    as: 'citas'
  });
};

export default Service;