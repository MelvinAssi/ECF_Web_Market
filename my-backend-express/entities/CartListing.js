const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const CartListing = sequelize.define('CartListing', {
  id_cart: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  id_listing: {
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
  tableName: 'cart_listing',
  timestamps: false,
});

module.exports = CartListing;