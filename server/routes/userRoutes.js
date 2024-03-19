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
  forgotPassword,
  resetPassword,
} = require("../controllers/userController");

// Authentication routes
router.post("/signup", upload.single("image"), signUp);
router.post("/login", logIn);
router.get("/logout", logOut);

// Account verification upon sign up route
router.get("/:activationString", verifyAccount);

// Forgot password and reset password routes
router.post("/forgotPassword", forgotPassword);
router.patch("/resetPassword/:token", resetPassword);

// User routes
router.get("/", protectRoute, getUsers);
router
  .route("/:userID")
  .get(protectRoute, getUser)
  .patch(protectRoute, addRemoveFriends);

module.exports = router;
