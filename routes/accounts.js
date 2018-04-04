"use strict";

const fs = require('fs');
const path = require('path');
const router = require('express').Router();
const filePath = path.join(__dirname, '../db', 'accounts.json');
let accountsData = require(filePath);

const postValidArgs = ["name", "domain_name"];
const requiredPostArgs = ["domain_name"];
const putValidArgs = ["name"];

const domainRegExp = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;


/* GET Accounts listing. */
router.get('/', (req, res, next) => {
	res.status(200).json(accountsData);
});

/* GET Account by domain name */
router.get('/:domain_name', (req, res, next) => {
	const accountDomainName = req.params.domain_name;
	const account = accountsData.find((account) => account.domain_name === accountDomainName);

	if (account) {
		res.status(200).json(account);
	} else {
		res.status(404).json("Account Not Found");
	}	
});

/* POST new Account*/
router.post('/', (req, res, next) => {
	const args = req.body;

    // Validate Args
    const invalidArgs = Object.keys(args).filter((key) => !postValidArgs.includes(key));

    if (invalidArgs.length) {
    	res.status(409).json(`Invalid arguments: ${invalidArgs.join(", ")}`);
    	return;
    }

    // Verify required args existance
    const missingRequiredArgs = requiredPostArgs.filter((key) => !args[key]);

    if (missingRequiredArgs.length) {
    	res.status(409).json(`Missing arguments: ${missingRequiredArgs.join(", ")}`);
    	return;
    }

    // Check Validity of required Args

    // Validate Domain name
    if (!domainRegExp.test(args.domain_name)) {
		res.status(409).json(`Domain Name is not valid`);
		return;
	}

	// Add Account.
	accountsData.push( Object.assign(args, {id: `${new Date().getTime()}` }) );

	// Update File
	fs.writeFile(filePath, JSON.stringify(accountsData), (err) => {
       	if (err) {
            res.status(500).json("Server internal Error, couldn't update the Account, please try Again!");
            console.log(err);
            throw err;
       	} else {
 			res.status(201).json("Successfully Created");
       	}
    });
});

/* PUT Account by domain name*/
router.put('/:id', (req, res, next) => {
	const accountId = req.params.id;
	const account = accountsData.find((account) => account.id === accountId);
	const args = req.body;

    // Validate Args
    const invalidArgs = Object.keys(args).filter((key) => !putValidArgs.includes(key));

    if (invalidArgs.length) {
    	res.status(409).json(`Invalid arguments: ${invalidArgs.join(", ")}`);
    	return;
    }

	// Veryfy Account Existance
	if (!account) {
		res.status(404).json("Account Not Found");
		return;
	}

	// Update usersData.
	accountsData.map((account) => {
		if (account.id === accountId)
			account = Object.assign(account, args);	
	
		return account;
	});

	// Update File
	fs.writeFile(filePath, JSON.stringify(accountsData), (err) => {
       	if (err) {
            res.status(500).json("Server internal Error, couldn't update the Account, please try Again!");
            console.log(err);
            throw err;
       	} else {
 			res.status(201).json("Successfully Updated");
       	}
    });
});

router.delete("/:id", (req, res, next) => {
	const accountId = req.params.id;
	const account = accountsData.find((account) => account.id === accountId);

	// Veryfy User Existance
	if (!account) {
		res.status(404).json("Account Not Found");
		return;
	}

	accountsData.splice(accountsData.findIndex((el) => el.id === accountId), 1);
	
	// Update File
	fs.writeFile(filePath, JSON.stringify(accountsData), (err) => {
       	if (err) {
            res.status(500).json("Server internal Error, couldn't update the Account, please try Again!");
            console.log(err);
            throw err;
       	} else {
 			res.status(200).json("Successfully Updated");
       	}
    });
});


module.exports = router;
