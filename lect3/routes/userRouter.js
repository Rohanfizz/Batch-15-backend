const express = require("express");
const {
    getUserById,
    createUser,
    updateUserById,
    deleteUserById,
} = require("../controllers/userController");

const userRouter = express.Router();

userRouter.get("/:id", getUserById); // get user by id
userRouter.post("/", createUser); // create a new user
userRouter.patch("/:id", updateUserById); // Update a user with id
userRouter.delete("/:id", deleteUserById); // Delete user with Id

module.exports = userRouter;
