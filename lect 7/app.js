const express = require("express");
const dotenv = require("dotenv");

const UserRouter = require("./Routes/UserRouter");
const { globalErrorHandlingController, unhandledRoutesController } = require("./errorHandling/errorHandlingControllers");
dotenv.config({ path: "./.env" });

const app = express();
app.use(express.json());
app.use("/user", UserRouter);
// Product
// orders

app.all("*", unhandledRoutesController);

// GLOBAL ERROR HANDLING MIDDLEWARE
app.use(globalErrorHandlingController);

module.exports = app;
