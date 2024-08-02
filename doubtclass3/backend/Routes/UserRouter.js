const express = require("express");
const { createUser } = require("../Controllers/UserController");
const UserRouter = express.Router();

UserRouter.post("/", createUser);

module.exports = UserRouter;