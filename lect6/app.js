const express = require("express");
const dotenv = require("dotenv");
const userRouter = require("./routes/userRouter");
const { sendErrProd, sendErrDev } = require("./errorHandling/utils");
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

    if (process.env.NODE_ENV === "production") {
        // logic
        sendErrProd(err, res);
    } else {
        // developer
        sendErrDev(err, res);
    }
});

module.exports = app;
