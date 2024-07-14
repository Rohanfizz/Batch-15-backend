const {
    getAllUsers,
    getUserbyId,
    createUser,
    updateUserById,
    deleteUserById,
} = require("../controllers/userController");

const express = require("express");
const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUserbyId);
userRouter.post("/", createUser);
userRouter.patch("/:id", updateUserById);
userRouter.delete("/:id", deleteUserById);

module.exports = userRouter;
