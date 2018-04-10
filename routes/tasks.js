"use strict";

const router = require('express').Router();
const taskModel = require('../models').Mongoose.Task;
const postValidUserArguments = ["name", "title", "task_items"];
const requiredPostUserArgs = ["name"];
const putValidUserArguments = ["title", "task_items"];

router.get('/', (req, res, next) => {
    taskModel
        .find({})
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(500).json("Internal Server Error, Please, try later")
        });
});

router.get('/:id', (req, res, next) => {
    const id = req.params.id;

    taskModel
        .findById(id)
        .then((data) => {
            if (data) {
                res.status(200).json(data);
            } else {
                res.status(404).json("Task Not Found");
            }
        })
        .catch((err) => {
            res.status(500).json("Internal Server Error, Please, try later")
        });
});

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

    taskModel
        .create(args)
        .then((user) => {
            res.status(201).json(user);
        })
        .catch((err) => {
            if (err.code === 11000) {
                res.status(409).json("Name Already Exist");
                return;
            }

            res.status(500).json("Server internal Error, couldn't update the user, please try late");
        });
});


/* PUT Task by id*/
router.put('/:id', (req, res, next) => {
    const id = req.params.id;
    const args = req.body;

    // Validate Args
    const invalidArguments = Object.keys(args).filter((key) => !putValidUserArguments.includes(key));

    if (invalidArguments.length) {
        res.status(409).json(`Invalid arguments: ${invalidArguments.join(", ")}`);
        return;
    }
    
    taskModel
        .findByIdAndRemove(
            {_id: id},
            {$set: args},
            {new: true})
        .then(() => {
            res.status(201).json("Task Successfuly Updated");
        })
        .catch((err) => {
            res.status(500).json("Server internal Error, couldn't update the task, please try late");
        });
});

router.delete("/:id", (req, res, next) => {
    const id = req.params.id;

    taskModel
        .findByIdAndRemove(id)
        .then((affectedCount) => {
            res.status(201).json("Task Successfuly Deleted");

        })
        .catch((err) => {
            res.status(500).json("Server internal Error, couldn't update the task, please try late");
        });
});

module.exports = router;
