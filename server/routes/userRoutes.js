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
} = require("../controllers/userController");

router.get("/", protectRoute, getUsers);
router.get("/:userID", protectRoute, getUser);
router.post("/signup", upload.single("image"), signUp);
router.get("/:verificationString", verifyAccount);
router.post("/login", logIn);
router.get("/logout", logOut);

module.exports = router;
