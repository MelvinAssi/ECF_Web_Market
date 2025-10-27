const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  id_user: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      max: 64,
    },
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: true,
    validate: {
      len: [12, 100],
      is: /[A-Z]/,
      is: /[a-z]/,
      is: /\d/,
      is: /[!@#$%^&*]/,
    },
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      len: [2, 64],
    },
  },
  firstname: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      len: [2, 64],
    },
  },
  adress: {
    type: DataTypes.STRING(100),
    allowNull: true,
    validate: {
      len: [2, 64],
    },
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: true,
    validate: {
      matches: {
        args: /^[0-9]{10}$/,
        msg: 'Numéro invalide',
      },
    },
  },
  role: {
    type: DataTypes.ENUM('BUYER', 'SELLER', 'ADMIN'),
    allowNull: false,
    defaultValue: 'BUYER',
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  last_activity: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'users',
  timestamps: false,
});

module.exports = User;