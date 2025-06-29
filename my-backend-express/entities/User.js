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
    allowNull: false,
    validate: {
      len: [12, 64],
      is: /[A-Z]/,
      is: /[a-z]/,
      is: /\d/,
      is: /[!@#$%^&*]/,
    },
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('BUYER', 'SELLER', 'ADMIN'),
    allowNull: false,
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