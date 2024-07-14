const mongoose = require("mongoose");
var validator = require("email-validator");

const userSchema = new mongoose.Schema({
    username: {
        required: [true, "Please provide a username"],
        type: String,
        unique: true,
    },
    password: {
        required: [true, "Please provide a password"],
        type: String,
    },
    email: {
        type: String,
        required: [true, "Please provide your email"],
        validate: {
            validator: function (v) {
                return validator.validate(v);
            },
            message: "Please provide a valid email!",
        },
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel