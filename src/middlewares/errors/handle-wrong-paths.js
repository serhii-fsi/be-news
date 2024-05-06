const AppError = require("../../errors/app-error");

const handleWrongPaths = (req, res, next) => {
    const appErr = new AppError({ code: 404, msg: "404 Not Found", url: req.originalUrl });
    res.status(appErr.getHttpStatusCode()).send(appErr.exportForClient());
};

module.exports = handleWrongPaths;
