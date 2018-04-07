'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
      return queryInterface.bulkInsert('accounts', [
          {
              "id": "1",
              "name": "test",
              "domain_name": "test.com"
          },
          {
              "id": "2",
              "name": "test2",
              "domain_name": "test2.com"
          },
          {
              "id": "3",
              "name": "test3",
              "domain_name": "test3.com"
          }
      ], {});
  },

  down(queryInterface, Sequelize) {
      return queryInterface.bulkDelete('accounts', null, {});
  }
};
