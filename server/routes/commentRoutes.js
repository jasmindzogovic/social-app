const router = require("express").Router();

const { protectRoute } = require("../controllers/userController");

const {
  getPostComments,
  createPostComment,
} = require("../controllers/commentController");

router.use(protectRoute);

router.route("/:postId").get(getPostComments).post(createPostComment);

module.exports = router;
