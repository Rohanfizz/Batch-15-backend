const express = require("express");
const dotenv = require("dotenv");
const userRouter = require("./routes/userRouter");
dotenv.config({ path: "./.env" });

const app = express();
app.use(express.json());
app.use("/user", userRouter);
// Product
// orders

app.all("*", (req, res) => {
    res.status(404).json({
        status: "fail",
        message: `Cant find ${req.originalUrl} on this server`,
    });
});

// GLOBAL ERROR HANDLING MIDDLEWARE
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server error";
    err.status = err.status || "error";

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
    return;
});

module.exports = app;
