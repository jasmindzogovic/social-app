const router = require("express").Router();

const upload = require("../utils/multerUpload");

const {
  signUp,
  logIn,
  logOut,
  getUsers,
  verifyAccount,
  protectRoute,
  getUser,
  addRemoveFriends,
} = require("../controllers/userController");

// User routes
router.get("/", protectRoute, getUsers);
router
  .route("/:userID")
  .get(protectRoute, getUser)
  .patch(protectRoute, addRemoveFriends);

// Authentication routes
router.post("/signup", upload.single("image"), signUp);
router.get("/:verificationString", verifyAccount);
router.post("/login", logIn);
router.get("/logout", logOut);

module.exports = router;
