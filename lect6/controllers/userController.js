const AppError = require("../errorHandling/AppError");
const { CatchAsync } = require("../errorHandling/utils");
const UserModel = require("../models/UserModel");

exports.getAllUsers = CatchAsync(async function (req, res, next) {
    let users;
    users = await UserModel.find().select("-__v");
    res.status(200).json({
        status: "success",
        count: users.length,
        data: users,
    });
});

exports.getUserbyId = CatchAsync(async function (req, res, next) {
    const { id } = req.params;
    let user;
    user = await UserModel.findById(id);
    if (!user) {
        next(new AppError(`User Id ${id} not found!`, 404));    // These cases will handle operation errors /  404, 4XX
        return;
    }
    res.status(200).json({
        status: "success",
        data: user,
    });
});

exports.createUser = CatchAsync(async function (req, res, next) {
    const { username, email, password, role } = req.body.XYZ;// bad code
    let user;
    user = await UserModel.create({
        username,
        email,
        password,
        role,
    });

    res.status(201).json({
        status: "success",
        data: user,
    });
});

exports.updateUserById = CatchAsync(async function (req, res) {
    const { id } = req.params;
    const { username, email, password, role } = req.body;
    let newuser;
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
    res.status(200).json({
        status: "success",
        data: newuser,
    });
});

exports.deleteUserById = CatchAsync(async function (req, res) {
    const { id } = req.params;
    await UserModel.findByIdAndDelete(id);
    res.status(200).json({
        status: "success",
        data: `User with id: ${id} deleted successfully`,
    });
});

exports.authorizeUser = CatchAsync(async function (req, res, next) {
    const passwordInHeaders = req.headers.password;
    const { id } = req.params;

    // I will search the user in DB
    const user = await UserModel.findById(id);
    // Compare the DB password with the one provided in headers
    if (user.password === passwordInHeaders) {
        // if matched, go to next middleware
        next();
    } else {
        next(
            new AppError(
                `You are not authorized to perform this operation`,
                401
            )
        );
    }
});
