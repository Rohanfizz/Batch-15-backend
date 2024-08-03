const express = require("express");
const {
    userSignupController,
    userLoginController,
    getUserDetailsController,
    authorize,
} = require("../Controllers/UserController");
const UserRouter = express.Router();
UserRouter.get("/profilePage", (req, res) => {
    res.type("text/html");
    res.send(`<h1>Welcome to the home page!</h1><h2>This is profile of Rohan</h2>`);
});
UserRouter.post("/signup", userSignupController);
UserRouter.post("/login", userLoginController);
UserRouter.get("/", authorize, getUserDetailsController);
module.exports = UserRouter;
