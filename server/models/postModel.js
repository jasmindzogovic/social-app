const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const postsSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref: "User",
  },
  description: {
    type: String,
    required: [true, "A post needs a text input."],
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: {
    type: [String],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// POPULATE THE POSTING USER WITH THE SELECTED FIELDS

postsSchema.pre(/^find/, function (next) {
  this.populate({ path: "user", select: "firstName lastName image" });
  next();
});

module.exports = mongoose.model("Posts", postsSchema);
