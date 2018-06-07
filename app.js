const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const config = require('@config/config');


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const accountsRouter = require('./routes/accounts');
const tasksRouter = require('./routes/tasks');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const swaggerSpec = swaggerJSDoc({
    swaggerDefinition: {
        info: {
            title: 'swagger-express-jsdoc', // Title (required)
            version: '3.0.9', // Version (required)
        },
        host: config.rest_url(), // Host (optional)
        basePath: config.rest_endpoint_base_url(), // Base path (optional)
    },
    apis: ['./routes/*'], // Path to the API docs
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/accounts', accountsRouter);
app.use('/tasks', tasksRouter);

app.get('/api-docs.json', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;