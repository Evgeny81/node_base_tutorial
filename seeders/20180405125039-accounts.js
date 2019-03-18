'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
      return queryInterface.bulkInsert('accounts', [
          {
              "name": "test",
              "domain_name": "test.com"
          },
          {
              "name": "test2",
              "domain_name": "test2.com"
          },
          {
              "name": "test3",
              "domain_name": "test3.com"
          }
      ], {});
  },

  down(queryInterface, Sequelize) {
      return queryInterface.bulkDelete('accounts', null, {});
  }
};
