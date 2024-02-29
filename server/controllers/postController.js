const Post = require("../models/postModel");

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find();

    if (posts.length === 0)
      throw new Error(
        "No posts yet. Post something so that you can view posts."
      );

    res.status(200).json({ status: "success", data: { posts } });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { description } = req.body;

    const userID = req.user._id;

    if (!userID) throw new Error("Please log in order to post.");

    const post = await Post.create({ description, user: userID });

    res.status(200).json({ status: "success", data: { post } });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};

exports.likePost = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findOneAndUpdate(
      { _id: postId },
      { $inc: { likes: 1 } },
      { new: true }
    );

    res.status(200).json({ status: "success", data: { post } });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};
