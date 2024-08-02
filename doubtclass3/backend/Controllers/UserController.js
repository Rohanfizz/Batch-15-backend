const UserModel = require("../Models/UserModel");

exports.createUser = async function (req, res, next) {
    try {
        const { name, email, password, phone } = req.body;
        await UserModel.create({ name, email, password, phone });
        res.status(201).send({
            message: "User created successfully",
        });
    } catch (err) {
        res.status(500).send({
            message: err.message,
        });
    }
};
