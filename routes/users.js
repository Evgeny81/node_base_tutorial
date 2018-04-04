"use strict";

const fs = require('fs');
const path = require('path');
const router = require('express').Router();
const filePath = path.join(__dirname, '../db', 'users.json');
let usersData = require(filePath);
const postValidUserArguments = ["name", "description", "age", "password","username"];
const requiredPostUserArgs = ["password","username"];
const putValidUserArguments = ["name", "description", "age"];
const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passRegExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/; // at least 1 number, 1 lowercase and 1 uppercase letter and 6 characters.



/* GET users listing. */
router.get('/', (req, res, next) => {
	res.status(200).json(usersData);
});

/* GET user by id */
router.get('/:id', (req, res, next) => {
	const userId = req.params.id;
	const user = usersData.find((u) => u.id === userId);

	if (user) {
		res.status(200).json(user);
	} else {
		res.status(404).json("User Not Found");
	}	
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

	// Add User to usersData.
	usersData.push( Object.assign(args, { id: `${new Date().getTime()}` }) );

	// Update File
	fs.writeFile(filePath, JSON.stringify(usersData), (err) => {
       	if (err) {
            res.status(500).json("Server internal Error, couldn't update the user, please try late");
            console.log(err);
            throw err;				
       	} else {
 			res.status(201).json("Successfully Created");
       	}
    });
});

/* PUT User by id*/
router.put('/:id', (req, res, next) => {
	const userId = req.params.id;
	const user = usersData.find((u) => u.id === userId);
	const args = req.body;

    // Validate Args
    const invalidArguments = Object.keys(args).filter((key) => !putValidUserArguments.includes(key));

    if (invalidArguments.length) {
    	res.status(409).json(`Invalid arguments: ${invalidArguments.join(", ")}`);
    	return;
    }

	// Veryfy User Existance
	if (!user) {
		res.status(404).json("User Not Found");
		return;
	}

	// Update usersData.
	usersData.map((user) => {
		if (user.id === userId) 
			user = Object.assign(user, args);
	
		return user;
	});

	// Update File
	fs.writeFile(filePath, JSON.stringify(usersData), (err) => {
       	if (err) {
            res.status(500).json("Server internal Error, couldn't update the user, please try late");
            console.log(err);
            throw err;				
       	} else {
 			res.status(201).json("Successfully Updated");
       	}
    });
});

router.delete("/:id", (req, res, next) => {
	const userId = req.params.id;
	const user = usersData.find((u) => u.id === userId);

	// Veryfy User Existance
	if (!user) {
		res.status(404).json("User Not Found");
		return;
	}

    usersData.splice(usersData.findIndex((el) => el.id === userId), 1);
	
	// Update File
	fs.writeFile(filePath, JSON.stringify(usersData), (err) => {
       	if (err) {
            res.status(500).json("Server internal Error, couldn't update the user, please try late");
            console.log(err);
            throw err;				
       	} else {
 			res.status(200).json("Successfully Updated");
       	}
    });
});


module.exports = router;
