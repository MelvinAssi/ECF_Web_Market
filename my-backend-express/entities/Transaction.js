const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Transaction = sequelize.define('Transaction', {
  id_transaction: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  transaction_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  status: {
    type: DataTypes.ENUM('PENDING', 'COMPLETED', 'FAILED'),
    allowNull: false,
  },
  order_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
}, {
  tableName: 'transactions',
  timestamps: false,
});

module.exports = Transaction;