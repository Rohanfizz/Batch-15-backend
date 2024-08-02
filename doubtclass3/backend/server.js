const express = require("express");
const mongoose = require("mongoose");
const UserRouter = require("./Routes/UserRouter");
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors())

// Middleware to parse JSON requests
app.use("/user", UserRouter);

app.listen(8080, () => {
    console.log("Server is running on port 8080");
});

mongoose
    .connect(
        "mongodb+srv://rohansharmafaculty:RjM38xUqCGAnBnmK@cluster0.lp5etuu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => {
        console.log("Connected to MongoDB");
    });
