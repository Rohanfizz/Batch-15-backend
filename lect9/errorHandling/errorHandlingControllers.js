const AppError = require("./AppError");
const {
    sendErrProd,
    sendErrDev,
    handleJWTError,
    handleJWTExpiredError,
} = require("./utils");

exports.globalErrorHandlingController = (err, req, res, next) => {
    if(err.name == "JsonWebTokenError") {
        err = new AppError("Invalid Token! Please login again!", 401);
    }
    if (err.name == "TokenExpiredError"){
        err = new AppError("User session expired!", 401);
    }
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
