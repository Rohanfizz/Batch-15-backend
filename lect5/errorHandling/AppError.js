class AppError extends Error {
    constructor(message, statusCode) {
        super(message);

        this.statusCode = statusCode;
        this.status = statusCode === 500 ? "error" : "fail";

        Error.captureStackTrace(this, this.constructor);
    }
}
// 2XX -> Success
// 4XX -> operational errors
// 5XX -> programming error (not always)
