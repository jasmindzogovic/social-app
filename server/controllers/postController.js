const { default: mongoose } = require("mongoose");
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

exports.getUserPosts = async (req, res) => {
  try {
    const userID = req.user._id;
    const posts = await Post.find({ user: userID });

    if (posts.length === 0)
      throw new Error(
        "No posts yet by this user. Post something so that you can view posts."
      );

    res.status(200).json({ status: "success", data: { posts } });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { description, image } = req.body;

    const userID = req.user._id;

    const post = await Post.create({ description, image, user: userID });

    res.status(201).json({ status: "success", data: { post } });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};

exports.likePost = async (req, res) => {
  try {
    const { postId } = req.params;

    const userID = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res
        .status(400)
        .json({ status: "fail", message: "Invalid post ID." });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res
        .status(404)
        .json({ status: "fail", message: "Post not found." });
    }

    if (post.likedBy.includes(userID)) {
      return res
        .status(400)
        .json({ status: "fail", message: "User already likes this post." });
    }

    post.likes += 1;
    post.likedBy.push(userID);
    await post.save();

    res.status(200).json({ status: "success", data: { post } });
  } catch (error) {
    console.error("Error occurred while liking post:", error);
    res.status(500).json({ status: "fail", message: "Internal server error." });
  }
};
