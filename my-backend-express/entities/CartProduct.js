const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const CartProduct = sequelize.define('CartProduct', {
  id_cart: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  id_product: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
    },
  },
}, {
  tableName: 'cart_product',
  timestamps: false,
});

module.exports = CartProduct;