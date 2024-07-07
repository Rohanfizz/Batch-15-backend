const {
    BAD_REQUEST,
    SUCCESS,
    CREATED,
    NOT_FOUND,
} = require("../utils/constants");

let userDB = [];

exports.getAllUsers = (req, res) => {
    res.status(SUCCESS).json({
        status: "success",
        count: userDB.length,
        data: userDB,
    });
};

exports.getUserById = (req, res) => {
    const id = req.params.id;

    for (let i = 0; i < userDB.length; i++) {
        if (userDB[i].username == id) {
            res.status(SUCCESS).json({
                status: "success",
                data: userDB[i],
            });
            return;
        }
    }

    res.status(NOT_FOUND).json({
        status: "failure",
        message: `User with id ${id} not found`,
    });
};

exports.createUser = (req, res) => {
    const { email, username, phone, password } = req.body;
    if (
        email == undefined ||
        password == undefined ||
        phone == undefined ||
        username == undefined
    ) {
        res.status(BAD_REQUEST).json({
            status: "failure",
            message: "Please provide correct information.",
        });
        return;
    }

    let user = {
        email,
        username,
        phone,
        password,
    };
    userDB.push(user);
    res.status(CREATED).json({
        status: "success",
        data: user,
    });
};

exports.updateUser = (req, res) => {};

exports.deleteAllUsers = (req, res) => {};

exports.deleteUserById = (req, res) => {};
