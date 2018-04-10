## Step 3 cont. (Database / MongoDb)

__In this part we are going to add __mongoDb__.__

Let's start with instalation first. As with relational, here also we are going to use an ORM tool to make our life way easier. Mongo has it's own very powerful ODM called Mongoose. So let's install it.

To install Mongoose just type.
> npm install mongoose --save

To install mongoDB you can check https://docs.mongodb.com/manual/installation/ instacrtions. Depending on your Environment instalation may be different.
In this tutorial we will go with OSX only and use homebrew to install and run MongoDB.

__INSTRUCTIONS__

> brew update
> brew install mongodb

Create the __db__ directory. This is where the Mongo data files will live. You can create the directory in the default location.
> mkdir -p /data/db

Make sure that the /data/db directory has the right permissions
> sudo chown -R \`id -un\` /data/db

Run MongoDB as a __brew__ service.

To see all service statuses managed by __brew__.
> brew services list

Start:
> brew services start mongodb

Also you can use `start`, `restart`, `stop` etc.


### Second
	let's create two new directories under `model` dir. Since we are going to have more then one database thus, it's beter to keep __models__ in separate directories.
So let's create two subdirectories under model `model/mongo/` and `model/mysql/`.
Add `wrappers/` as well as `index.js` for each subdirectory.

Define Mongoose schema for each resource `ex task`.

__ex. schema__
```javascript
...

mongoose.Schema({
    name: {type: String, required: true, unique: true},
    title: {type: String, required: false},
    task_items: [{}],
}, {strict: true});

...
```

Next we need to define a new route called `tasks.js` and implement all `CRUD` operations. 

__ex. route__
```javascript
...

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

...

```


__To conclude__,
 We integrate mongoDB database to work with our application alongside mysql database. Moreover, we add an ODM tool called Mongoose. Did structure modifications to have both mongoDB and mysql in separate subdirectories.


__Next__,
 we will integrate Swagger UI. An API documentation tool to expose our REST Full API Endpoints.