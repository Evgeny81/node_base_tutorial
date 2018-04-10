"use strict";

const router = require('express').Router();
const postValidUserArguments = ["name", "description", "age", "password","username"];
const requiredPostUserArgs = ["password","username"];
const putValidUserArguments = ["name", "description", "age"];
const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passRegExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/; // at least 1 number, 1 lowercase and 1 uppercase letter and 6 characters.
const userModel = require('../models').Sequelize.users;

/* GET users listing. */
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

/* GET user by id */
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

/* POST new User*/
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



/* PUT User by id*/
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
