const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Cart = sequelize.define('Cart', {
  id_cart: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  buyer_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  creation_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'cart',
  timestamps: false,
});

module.exports = Cart;