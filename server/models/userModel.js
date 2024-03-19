const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const { ObjectId } = mongoose.Schema.Types;

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "A first name is required."],
    validate: [
      validator.isAlpha,
      "Please provide a name only containing characters.",
    ],
  },
  lastName: {
    type: String,
    required: [true, "A last name is required."],
    validate: [
      validator.isAlpha,
      "Please provide a last name only containing characters.",
    ],
  },
  image: {
    type: String,
    required: [true, "Please add an image."],
  },
  email: {
    type: String,
    required: [true, "An email is required to sign up for an account."],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a legitimate email address."],
  },
  password: {
    type: String,
    required: [true, "Please input your password."],
    validate: [
      validator.isStrongPassword,
      "Please make sure your password has lowercase, uppercase letters, symbols, and numbers.",
    ],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password."],
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: "Passwords must match in order to be able to open an account",
    },
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
  changedPasswordAt: Date,
  location: {
    type: String,
    required: [true, "Please input your current location."],
  },
  occupation: {
    type: String,
    validate: {
      validator: (val) => validator.isAlpha(val, ["en-US"], { ignore: " " }),
      message: "An occupation must only contain characters",
    },
  },
  friends: [
    {
      type: ObjectId,
      ref: "User",
    },
  ],
  active: {
    type: Boolean,
    default: false,
  },
  activationString: String,
});

// HASH THE PASSWORD BEFORE SAVING DOCUMENT

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  this.passwordConfirm = undefined;

  const randomNum = crypto.randomBytes(32).toString("hex");
  this.activationString = randomNum;

  next();
});

UserSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.changedPasswordAt = Date.now();
  next();
});

// POPULATE THE FRIEND WITH SELECTED FIELDS
UserSchema.pre(/^find/, function (next) {
  this.populate({
    path: "friends",
    select: "firstName lastName image location occupation",
  });

  next();
});

// SCHEMA METHOD TO COMPARE ENCRYPTED PASSWORD WITH INPUT
UserSchema.methods.correctPassword = async function (input, userPassword) {
  return await bcrypt.compare(input, userPassword);
};

// SCHEMA METHOD TO CREATE A PASSWORD RESET TOKEN
UserSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("User", UserSchema);
