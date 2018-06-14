"use strict";

const postValidTaskArguments = ["name", "title", "task_items"];
const requiredPostTaskArgs = ["name"];
const putValidTaskArguments = ["title", "task_items"];

module.exports = {

    /**
     * @access public
     * @param req
     * @param res
     * @param next
     * @description Check arguments for create task.
     * @returns {void}
     */
    async validatePostTaskArgs(req, res, next) {
        const args = req.body;
        // Validate Args
        const invalidArguments = Object.keys(args).filter((key) => !postValidTaskArguments.includes(key));

        if (invalidArguments.length)
            return res.status(409).json({
                statusCode: 409,
                errorCode: 'InvalidBodyParameter',
                errorMessage: `Invalid arguments: ${invalidArguments.join(", ")}`
            });

        // Verify required args existance
        const missingRequiredArgs = requiredPostTaskArgs.filter((key) => !args[key]);

        if (missingRequiredArgs.length)
            return res.status(400).json({
                statusCode: 400,
                errorCode: 'MissingRequiredBodyParameter',
                errorMessage: `Missing arguments: ${missingRequiredArgs.join(", ")}`
            });

        // if arguments are valid, carry on
        return next();
    },

    /**
     * @access public
     * @param req
     * @param res
     * @param next
     * @description Check arguments for update task.
     * @returns {void}
     */
    async validatePutTaskArgs(req, res, next) {
        // Validate Args

        // Validate Args
        const invalidArguments = Object.keys(req.body).filter((key) => !putValidTaskArguments.includes(key));

        if (invalidArguments.length)
            return res.status(409).json({
                statusCode: 409,
                errorCode: 'InvalidBodyParameter',
                errorMessage: `Invalid arguments: ${invalidArguments.join(", ")}`
            });

        // if arguments are valid, carry on
        return next();
    }
};