'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert('roles', [
      {
        name : 'Admin',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Kordinator',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Sales',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Marketing',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('roles', null, {});
  }
};
