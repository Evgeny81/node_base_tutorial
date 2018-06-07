"use strict";

const router = require('express').Router();
const postValidUserArguments = ["name", "description", "age", "password","username"];
const requiredPostUserArgs = ["password","username"];
const putValidUserArguments = ["name", "description", "age"];
const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passRegExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/; // at least 1 number, 1 lowercase and 1 uppercase letter and 6 characters.
const userModel = require('../models').Sequelize.users;


/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoint /users
 */


/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get Users
 *     description: Get All Users
 *     tags: [Users]
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Success get all users
 */
router.get('/', (req, res, next) => {
	userModel
		.all()
		.then((data) => {
            res.status(200).json(data);
		})
		.catch((err) => {
            res.status(500).json("Internal Server Error, Please, try later")
		});
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get byId
 *     description: Get user by id
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         description: User's id
 *         in: path
 *         type: string
 *         required: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Success get user
 *       400:
 *         description: Can't find user by id
 */
router.get('/:id', (req, res, next) => {
	const id = req.params.id;

	userModel
		.findById(id)
		.then((user) => {
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json("User Not Found");
            }
        })
        .catch((err) => {
            res.status(500).json("Internal Server Error, Please, try later")
        });
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Add User
 *     description: Add user
 *     tags: [Users]
 *     parameters:
 *       - name: username
 *         description: User's email
 *         in: formData
 *         type: string
 *         required: true
 *       - name: password
 *         description: User's password
 *         in: formData
 *         type: string
 *         required: true
 *       - name: name
 *         description: User's name
 *         in: formData
 *         type: string
 *         required: false
 *       - name: age
 *         description: User's age
 *         in: formData
 *         type: string
 *         required: false
 *       - name: description
 *         description: User's description
 *         in: formData
 *         type: string
 *         required: false
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Success add user
 *       409:
 *         description: Invalid arguments
 */
router.post('/', (req, res, next) => {
	const args = req.body;

    // Validate Args
    const invalidArguments = Object.keys(args).filter((key) => !postValidUserArguments.includes(key));

    if (invalidArguments.length) {
    	res.status(409).json(`Invalid arguments: ${invalidArguments.join(", ")}`);
    	return;
    }

    // Verify required args existance
    const missingRequiredArgs = requiredPostUserArgs.filter((key) => !args[key]);

    if (missingRequiredArgs.length) {
    	res.status(409).json(`Missing arguments: ${missingRequiredArgs.join(", ")}`);
    	return;
    }

    // Check Validity of required Args

    // Validate email
    if (!emailRegExp.test(args.username)) {
		res.status(409).json(`Email is not valid`);
		return;
	}
	
    // Validate Password
    if( !passRegExp.test(args.password)) {
    	res.status(409).json(`Password is not valid. Make sure to have at least 1 number, 1 lowercase and 1 uppercase letter and 6 characters`);
		return;
	}

	userModel
        .create(args)
        .then((user) => {
            if (user) {
                res.status(201).json(user);
            } else {
                res.status(404).json("User Not Found");
            }
        })
        .catch((err) => {
            res.status(500).json("Server internal Error, couldn't update the user, please try late");
        });
});

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update User
 *     description: Update user by id
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         description: User's id
 *         in: path
 *         type: string
 *         required: true
 *       - name: name
 *         description: User's name
 *         in: formData
 *         type: string
 *         required: false
 *       - name: age
 *         description: User's age
 *         in: formData
 *         type: string
 *         required: false
 *       - name: description
 *         description: User's description
 *         in: formData
 *         type: string
 *         required: false
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Success update user
 *       400:
 *         description: Can't find user by id
 *       409:
 *         description: Invalid arguments
 */
router.put('/:id', (req, res, next) => {
	const id = req.params.id;
	const args = req.body;

    // Validate Args
    const invalidArguments = Object.keys(args).filter((key) => !putValidUserArguments.includes(key));

    if (invalidArguments.length) {
    	res.status(409).json(`Invalid arguments: ${invalidArguments.join(", ")}`);
    	return;
    }

    userModel
		.update(args, { where: {id} })
		.then(([affectedCount]) => {
			if (affectedCount) {
				res.status(201).json("User Successfuly Updated");
			} else {
				res.status(404).json("User Not Found");
			}
		})
		.catch((err) => {
			res.status(500).json("Server internal Error, couldn't update the user, please try late");
		});
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete User
 *     description: Delete user by id
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         description: User's id
 *         in: path
 *         type: string
 *         required: true
 *     produces:
 *       - application/json
 *     responses:
 *       201:
 *         description: User Successfuly Deleted
 *       400:
 *         description: User Not Found
 */
router.delete("/:id", (req, res, next) => {
    const id = parseInt(req.params.id, 10);

    userModel
        .destroy({where: {id}})
        .then((affectedCount) => {
            if (affectedCount) {
                res.status(201).json("User Successfuly Deleted");
            } else {
                res.status(404).json("User Not Found");
            }
        })
        .catch((err) => {
            res.status(500).json("Server internal Error, couldn't update the user, please try late");
        });
});

module.exports = router;
