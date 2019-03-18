"use strict";

const router = require('express').Router();
const productsModel = require('../models').Sequelize.products;
const postValidArgs = ["name", "domain_name"];
const requiredPostArgs = ["domain_name"];
const putValidArgs = ["name"];
const domainRegExp = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;

/**
 * @swagger
 * products:
 *   name: Products
 *   description: Endpoint /products
 */


/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get Products
 *     description: Get All Products
 *     tags: [Products]
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Success get all products
 */
router.get('/', (req, res, next) => {
    productsModel
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
 * /products/{domain_name}:
 *   get:
 *     summary: Get by domain name
 *     description: Get product by domain name
 *     tags: [Products]
 *     parameters:
 *       - name: domain_name
 *         description: Products's id
 *         in: path
 *         type: string
 *         required: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Success get product
 *       400:
 *         description: Can't find user by id
 */router.get('/:domain_name', (req, res, next) => {
    const productDomainName = req.params.domain_name;

    productsModel
    	.findOne({where: {domain_name: productDomainName}})
        .then((data) => {
            if (data) {
                res.status(200).json(data);
            } else {
                res.status(404).json("Product Not Found");
            }
        })
        .catch((err) => {
            res.status(500).json("Internal Server Error, Please, try later")
        });
});

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Add Product
 *     description: Add Product
 *     tags: [Products]
 *     parameters:
 *       - name: domain_name
 *         description: Products's domain name
 *         in: formData
 *         type: string
 *         required: true
 *       - name: name
 *         description: Products's name
 *         in: formData
 *         type: string
 *         required: false
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Success add product
 *       409:
 *         description: Invalid arguments
 */
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

    productsModel
        .create(args)
        .then((data) => {
            if (data) {
                res.status(201).json(data);
            } else {
                res.status(404).json("Product Not Found");
            }
        })
        .catch((err) => {
            res.status(500).json("Server internal Error, couldn't update the user, please try late");
        });
});

/**
 * @swagger
 * /products/{domain_name}:
 *   put:
 *     summary: Update Product
 *     description: Update Product by domain_name
 *     tags: [Products]
 *     parameters:
 *       - name: domain_name
 *         description: Product's domain_name
 *         in: path
 *         type: string
 *         required: true
 *       - name: name
 *         description: Product's name
 *         in: formData
 *         type: string
 *         required: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Success update product
 *       400:
 *         description: Can't find product by domain_name
 *       409:
 *         description: Invalid arguments
 */
router.put('/:id', (req, res, next) => {
	const id = req.params.id;
	const args = req.body;

    // Validate Args
    const invalidArgs = Object.keys(args).filter((key) => !putValidArgs.includes(key));

    if (invalidArgs.length) {
    	res.status(409).json(`Invalid arguments: ${invalidArgs.join(", ")}`);
    	return;
    }

    productsModel
        .update(args, { where: {id} })
        .then(([affectedCount]) => {
            if (affectedCount) {
                res.status(201).json("Product Successfuly Updated");
            } else {
                res.status(404).json("Product Not Found");
            }
        })
        .catch((err) => {
            res.status(500).json("Server internal Error, couldn't update the user, please try late");
        });
});

/**
 * @swagger
 * /products/{product_name}:
 *   delete:
 *     summary: Delete Product
 *     description: Delete product by product_name
 *     tags: [Products]
 *     parameters:
 *       - name: domain_name
 *         description: Product's domain_name
 *         in: path
 *         type: string
 *         required: true
 *     produces:
 *       - application/json
 *     responses:
 *       201:
 *         description: Product Successfuly Deleted
 *       400:
 *         description: Product Not Found
 */
router.delete("/:id", (req, res, next) => {
	const id = req.params.id;

    productsModel
        .destroy({where: {id}})
        .then((affectedCount) => {
            if (affectedCount) {
                res.status(201).json("Product Successfuly Deleted");
            } else {
                res.status(404).json("Product Not Found");
            }
        })
        .catch((err) => {
            res.status(500).json("Server internal Error, couldn't update the user, please try late");
        });
});


module.exports = router;
