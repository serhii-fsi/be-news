const express = require("express");
const cors = require('cors');
const Logger = require("./loggers/logger");
const AppError = require("./errors/app-error");
const ModelError = require("./models/errors/model-error");

// Set defaults
Logger.startLogging();
AppError.setLogger(Logger);
ModelError.setLogger(Logger);
ModelError.setAppError(AppError);

const app = express();
// Important as we need to have the same app ref inside routes
module.exports = app;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
require("./routes/api-v1/topics");
require("./routes/api-v1/api");
require("./routes/api-v1/articles");
require("./routes/api-v1/comments");
require("./routes/api-v1/users");

// Errors
app.use(require("./middlewares/errors/handle-app-errors"));
app.all("*", require("./middlewares/errors/handle-wrong-paths")); // All unknown paths
