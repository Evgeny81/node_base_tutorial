"use strict";

const dbConfig = require('@root/config/config.js');
require('dotenv').config();
const env = process.env.NODE_ENV || 'development';
const localEnv = _loadLocalEnv();

/**
 * @type function
 * @access private
 * @description Load .env file if such exists.
 * @returns {{}}
 */
function _loadLocalEnv() {
    return  {
        host: process.env.HOST,
        port: process.env.PORT,
        web_host: process.env.WEB_HOST,
        web_port: process.env.WEB_PORT,
        protocol: process.env.PROTOCOL,

        mysql: Object.assign(dbConfig[env], {
            dialect: process.env.DB_MYSQL_DIALECT,
            multipleStatements: process.env.DB_MYSQL_MULTIPLESTATEMENTS,
            host: process.env.DB_MYSQL_HOST,
            username: process.env.DB_MYSQL_USERNAME,
            password: process.env.DB_MYSQL_PASS,
            database: process.env.DB_MYSQL_NAME
        })
    }
}

const config = {

    /* DEVELOPMENT ENV */
    development: Object.assign({
        host: '127.0.0.1', // local host to run the server
        port: '9000',      // local port to run the server
        web_host: 'localhost',
        web_port: '3000',
        protocol: 'https',

        mysql: {
            dialect: 'mysql',
            multipleStatements: true,
            host: '127.0.0.1',
            user: 'root',
            password: '',
            database: 'node_base_tutorial'
        },

        mongodbUrl: "mongodb://localhost:27017/node_base_tutorial_development",

        swagger_url: '/swagger',
        api_version: 'v1',

        rest_endpoint_base_url () {
            return `/api/${this.api_version}`;
        },

        rest_url () {
            return `${this.protocol}://${this.host}:${this.port}`;
        },

        website_url () {
            return `${this.protocol}://${this.web_host}:${this.web_port}`;
        },

    }, localEnv),

    /* PRODUCTION ENV */
    production: Object.assign({
        host: '127.0.0.1', // local host to run the server
        port: '3000',   // local port to run the server
        web_host: 'app.node_base_tutorial.com',
        web_port: '443',
        protocol: 'https',

        mysql: {
            dialect: 'mysql',
            multipleStatements: true,
            host: '127.0.0.1',
            user: 'root',
            password: 'root',
            database: 'node_base_tutorial'
        },
        mongodbUrl: "mongodb://localhost:27017/node_base_tutorial_production",

        swagger_url: '/swagger',
        api_version: 'v1',

        rest_endpoint_base_url () {
            return `/api/${this.api_version}`;
        },

        rest_url () {
            return `${this.protocol}://${this.host}:${this.port}`;
        },

        website_url () {
            return `${this.protocol}://${this.web_host}:${this.web_port}`;
        },
    }, localEnv),


    /* TEST ENV */
    test: Object.assign({
        host: '127.0.0.1', // local host to run the test server
        port: '9001',      // local port to run the test server
        web_host: 'localhost',
        web_port: '3000',
        protocol: 'https',

        mysql: {
            dialect: 'mysql',
            multipleStatements: true,
            host: '127.0.0.1',
            user: 'root',
            password: 'root',
            database: 'node_base_tutorial_test'
        },
        mongodbUrl: "mongodb://localhost:27017/node_base_tutorial_test",

        swagger_url: '/swagger',
        api_version: 'v1',

        rest_endpoint_base_url () {
            return `/api/${this.api_version}`;
        },

        rest_url () {
            return `${this.protocol}://${this.host}:${this.port}`;
        },

        website_url () {
            return `${this.protocol}://${this.web_host}:${this.web_port}`;
        }
    })
};

module.exports = config[env];