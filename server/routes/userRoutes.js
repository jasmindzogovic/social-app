const router = require("express").Router();

const upload = require("../utils/multerUpload");

const {
  signUp,
  logIn,
  logOut,
  getUsers,
  verifyAccount,
} = require("../controllers/userController");

router.get("/", getUsers);
router.get("/:verificationString", verifyAccount);
router.post("/signup", upload.single("image"), signUp);
router.post("/login", logIn);
router.get("/logout", logOut);

module.exports = router;
