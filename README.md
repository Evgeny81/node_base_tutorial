## Step 6. (project structure - .env, configurations, aliases)

__In this part we are going to do some refactoring to change the application structure.__
__In addition we are going to define .env as well as centralized configurations for different environments.__

Let's get started by creating an new directory called __app__ under root and move the source code of the api to app

First, add __config__ folder under newly created __app__ directory.
Second, create a configuration file called __config.js__ under _config_ dir.

Now, it's time to install a small library to handle .env data.

Run
>npm install dotenv --save

This will give an ability to create a file called .env under the root directory and keep sme general environment variables

Run
> touch .env
Make sure to include it to __gitignore__ file. to exclude from the commit. It's necessary since .env is environment specific. 

Add __.env__ content.
```javascript
HOST=localhost
PORT=3000
WEB_HOST=localhost
WEB_PORT=9000
PROTOCOL=https

DB_MYSQL_DIALECT=mysql
DB_MYSQL_MULTIPLESTATEMENTS=true
DB_MYSQL_HOST=127.0.0.1
DB_MYSQL_USERNAME=root
DB_MYSQL_PASS=root
DB_MYSQL_NAME=node_base_tutorial
```


__config.js__ Examle
```javascript
const config = {
    /* DEVELOPMENT ENV */
    development: Object.assign({
        host: '127.0.0.1', // local host to run the server
        port: '9000',      // local port to run the server
        web_host: 'localhost',
        web_port: '3000',
        protocol: 'https',
        mysql: {
            dialect: 'mysql',
            multipleStatements: true,
            host: '127.0.0.1',
            user: 'root',
            password: '',
            database: 'node_base_tutorial'
        },
        mongodbUrl: "mongodb://localhost:27017/node_base_tutorial_development",
        swagger_url: '/swagger',
        api_version: 'v1',
        rest_endpoint_base_url () {
            return `/api/${this.api_version}`;
        },
        rest_url () {
            return `${this.protocol}://${this.host}:${this.port}`;
        },
        website_url () {
            return `${this.protocol}://${this.web_host}:${this.web_port}`;
        },

    }, localEnv)
...
```

####Note
Unfortunately, we can't use a new config only for all cases since, Sequelize db:<command> commands relay on config file located under root/config/config
Thus, we have to keep two config files one depending another.

###Aliases
Create aliases of directories and register custom module paths in NodeJS like a boss

So __No more shit-coding paths in Node like so__
```require('../../../../some/very/deep/module')``` 

####To Include node Aliases Run
>npm install module-alias --save

Add your custom configuration to your __package.json__ (in your application's root)
```javascript
  "_moduleAliases": {
    "@root": ".",
    "@app": "./app",
    "@config": "./app/config"
  },
````
Then add this line at the very main file of your app, before any code
include 
```javascript
require('module-alias/register')
```



__To conclude__,
 We add .env, configuration as well as aliases

__Next__,
We are goin to do farther file structure refactoring move routes, models to app directory.