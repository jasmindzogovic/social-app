const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

const { signToken } = require("../utils/jwtSignature");
const { sendVerificationEmail } = require("../utils/sendVerificationEmail");

const cookieOptions = {
  expiresIn: new Date(
    Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
  ),
  secure: true,
  httpOnly: true,
};

// Sign up functionality
exports.signUp = async (req, res, next) => {
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

    // Send verification email to user to activate account
    sendVerificationEmail(user.activationString, user.email);

    // Set the status and send the new user with the accompanying json
    res.status(201).json({ status: "success", data: { user } });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};

// Log In functionality
exports.logIn = async (req, res, next) => {
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

    // If the user exists delete the activation string, make user active
    if (user) {
      user.activationString = undefined;
      user.active = true;
      await user.save({ validateBeforeSave: false });
    }

    res
      .status(200)
      .json({ status: "success", message: "User verification complete." });
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
