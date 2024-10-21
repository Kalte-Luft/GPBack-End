'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Payment.init({
    order_id: DataTypes.INTEGER,
    payment_date: DataTypes.DATE,
    total: DataTypes.DECIMAL(10, 2),
    payment_method: DataTypes.ENUM('credit_card', 'cash_on_delivery', 'bank_transfer'),
    payment_status: DataTypes.ENUM('paid', 'pending', 'cancelled'),
  }, {
    sequelize,
    modelName: 'Payment',
  });
  return Payment;
};