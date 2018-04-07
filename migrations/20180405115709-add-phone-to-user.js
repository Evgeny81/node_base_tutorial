'use strict';

module.exports = {
    up(queryInterface, Sequelize) {
        return queryInterface.addColumn( 'users', 'phone', Sequelize.INTEGER);
    },

    down(queryInterface, Sequelize) {
        return queryInterface.removeColumn( 'users', 'phone' );
    }
};