'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Order_items', {
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
      product_id: {
          type: Sequelize.INTEGER,
          allowNull: false
      },
      quantity: {
          type: Sequelize.INTEGER,
          allowNull: false
      },
      price: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Order_items');
  }
};