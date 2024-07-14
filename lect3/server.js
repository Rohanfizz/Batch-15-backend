const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const mongoose = require("mongoose");
const userRouter = require("./routes/userRouter");
const app = express();
app.use(express.json());

const port = 8080;

app.use("/user", userRouter);

const server = app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});

const DB_URL = process.env.DB_URL.replace(
    "<password>",
    process.env.DB_PASSWORD
);

const DB = mongoose.connect(DB_URL).then(() => {
    console.log("Connected to Database ❤");
});
