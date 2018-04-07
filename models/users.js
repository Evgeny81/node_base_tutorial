'use strict';

const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define('users', {
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        name: DataTypes.STRING,
        age: DataTypes.INTEGER
    }, {});

    User.associate = function(models) {
        // associations can be defined here
    };

    User.beforeCreate((user, opt) => {
        return new Promise(function (resolve, reject) {
            bcrypt.hash(user.password, 10, (err, hash) => {
                if (err) {
                    console.log(err);
                    return  reject(err);
                }

                user.password = hash;
                resolve();
            });
          })
    });

    return User;

};