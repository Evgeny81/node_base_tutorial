"use strict";

const router = require('express').Router();
const userModel = require('@models/').Sequelize.users;
const middleware = require('@middleware/'),
    passwordMiddle = middleware.Password,
    userMiddle = middleware.User;

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
router.post('/',
    userMiddle.validatePostUserArgs,
    passwordMiddle.isValidPassword,
    (req, res, next) => {
        userModel
            .create(req.body)
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
router.put('/:id',
    userMiddle.validatePutUserArgs,
    (req, res, next) => {
        const id = req.params.id;

        userModel
            .update(req.body, { where: {id} })
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
