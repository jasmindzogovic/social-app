const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref: "User",
  },
  image: String,
  description: {
    type: String,
    required: [true, "A post needs a text input."],
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: [{ type: ObjectId, ref: "Comment" }],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// POPULATE THE POSTING USER WITH THE SELECTED FIELDS

postSchema.pre(/^find/, function (next) {
  this.populate({ path: "user", select: "firstName lastName image" });
  this.populate({ path: "comments", select: "user comment createdAt" });
  next();
});

module.exports = mongoose.model("Post", postSchema);
