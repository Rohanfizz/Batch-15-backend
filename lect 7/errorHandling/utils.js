const AppError = require("./AppError");

exports.CatchAsync = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (err) {
            next(err); // This will always handle programatic errors / Internal server error
            return;
        }
    };
};

exports.sendErrDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        stack: err.stack,
    });
};
exports.sendErrProd = (err, res) => {
    console.log(err);
    if (err.statusCode == 500) {
        // Programatic error = we want to hid information
        res.status(err.statusCode).json({
            status: err.status,
            message: "Oh something bad happened!",
        });
        return;
    } else {
        // Operation Error => we want to show the user what bad happened
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    }
};
// Prod -> operation, programming
// Dev -> operation, programming

exports.handleJWTError = () =>
    new AppError(`Invalid Token, Please log in again`, 401);

exports.handleJWTExpiredError = () =>
    new AppError("Your token has been expired! Please log in again", 401);
