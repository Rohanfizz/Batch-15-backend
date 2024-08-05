const mongoose = require("mongoose");
const emailValidator = require("email-validator");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const UserSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    active: {
        type: Boolean,
        default: true,
    },
    firstName: {
        type: String,
        required: [true, "Please provide a valid firstName!"],
    },
    email: {
        type: String,
        required: [true, "Please provide a valid email-id!"],
        unique: true,
        lowercase: true,
        validate: {
            validator: function (v) {
                return emailValidator.validate(v);
            },
            message: "Please provide a valid email!",
        },
    },
    role: {
        type: String,
        enum: ["user", "seller", "admin"],
        default: "user",
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: 8,
        select: false,
    },
    passwordConfirm: {
        type: String,
        required: [true, "Please confirm your password"],
        select: false,
        validate: {
            validator: function (v) {
                return this.password == v;
            },
            message: "Provided passwords does not match!",
        },
    },
    passwordChangedAt: {
        type: Date,
        default: Date.now(),
        select: false,
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
});

UserSchema.pre("save", async function (next) {
    // Just before "save" operation in DB, this function will be called
    // I want to hash password only if password in modified
    if (!this.isModified("password")) return;
    // I the password is modified OR im creating a new user
    // I want to convert raw password into hashed password.
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
});

UserSchema.methods.changedPasswordAfter = function (JWTIssuedAt) {
    const timeStampInMiliSeconds = this.passwordChangedAt.getTime();
    const changedTimestamp = parseInt(timeStampInMiliSeconds / 1000, 10);
    return JWTIssuedAt < changedTimestamp;
};

UserSchema.methods.createPasswordResetToken = async function () {
    // This function does the following
    //1. generates password reset token
    //2. Stores the hashed form of this in the DB
    //3. Returns raw token in response
    const resetToken = crypto.randomBytes(32).toString("hex"); // generate token

    this.passwordResetToken = await bcrypt.hash(resetToken, 12);
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 min

    return resetToken;
};

// Instance methods
UserSchema.methods.isCorrectPassword = async function (rawPassword) {
    return bcrypt.compare(rawPassword, this.password);
};

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
