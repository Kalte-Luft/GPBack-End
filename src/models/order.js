'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Order.init({
    order_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    order_date: DataTypes.DATE,
    status: DataTypes.ENUM('pending', 'completed', 'cancelled'),
    total_amount: DataTypes.DECIMAL(10, 2),
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};