const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const OrderListing = sequelize.define('OrderListing', {
  order_id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
  },
  listing_id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
    },
  },
  unit_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0,
    },
  },
}, {
  tableName: 'order_listing',
  timestamps: false,
});

module.exports = OrderListing;
