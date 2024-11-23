'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        name: 'Nghia',
        password: '1234',
        email: 'example@example.com',
        phone: '0123456789',
        address: 'Ha Noi',
        role: 'admin',
        createdAt: new Date(NOW),
        updatedAt: new Date(NOW),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
