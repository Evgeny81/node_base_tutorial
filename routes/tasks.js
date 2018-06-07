"use strict";

const router = require('express').Router();
const taskModel = require('../models').Mongoose.Task;
const postValidUserArguments = ["name", "title", "task_items"];
const requiredPostUserArgs = ["name"];
const putValidUserArguments = ["title", "task_items"];

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Endpoint /tasks
 */

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get Tasks
 *     description: Get All Tasks
 *     tags: [Tasks]
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Success get all tasks
 */
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

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get byId
 *     description: Get task by id
 *     tags: [Tasks]
 *     parameters:
 *       - name: id
 *         description: Task's id
 *         in: path
 *         type: string
 *         required: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Success get task
 *       400:
 *         description: Can't find task by id
 */
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

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Add Task
 *     description: Add task
 *     tags: [Tasks]
 *     parameters:
 *       - name: name
 *         description: Task's name
 *         in: formData
 *         type: string
 *         required: true
 *       - name: title
 *         description: Task's title
 *         in: formData
 *         type: string
 *         required: false
 *       - name: task_items
 *         description: task_items
 *         in: formData
 *         type: Array
 *         required: false
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Success add task
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


/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update Task
 *     description: Update task by id
 *     tags: [Tasks]
 *     parameters:
 *       - name: id
 *         description: Task's id
 *         in: path
 *         type: string
 *         required: true
 *       - name: title
 *         description: Task's title
 *         in: formData
 *         type: string
 *         required: false
 *       - name: task_items
 *         description: task_items
 *         in: formData
 *         type: Array
 *         required: false
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Success update task
 *       400:
 *         description: Can't find task by id
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

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete Task
 *     description: Delete task by id
 *     tags: [Tasks]
 *     parameters:
 *       - name: id
 *         description: Task's id
 *         in: path
 *         type: string
 *         required: true
 *     produces:
 *       - application/json
 *     responses:
 *       201:
 *         description: Task Successfuly Deleted
 *       400:
 *         description: Task Not Found
 */
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
