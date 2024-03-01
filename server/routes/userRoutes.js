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

// Authentication routes
router.post("/signup", upload.single("image"), signUp);
router.post("/login", logIn);
router.get("/logout", logOut);

// User routes
router.get("/", protectRoute, getUsers);
router
  .route("/:userID")
  .get(protectRoute, getUser)
  .patch(protectRoute, addRemoveFriends);

// Account verification upon sign up route
router.get("/:verificationString", verifyAccount);

module.exports = router;
