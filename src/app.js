const express = require('express');


const app = express();


// Middlewares
app.use(express.json());


// Routes


// Errors
app.all('*', require('./middlewares/errors/all-404')); // All unknown paths


module.exports = app;