'use strict';

const mongoose = require('mongoose');
const env       = process.env.NODE_ENV || 'development';
const config    = require(__dirname + '/../../config/config.json')[env];

/*
 * Initialize Mongoose connection
 *
 */
mongoose.connect(config.mongodbUrl, {
    promiseLibrary: Promise,
    reconnectTries: Number.MAX_VALUE,
    socketTimeoutMS: 30000
});

// When successfully connected
mongoose.connection.on('connected', () => console.log(`Mongoose connection open to: ${config.mongodbUrl}`));

// If the connection throws an error
mongoose.connection.on('error', (err) => console.log(`Mongoose connection error: ${err}`));

// When the connection is disconnected
mongoose.connection.on('disconnected', () => console.log('Mongoose connection disconnected'));




module.exports.Task = require('./wrapper/task.model');