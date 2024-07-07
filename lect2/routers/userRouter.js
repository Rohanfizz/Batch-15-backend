const express = require("express");
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteAllUsers,
    deleteUserById,
} = require("../controllers/userController");
const userRouter = express.Router();

userRouter.get("/", getAllUsers); // get all users
userRouter.get("/:id", getUserById); // get user by id 
userRouter.post("/", createUser);
userRouter.patch("/:id", updateUser);
userRouter.delete("/", deleteAllUsers);
userRouter.delete("/:id", deleteUserById);
 
module.exports = userRouter;
