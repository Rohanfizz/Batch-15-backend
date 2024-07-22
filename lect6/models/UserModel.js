const mongoose = require("mongoose");
const emailValidator = require("email-validator");

const UserSchema = new mongoose.Schema({
    username: {
        required: [true, "Please provide the username"],
        type: String,
    },
    password: {
        required: [true, "Please provide the password"],
        type: String,
    },
    email: {
        required: [true, "Please provide the email"],
        type: String,
        validate: {
            validator: function (v) {
                return emailValidator.validate(v);
            },
            message: "Please provide a valid email-id",
        },
    },
    role: {
        type: String,
        enum: ["user", "admin", "owner"],
        default: "user",
    },
});

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
