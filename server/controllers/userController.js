const User = require("../models/userModel");

const { signToken } = require("../utils/jwtSignature");

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
        "No user found with those inputs. Please check your email or password."
      );

    // After clearing all hurdles sign a new jwt token, set it to the cookies, and send it with json
    const token = signToken(user._id);

    res.cookie("jwt", token, cookieOptions);

    res.status(200).json({
      status: "success",
      token,
    });
  } catch (error) {
    res.status(400).json({ status: "failed", message: error.message });
  }
};

// Log out functionality
exports.logOut = (req, res) => {
  res.cookie("jwt", "");

  res
    .status(200)
    .json({ status: "success", message: "Successfully logged out." });
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
