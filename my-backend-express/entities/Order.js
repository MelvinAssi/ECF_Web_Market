const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Order = sequelize.define('Order', {
  id_order: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  order_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  total_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  status: {
    type: DataTypes.ENUM('PENDING', 'VALIDATED', 'DELIVERED'),
    allowNull: false,
  },
  buyer_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
}, {
  tableName: 'orders',
  timestamps: false,
});

module.exports = Order;