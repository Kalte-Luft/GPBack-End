'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Payments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      order_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      payment_method: {
        type: Sequelize.ENUM('credit_card', 'cash_on_delivery', 'bank_transfer'),
        allowNull: false
      },
      payment_status: {
        type: Sequelize.ENUM('paid', 'pending','cancelled'),
        defaultValue: 'pending'
      },
      payment_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Payments');
  }
};