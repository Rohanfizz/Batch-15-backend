const UserModel = require("../models/UserModel");

exports.getAllUsers = async function (req, res) {
    let users;
    try {
        users = await UserModel.find().select("-__v");
    } catch (err) {
        res.status(500).json({
            status: "fail",
            message: err.message,
        });
        return;
    }
    res.status(200).json({
        status: "success",
        count: users.length,
        data: users,
    });
};

exports.getUserbyId = async function (req, res) {
    const { id } = req.params;
    let user;
    try {
        user = await UserModel.findById(id);
    } catch (err) {
        res.status(500).json({
            status: "fail",
            message: err.message,
        });
        return;
    }
    res.status(200).json({
        status: "success",
        data: user,
    });
};

exports.createUser = async function (req, res) {
    const { username, email, password, role } = req.body;
    let user;
    try {
        user = await UserModel.create({
            username,
            email,
            password,
            role,
        });
    } catch (err) {
        res.status(500).json({
            status: "fail",
            message: err.message,
        });
        return;
    }

    res.status(201).json({
        status: "success",
        data: user,
    });
};

exports.updateUserById = async function (req, res) {
    const { id } = req.params;
    const { username, email, password, role } = req.body;
    let newuser;
    try {
        newuser = await UserModel.findByIdAndUpdate(
            id,
            {
                username,
                email,
                password,
                role,
            },
            {
                new: true,
            }
        );
    } catch (err) {
        next(new AppError(err.message,400))
        return;
    }
    res.status(200).json({
        status: "success",
        data: newuser,
    });
};

exports.deleteUserById = async function (req, res) {
    const { id } = req.params;
    try {
        await UserModel.findByIdAndDelete(id);
    } catch (err) {
        res.status(500).json({
            status: "fail",
            message: err.message,
        });
        return;
    }
    res.status(200).json({
        status: "success",
        data: `User with id: ${id} deleted successfully`,
    });
};

exports.authorizeUser = async function (req, res, next) {
    const passwordInHeaders = req.headers.password;
    const { id } = req.params;

    // I will search the user in DB
    const user = await UserModel.findById(id);
    // Compare the DB password with the one provided in headers
    if (user.password === passwordInHeaders) {
        // if matched, go to next middleware
        next();
    } else {
        next(new AppError(`You are not authorized to perform this operation`,401))
    }
};
