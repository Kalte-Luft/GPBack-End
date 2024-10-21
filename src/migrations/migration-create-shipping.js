'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Shipping', {
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
      shipping_address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      shipping_status: {
        type: Sequelize.ENUM('shipped', 'delivered', 'pending'),
        defaultValue: 'pending'
      },
      shipping_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      shipping_method: {
        type: Sequelize.STRING,
        allowNull: true
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Shipping');
  }
};