"use strict";

const mongoose = require('mongoose');


/**
 * @description Define the schema for our Task model.
 */
const task = mongoose.Schema({
    name: {type: String, required: true, unique: true},
    title: {type: String, required: false},
    task_items: [{}],
}, {strict: true});


/**
 * @description Create the model for Task and expose it to our app.
 */
module.exports = mongoose.model('task', task);