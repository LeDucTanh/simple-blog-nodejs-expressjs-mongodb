'use strict';

const express = require('express');
const app = express();
require('dotenv').config()

const userRoutes = require('./routes/user.routes');

const createError = require('http-errors')
require('./helpers/connections-mongodb')
const swaggerUI = require('swagger-ui-express');

const path = require('path');
const swaggerLocation = path.join(__dirname, 'swagger.json');
const swaggerJsDocs = require(swaggerLocation);

// Express configuration
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJsDocs));

// Routes
app.use('/user', userRoutes);

// Middlewares
app.use((req, res, next) => {
    next(createError.NotFound('This route does not exist.'))
})

app.use((err, req, res, next) => {
    res.json({
        status: err.status || 500,
        message: err.message
    })
})

// App
app.listen(3000);
console.log('Server init at port ' + 3000);

module.exports = app;