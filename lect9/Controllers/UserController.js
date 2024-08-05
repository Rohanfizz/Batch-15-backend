const AppError = require("../errorHandling/AppError");
const { CatchAsync } = require("../errorHandling/utils");
const UserModel = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
const util = require("util");
const sendMail = require("../utils/emailUtility");
const bcrypt = require("bcrypt");

function signJWT(userId) {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "90d",
    });
}

exports.authorize = CatchAsync(async function (req, res, next) {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
        return next(new AppError("You are not logged in!", 401));
    }
    const decoded = await util.promisify(jwt.verify)(
        token,
        process.env.JWT_SECRET
    );
    // User might have changed their password after this token was issued.
    // We validating if the token was issued after password was changed-
    const currentUser = await UserModel.findById(decoded.id).select(
        "+passwordChangedAt"
    );
    if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next(
            new AppError("Password has been changed. Please login again!", 401)
        );
    }
    req.userId = decoded.id;
    next();
});

exports.userSignupController = CatchAsync(async function (req, res, next) {
    const { firstName, email, password, passwordConfirm, role } = req.body;
    const user = await UserModel.create({
        firstName,
        email,
        password,
        passwordConfirm,
        role,
    });
    const token = signJWT(user._id);
    res.status(201).json({
        status: "success",
        token,
    });
});

exports.userLoginController = CatchAsync(async function (req, res, next) {
    // 1: Extract email and password from the request
    const { email, password } = req.body;
    if (!email || !password) {
        next(new AppError("Please provide email and password!", 400));
        return;
    }
    // 2: Verify if an account exist with that email
    const user = await UserModel.findOne({ email }).select("+password"); // + means: Provide password as well along with other information, - means: Other than password, give everything, no + or - means: only password
    // 3: Check if the raw password provided is correct or not
    if (!user || !(await user.isCorrectPassword(password))) {
        next(new AppError("Invalid email or password!", 401));
        return;
    }
    // 4: Generate a JWT token for the client
    const token = signJWT(user._id);
    // 5: Respond
    res.status(201).json({
        status: "success",
        token,
    });
});

exports.getUserDetailsController = CatchAsync(async function (req, res, next) {
    const { userId } = req;
    const user = await UserModel.findById(userId);
    if (!user) {
        return next(new AppError("User not found!", 404));
    }
    res.status(201).json({
        status: "success",
        user,
    });
});

exports.forgotPasswordController = CatchAsync(async function (req, res, next) {
    const { email } = req.body;
    if (!email) {
        return next(AppError("Please provide your email!", 400));
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
        return next(new AppError("Please check your email!", 404));
    }
    const resetToken = await user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false }); // This is required if you use "=" to update values.

    const emailOptions = {
        email: email,
        subject: `Your Password Reset Token!`,
        message: `Please find below your password reset token\n${resetToken}\nThanks for using our application!!`,
    };
    await sendMail(emailOptions);
    res.status(200).json({
        status: "success",
        message:
            "Please check your inbox, we have sent an email with your reset token!",
    });
});

exports.updatePasswordController = CatchAsync(async function (req, res, next) {
    const { email, password, token } = req.body;
    // Step 1: Verify the token
    const user = await UserModel.findOne({ email });
    if (!user) {
        return next(new AppError("There is no user with email address.", 404));
    }
    // Step 1.1: has the token expired?
    if (Date.now() > user.passwordResetExpires) {
        return next(
            new AppError(
                "Your token has expired! Please generate a new one!",
                400
            )
        );
    }
    // Step 1.2: Hash token provided by user and then compare with the one in DB
    if (!(await bcrypt.compare(token, user.passwordResetToken))) {
        return next(new AppError("Invalid token!", 401));
    }
    // Step 2: Update the password
    user.password = password;
    // Step 3: Reset the passwordResetToken in Db. Why? SO that passwordResetToken is only used 1 time by user
    user.passwordResetToken = "";
    await user.save();
    // Step 4: Generate a JWT token for the client
    const JWTtoken = signJWT(user._id);
    // 5: Respond
    res.status(201).json({
        status: "success",
        JWTtoken,
    });
});
