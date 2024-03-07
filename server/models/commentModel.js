const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema.Types;

const commentSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref: "User",
  },
  comment: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

commentSchema.pre(/^find/, function (next) {
  this.populate({ path: "user", select: "firstName lastName image" });
  next();
});

module.exports = mongoose.model("Comment", commentSchema);
