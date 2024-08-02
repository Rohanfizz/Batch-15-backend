const {
    sendErrProd,
    sendErrDev,
    handleJWTError,
    handleJWTExpiredError,
} = require("./utils");

exports.globalErrorHandlingController = (err, req, res, next) => {
    if (err.name === "JsonWebTokenError") err = handleJWTError();
    if (err.name === "TokenExpiredError") err = handleJWTExpiredError();

    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server error";
    err.status = err.status || "error";

    if (process.env.NODE_ENV === "production") {
        // logic
        sendErrProd(err, res);
    } else {
        // developer
        sendErrDev(err, res);
    }
};

exports.unhandledRoutesController = (req, res) => {
    res.status(404).json({
        status: "fail",
        message: `Cant find ${req.originalUrl} on this server`,
    });
};
