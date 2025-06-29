const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Product = sequelize.define('Product', {
  id_product: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  condition: {
    type: DataTypes.ENUM('NEW', 'GOOD', 'USED'),
    allowNull: false,
  },
  verification_status: {
    type: DataTypes.ENUM('UNDER_VERIFICATION', 'RECONDITIONED', 'READY_TO_SELL', 'REJECTED'),
    allowNull: false,
  },
  images: {
    type: DataTypes.ARRAY(DataTypes.TEXT),
    allowNull: true,
  },
  category_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
}, {
  tableName: 'product',
  timestamps: false,
});

module.exports = Product;