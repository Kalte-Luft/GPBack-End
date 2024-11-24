'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Donation extends Model {
    static associate(models) {
      // Liên kết với User
      Donation.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'User',
      });   
    }
  }
  Donation.init(
    {
      user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      participant_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      amount: {
        type: DataTypes.DECIMAL(20, 2),
        allowNull: false,
      },
      paymentMethod: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      transactionID: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'Donation',
    }
  );
  return Donation;
};
