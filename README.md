# Step 2   (Routes)

## Let's start with already existing `users/` route.

We will add a basic __CRUD__ for `/users` Endpoint. Let's add the following __routes__ `GET /`, `GET /:id`, `PUT /:id`, `POST /`, and `DELATE /:id`


__Example__. `GET /:id`

```javascript
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
``` 

__Example__. `POST /`
```javascript
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
```

Let's also add some __mock__ data to play with. For now there is no storage so we will keep users data in json file.

 - Create a directory called `db` to _root_ path, add `users.json` file with simple test data.

 - Run the server `npm start`

 - pint the browser to `http://localhost:3000/users` and you should see the data return `GET /` route.

 - Use __postman__ (or any other tool you prefer to send http requests other then `GET`)


__Example__ let's send a `POST` with data 
``` javascript
POST /users

Body params

{
	"username": "foo@yopmail.com",
	"password": "fooSecurePass123",
	"name": "foobar",
	"description": "this is my first account created in nodeJS, Awesome!!! isn't it"
}
```


## Second, let's add two more REST endpoints `/accounts` and `tasks/`

 - Add `accounts.json` and `tasks.json` under **routes** directory

 - Now we need to tell Node to pick those two new routes. 
   To do that modify __app.js__ to add

	```javascript
	const accountsRouter = require('./routes/accounts');
	const tasksRouter = require('./routes/tasks');
	...

	app.use('/users', usersRouter);
	app.use('/accounts', accountsRouter);
	app.use('/tasks', tasksRouter);
	...
	```

 As you may already notice we use express `Route` to attach endpoints to express router.
 
 Thus, we get not only route separation into different __modules__ but also get each endpoint defined without repeating `/users` everytime. So basically for each resource module we get a nice way to keep ourselvs DRY by having -> `/:id` instead of this -> `foo_resourse/:id`


Now, let's add **CRUD** for `accounts/`, same way as `users/`. And don't forget to add _mock_ data for accounts as well :wink: .

Note, Let's live tasks empty for now. We will get back to it latter. Just keep in mind that our TODO app is going to have some todo lists.

#### Before, we move to the next step let's pay attention how messy our rotes are, We have validations, business logic as well as different custom error handlers __all__ in one routes. 

Imagine, number of resource properties increases. Thus we get more logic to deal with the data.

I am not even talking about the routes accessing different endpoint __data__. (some sort of joins, groupings, etc etc...)


### So Let's `move on` and add __mysql__ database to our application.