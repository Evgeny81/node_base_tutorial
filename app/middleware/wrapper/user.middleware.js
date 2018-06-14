"use strict";

const validator = require('one-validation');
const expectedUserArguments = ["username", "password"];
const putValidUserArguments = ["name", "description", "age"];

module.exports = {

    /**
     * @access public
     * @param req
     * @param res
     * @param next
     * @description Check arguments for create user.
     * @returns {void}
     */
    async validatePostUserArgs(req, res, next) {
        const missingArgs = expectedUserArguments.filter((key) => !req.body[key]);
        // validate args existence
        if (missingArgs.length)
            return res.status(400).json({
                statusCode: 400,
                errorCode: 'MissingRequiredBodyParameter',
                errorMessage: `Missing args: ${missingArgs}.`
            });

        // validate email
        const username = req.body.username;
        const emailValidation = validator.email.test(username);
        if (!emailValidation)
            return res.status(400).json(    {
                statusCode: 400,
                errorCode: 'InvalidInput',
                errorMessage: 'The `email` is not valid.'
            });

        // if arguments are valid, carry on
        return next();
    },

    /**
     * @access public
     * @param req
     * @param res
     * @param next
     * @description Check arguments for update user.
     * @returns {void}
     */
    async validatePutUserArgs(req, res, next) {
        // Validate Args
        const invalidArguments = Object.keys(req.body).filter((key) => !putValidUserArguments.includes(key));

        if (invalidArguments.length) {
            return res.status(409).json(    {
                statusCode: 409,
                errorCode: 'InvalidArguments',
                errorMessage: `Invalid arguments: ${invalidArguments.join(", ")}`
            });
        }

        // if arguments are valid, carry on
        return next();
    }
};