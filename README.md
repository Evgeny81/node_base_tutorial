## Step 7. (Middlewares)

__In this part we are going to make some improvemnets. We will get familiar with Express powerfull middlewares.__

###So what is middleware in ExpressJs
```
Middleware functions are functions that have access to the request object (req),
the response object (res), and the next middleware function in the application’s
request-response cycle.The next middleware function is commonly denoted by a variable named next.
```

__Middleware functions can perform the following tasks:__

    - Execute any code.
    - Make changes to the request and the response objects.
    - End the request-response cycle.
    - Call the next middleware function in the stack.
    
>If the current middleware function does not end the request-response cycle, it must call next() to pass control to the next middleware function. Otherwise, the request will be left hanging.


#####An Express application can use the following types of middleware:

    - Application-level middleware
    - Router-level middleware
    - Error-handling middleware
    - Built-in middleware
    - Third-party middleware


>For more info please, visit  [express middlewares](https://expressjs.com/en/guide/using-middleware.html)





####Ok It's time to dive into the code.
> NOTE, we are going to concentrate mainly on __Router-level middlewares__ in this tutorial


Let's use middlewares to move __validation__ related specific logic to shared reusable modules
 - First, create an new directory called __middleware__ under the __app__ folder
 - Second, create .js file called __account.middleware.js__ with the content
 ```javascript
"use strict";

const oneValidation = require('one-validation');
const expectedAccountArguments = ["name", "domain_name"];

module.exports = {

    /**
     * @access public
     * @param req
     * @param res
     * @param next
     * @description Check the correctness of arguments for account creation.
     * @returns {void}
     */
    validateAccountArgs(req, res, next) {
        const missingArgs = expectedAccountArguments.filter((key) => !(req.body[key] || req.body[key] === 0) );

        // Validate Expected Args Existence.
        if (missingArgs.length)
            return res.status(400).json({
                statusCode: 400,
                errorCode: 'MissingRequiredBodyParameter',
                errorMessage: `Missing args: ${missingArgs}.`
            });

        // Validate Domain Name
        if (!oneValidation['domain'].test(req.body.domain_name))
            return res.status(400).json({
                statusCode: 400,
                errorCode: 'InvalidInput',
                errorMessage: 'The `domain_name` is not valid.'
            });

        return next();
    }
};
``` 

 - Next remove validation part from the route itself and just pass an appropriate middleware as follows
  
 ```javascript
router.post('/',
    accountMiddle.validateAccountArgs,
    (req, res, next) => {
        accountsModel
            .create(req.body)
            .then((data) => {
            })
            .catch((err) => {
            });
    });
```

 - Even we can pass multiple middlewares in order. 
 
 ```javascript
 router.post('/',
     userMiddle.validatePostUserArgs,
     passwordMiddle.isValidPassword,
     (req, res, next) => {
         userModel
             .create(req.body)
             .then((user) => {
             })
             .catch((err) => {
             });
     });
```

In above example the first middleware will make sure that the args are valid then the second will validate the password.
Note that in case args are not valid then the second middleware will not be called and the request will terminated by sending an unsuccess error status to the client,
As you already may noticed our general call back function itself is a usual middleware having passed next function as it's 3 rd argument.




__To conclude__,
 We added Router-level middlewares to move validation process to separate reusable module blocks.
 Moreover, we have learn how to work with express middlewares and that the router callback function is itself a middleware.
 
 
__Next__,
We are goin to add proper Error handling as well as modify application structure a little bit