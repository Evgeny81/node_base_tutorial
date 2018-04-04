# Installation

### Install NodeJS

- Go to https://nodejs.org 
- Download and install **LTS** version of node. EX (8.11.1 LTS)

⋅⋅⋅Note By installing NodeJS you should have "npm" installed as well.⋅⋅

Install express generator

- Open terminal and type 

> npm install -g express-generator

Generate *express* general project using _express-generator_

> express --view=ejs node_base_tutorial

Output

```sh
$ express --view=ejs node_base_tutorial

create : node_base_tutorial/
create : node_base_tutorial/public/
create : node_base_tutorial/public/javascripts/
create : node_base_tutorial/public/images/
create : node_base_tutorial/public/stylesheets/
create : node_base_tutorial/public/stylesheets/style.css
create : node_base_tutorial/routes/
create : node_base_tutorial/routes/index.js
create : node_base_tutorial/routes/users.js
create : node_base_tutorial/views/
create : node_base_tutorial/views/error.ejs
create : node_base_tutorial/views/index.ejs
create : node_base_tutorial/app.js
create : node_base_tutorial/package.json
create : node_base_tutorial/bin/
create : node_base_tutorial/bin/www

change directory:
$ cd node_base_tutorial

install dependencies:
$ npm install

run the app:
$ DEBUG=node-base-tutorial:* npm start

```	

### Result

After you install the dependencies and start the server point the browser to `http://localhost:3000/`

you should see 

```html
Express
Welcome to Express
```

