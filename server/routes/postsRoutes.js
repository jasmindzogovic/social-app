const router = require("express").Router();

const {
  getPosts,
  createPost,
  likePost,
} = require("../controllers/postController");

const { protectRoute } = require("../controllers/userController");

const upload = require("../utils/multerUpload");

router.use(protectRoute);

router
  .route("/")
  .get(getPosts)
  .post(upload.single("image"), createPost);

router.patch("/:postId", likePost);

module.exports = router;
