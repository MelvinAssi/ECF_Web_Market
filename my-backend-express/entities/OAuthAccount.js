const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const OAuthAccount = sequelize.define("OAuthAccount", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  provider: { type: DataTypes.STRING, allowNull: false },
  providerId: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING },
  id_user: {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: User, key: "id_user" },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
}, {
  tableName: "oauth_accounts",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: false,
});

module.exports = OAuthAccount;