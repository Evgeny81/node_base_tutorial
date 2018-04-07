'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
      return queryInterface.bulkInsert('users', [
          {
              "id": "10000",
              "username": "test@yopmail.com",
              "password": "12345",
              "name": "Test",
              "description": "Test User",
              "age": 24
          },
          {
              "id": "10001",
              "username": "test1@yopmail.com",
              "password": "12345",
              "name": "Test 1",
              "description": "Test User 1",
              "age": 24
          },
          {
              "id": "10002",
              "username": "test2@yopmail.com",
              "password": "12345",
              "name": "Test 1",
              "description": "Test User 2",
              "age": 24
          },
          {
              "id": "10003",
              "username": "test3@yopmail.com",
              "password": "12345",
              "name": "Test 1",
              "description": "Test User 3",
              "age": 24
          },
          {
              "id": "10004",
              "username": "test4@yopmail.com",
              "password": "12345",
              "name": "Test 1",
              "description": "Test User 4",
              "age": 24
          }
      ], {});
  },

  down (queryInterface, Sequelize) {
      return queryInterface.bulkDelete('users', null, {});
  }
};
