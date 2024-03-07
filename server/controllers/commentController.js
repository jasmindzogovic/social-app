const Comment = require("../models/commentModel");
const Post = require("../models/postModel");

exports.getPostComments = async (req, res) => {
  try {
    const { postId } = req.params;
    const postComments = await Post.find({ _id: postId }).select("comments");

    if (!postComments)
      throw new Error(
        "This post does not yet have any comments. Be the first one to comment."
      );

    res.status(200).json({ status: "success", data: { postComments } });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};

exports.createPostComment = async (req, res) => {
  try {
    const { commentBody } = req.body;
    const userId = req.user._id;
    const { postId } = req.params;

    if (!commentBody) throw new Error("Please leave a comment.");

    const comment = await Comment.create({
      user: userId,
      comment: commentBody,
    });
    const post = await Post.findOneAndUpdate(
      { _id: postId },
      {
        $addToSet: { comments: comment._id },
      }
    );

    res.status(200).json({ status: "success", data: comment, post });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};
