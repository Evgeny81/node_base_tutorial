"use strict";

const router = require('express').Router();
const accountsModel = require('../models').Sequelize.accounts;
const postValidArgs = ["name", "domain_name"];
const requiredPostArgs = ["domain_name"];
const putValidArgs = ["name"];
const domainRegExp = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;


/* GET Accounts listing. */
router.get('/', (req, res, next) => {
    accountsModel
        .all()
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(500).json("Internal Server Error, Please, try later")
        });
});

/* GET Account by domain name */
router.get('/:domain_name', (req, res, next) => {
    const accountDomainName = req.params.domain_name;

    accountsModel
    	.findOne({where: {domain_name: accountDomainName}})
        .then((data) => {
            if (data) {
                res.status(200).json(data);
            } else {
                res.status(404).json("Account Not Found");
            }
        })
        .catch((err) => {
            res.status(500).json("Internal Server Error, Please, try later")
        });
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

    accountsModel
        .create(args)
        .then((data) => {
            if (data) {
                res.status(201).json(data);
            } else {
                res.status(404).json("Account Not Found");
            }
        })
        .catch((err) => {
            res.status(500).json("Server internal Error, couldn't update the user, please try late");
        });
});

/* PUT Account by domain name*/
router.put('/:id', (req, res, next) => {
	const id = req.params.id;
	const args = req.body;

    // Validate Args
    const invalidArgs = Object.keys(args).filter((key) => !putValidArgs.includes(key));

    if (invalidArgs.length) {
    	res.status(409).json(`Invalid arguments: ${invalidArgs.join(", ")}`);
    	return;
    }

    accountsModel
        .update(args, { where: {id} })
        .then(([affectedCount]) => {
            if (affectedCount) {
                res.status(201).json("Account Successfuly Updated");
            } else {
                res.status(404).json("Account Not Found");
            }
        })
        .catch((err) => {
            res.status(500).json("Server internal Error, couldn't update the user, please try late");
        });
});

router.delete("/:id", (req, res, next) => {
	const id = req.params.id;

    accountsModel
        .destroy({where: {id}})
        .then((affectedCount) => {
            if (affectedCount) {
                res.status(201).json("Account Successfuly Deleted");
            } else {
                res.status(404).json("Account Not Found");
            }
        })
        .catch((err) => {
            res.status(500).json("Server internal Error, couldn't update the user, please try late");
        });
});


module.exports = router;
