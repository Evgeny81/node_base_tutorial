"use strict";

const mongoose = require('mongoose');


/**
 * @description Define the schema for our Task Item model.
 */
const task_item = mongoose.Schema({
    task_item_id: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    status: {
        type: String,
        enum : ['NEW','IN_PROGRESS', 'BLOCKED', 'IN_REVEW', 'VERIFIED', 'DONE'],
        default: 'NEW'
    },
    difficulty_level: {
        type: String,
        enum: ['A', 'B', 'C'],
        default: 'A'
    },
}, {strict: true});


/**
 * @description Create the model for Task Item and expose it to our app.
 */
module.exports = mongoose.model('task', task);