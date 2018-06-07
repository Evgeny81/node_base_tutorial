## Step 4. (Swagger - Documentation for REST API)

__In this part we are going to integrate__ __**Swagger**.__
 
 - `Swagger is an open source software framework backed by a large ecosystem of tools that helps developers design, build, document, and consume RESTful Web services.`

###Let's start with the instalation first. 

To install Swagger just type.
> npm install swagger-ui-express --save

We are going to use swager jsdoc to make inline docs within our routes
To install __swagger-jsdoc__ type
> npm install swagger-jsdoc --save




### Second
Let's edit our __app.js__ file to include. 
	
```javascript
...

const swaggerSpec = swaggerJSDoc({
    swaggerDefinition: {
        info: {
            title: 'swagger-express-jsdoc', // Title (required)
            version: '2.0.0', // Version (required)
        },
    },
    apis: ['./routes/*'], // Path to the API docs
});

...

app.get('/api-docs.json', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

```

### Finally let's use swagger jsdoc to define our API

Let's now choose one of our existing routes __users__ and add swagger description to it 

__/users__ route
```javascript
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoint /users
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get Users
 *     description: Get All Users
 *     tags: [Users]
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Success get all users
 */

etc...

```


__To conclude__,
 We integrate Swagger to expose our REST Full API Endpoints.


__Next__,
 we will add gulp. To add simple tasks runner to automate basic features