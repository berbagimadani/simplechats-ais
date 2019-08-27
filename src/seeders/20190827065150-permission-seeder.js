'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('permissions', [
      {
        role_id : 1,
        name: 'orders',
        guard_name: '/orders',
        method: 'GET',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        role_id: 1,
        name: 'orders',
        guard_name: '/orders',
        method: 'POST',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        role_id: 4,
        name: 'orders',
        guard_name: '/orders',
        method: 'GET',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        role_id: 4,
        name: 'customer',
        guard_name: '/customers',
        method: 'POST',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});

  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('permissions', null, {});
  }
};
