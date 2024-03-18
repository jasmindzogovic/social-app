const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const User = require("../models/userModel");

const { signToken } = require("../utils/jwtSignature");
const { sendEmail } = require("../utils/sendEmail");

const cookieOptions = {
  expiresIn: new Date(
    Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
  ),
  secure: true,
  httpOnly: true,
};

// Sign up functionality
exports.signUp = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      password,
      passwordConfirm,
      image,
      email,
      location,
      occupation,
    } = req.body;

    // Create a new user with only the selected properties
    const user = await User.create({
      firstName,
      lastName,
      password,
      passwordConfirm,
      image,
      email,
      location,
      occupation,
    });

    // Set the subject and the content of the email
    const subject = "Verification email from Social App";
    const textContent = `Please click the following link to activate your account: http://127.0.0.1:8000/api/v1/users/${user.activationString}`;

    // Send verification email to user to activate account
    sendEmail(textContent, user.email, subject);

    res
      .status(201)
      .json({ status: "success", message: "Email verification sent." });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};

// Log In functionality
exports.logIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if there was an email and password input
    if (!email || !password)
      throw new Error("Please provide your email and password.");

    // Look for user in database
    const user = await User.findOne({ email }).select("+password");

    // If the user doesn't exist or the password doesn't match throw an error
    if (!user || !(await user.correctPassword(password, user.password)))
      throw new Error(
        "No user found with those credentials. Please check your email or password."
      );

    // Check if the user has activated account
    if (!user.active)
      throw new Error("Please verify account to get access to site.");

    // After clearing all hurdles sign a new jwt token, set it to the cookies, and send it with json
    const token = signToken(user._id);

    res.cookie("jwt", token, cookieOptions);

    res.status(200).json({
      status: "success",
      token,
    });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};

// Log out functionality
exports.logOut = (req, res) => {
  res.cookie("jwt", "");

  res
    .status(200)
    .json({ status: "success", message: "Successfully logged out." });
};

// Verify account
exports.verifyAccount = async (req, res) => {
  try {
    // Find user with the verification string in the params
    const user = await User.findOne({
      activationString: req.params.verificationString,
    });

    // If the user does not exist throw a new error
    if (!user)
      throw new Error(
        "That is not a valid verification code. Please check for errors."
      );

    // If the user does exist delete the activationString and set active property to true
    user.activationString = undefined;
    user.active = true;
    await user.save({ validateBeforeSave: false });

    // Send welcome email
    await sendEmail("Welcome to the Social App family.", user.email, "Welcome");

    res.status(200).json({
      status: "success",
      message: "User verification complete. You can log in now.",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "fail", message: error.message });
  }
};

// Protect Routes
exports.protectRoute = async (req, res, next) => {
  try {
    // Get token from cookies
    const token = req.cookies.jwt;

    // Check if the token exists
    if (!token) throw new Error("Please sign in to gain access.");

    // Verify token
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user still exists
    const currentUser = await User.findById(verified.payload);

    // If not throw an error
    if (!currentUser)
      throw new Error("Your session has expired. Please log in again.");

    // Otherwise send the user in the request and grant access
    req.user = currentUser;
    next();
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};

// Forgot Password
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  // Find user with the provided email
  const user = await User.findOne({ email });
  try {
    // If user doesn't exist throw error below
    if (!user)
      throw new Error("No user was found with that email. Please try again.");

    // If user exists create a passsword reset token with the user schema method
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    const resetURL = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/users/resetPassword/${resetToken}`;

    const subject = "Your password reset token (valid for only 10 minutes)!";

    await sendEmail(resetURL, user.email, subject);

    res.status(200).json({
      status: "success",
      message: "Password reset token sent to email.",
    });
  } catch (error) {
    // If there is an error delete the reset token and the expiration time
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    res.status(500).json({
      status: "fail",
      message: "There was an error sending the email. Try again later.",
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    // Get the hashed token
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    // Find the user with that particular token
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    // Throw an error if the token has expired or the user doesn't exist
    if (!user)
      throw new Error("The token has expired or the user does not exist.");

    // Save the new user password
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    res.status(200).json({
      status: "success",
      message: "Password has been successfully changed.",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "There was an error resetting the password.",
      error: error.message,
    });
  }
};

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({ status: "success", data: { users } });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};

// Get a single user
exports.getUser = async (req, res) => {
  try {
    const { userID } = req.params;

    const user = await User.findOne({ _id: userID });

    if (!user) throw new Error("No account exists with those credentials.");

    res.status(200).json({ status: "success", data: { user } });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};

// Add or remove friends
exports.addRemoveFriends = async (req, res) => {
  try {
    const { operation, friendID } = req.body;
    const { userID } = req.params;

    const user = await User.findOne({ _id: userID });

    if (operation === "add") {
      await User.findOneAndUpdate({ $addToSet: { friends: friendID } });
    } else if (operation === "remove") {
      await User.findOneAndUpdate({ $pull: { friends: friendID } });
    }

    res.status(200).json({ message: "success", data: { user } });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};
