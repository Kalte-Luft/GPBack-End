'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shipping extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Shipping.init({
    order_id: DataTypes.INTEGER,
    shipping_address: DataTypes.STRING,
    shipping_status: DataTypes.ENUM('waiting', 'sent', 'received'),
    shipping_date: DataTypes.DATE,
    shipping_method: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Shipping',
  });
  return Shipping;
};