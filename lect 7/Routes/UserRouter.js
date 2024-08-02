const express = require("express");
const {
    userSignupController,
    userLoginController,
    getUserDetailsController,
    authorize,
} = require("../Controllers/UserController"); 
const UserRouter = express.Router();

UserRouter.post("/signup", userSignupController);
UserRouter.post("/login", userLoginController);
UserRouter.get("/", authorize, getUserDetailsController);
module.exports = UserRouter;
