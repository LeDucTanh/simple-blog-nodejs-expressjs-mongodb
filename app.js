'use strict';
require('dotenv').config();
const express = require('express');
require('./helpers/connections-mongodb');
const apiRoutes = require('./routes/api.routes');
const createError = require('http-errors');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const swaggerLocation = path.join(__dirname, 'swagger.json');
const swaggerJsDocs = require(swaggerLocation);
const verifyToken = require('./middlewares/user');

const app = express();

// Express configuration
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJsDocs));

// Routes
app.use('/api', apiRoutes);

// Middlewares
//  đoạn này show verifyToken
// app.post('/welcome', verifyToken, (req, res) => {
//     res.status(200).send('Welcome 🙌 ');
// });

app.use((req, res, next) => {
    next(createError.NotFound('This route does not exist.'));
});

app.use((err, req, res, next) => {
    res.json({
        status: err.status || 500,
        message: err.message,
    });
});

// App
const port = process.env.PORT || 3000;
app.listen(port);
console.log('Server init at port ' + port);
