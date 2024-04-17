const express = require('express');
const Logger = require('./loggers/logger');
const AppError = require('./errors/app-error');
const ModelError = require('./models/errors/model-error');


// Set defaults
AppError.setLogger(Logger);
ModelError.setLogger(Logger);
ModelError.setAppError(AppError);
const myLogger = new Logger();


const app = express();
module.exports = app; // Important as we need to have the same app ref


// Middlewares
app.use(express.json());


// Routes
require('./routes/api-v1/topics');
require('./routes/api-v1/api');
require('./routes/api-v1/articles');


// Errors
app.use(require('./middlewares/errors/handle-app-errors'));
app.all('*', require('./middlewares/errors/handle-wrong-paths')); // All unknown paths
