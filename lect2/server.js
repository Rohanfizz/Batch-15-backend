const express = require("express");
const userRouter = require("./routers/userRouter");

const app = express();
app.use(express.json());    // to access body in request
const port = 8080;

app.use("/user", userRouter);

const server = app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
