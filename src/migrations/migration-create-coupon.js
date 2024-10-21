'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Coupons', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      discount_percentage: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: false
      },
      valid_from: {
        type: Sequelize.DATE,
        allowNull: false
      },
      valid_to: {
        type: Sequelize.DATE,
        allowNull: false
      },
      min_order_amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Coupons');
  }
};