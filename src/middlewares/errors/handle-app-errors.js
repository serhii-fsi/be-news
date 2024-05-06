const { error } = require("console");
const AppError = require("../../errors/app-error");
const Logger = require("../../loggers/logger");

const handleAppErrors = (appErr, req, res, next) => {
    if (appErr instanceof AppError) {
        res.status(appErr.getHttpStatusCode()).send(appErr.exportForClient());
    } else {
        // Every error must be instanceof AppError
        Logger.log("Critical Error!");
        Logger.log(appErr);
        res.status(500).send({ error: { code: 500, msg: "Critical Error!" } });
    }
};

module.exports = handleAppErrors;
