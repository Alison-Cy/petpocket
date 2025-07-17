import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const User = sequelize.define('User', {
  nombres: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  apellidos: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  cedula: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true
  },
  correo: {
    type: DataTypes.STRING(150),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  contrasena: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  rol_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  paranoid: true, // Soft delete
  defaultScope: {
    attributes: { exclude: ['contrasena'] } // Never return password by default
  }
});

// Relationships
User.associate = (models) => {
  User.belongsTo(models.Role, {
    foreignKey: 'rol_id',
    as: 'rol'
  });
  
  User.hasMany(models.Pet, {
    foreignKey: 'propietario_id',
    as: 'mascotas'
  });
  
  User.hasMany(models.Appointment, {
    foreignKey: 'cliente_id',
    as: 'citas'
  });
};

// Password hashing hook
User.beforeSave(async (user) => {
  if (user.changed('contrasena')) {
    const salt = await bcrypt.genSalt(10);
    user.contrasena = await bcrypt.hash(user.contrasena, salt);
  }
});

// Instance method for password comparison
User.prototype.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.contrasena);
};

export default User;