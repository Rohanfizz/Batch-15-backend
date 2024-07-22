const {
    getAllUsers,
    getUserbyId,
    createUser,
    updateUserById,
    deleteUserById,
    authorizeUser,
} = require("../controllers/userController");

const express = require("express");
const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUserbyId);
userRouter.post("/", createUser);
userRouter.patch("/:id", authorizeUser, updateUserById);
userRouter.delete("/:id", authorizeUser, deleteUserById);

module.exports = userRouter;
