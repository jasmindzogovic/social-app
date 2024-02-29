const router = require("express").Router();

const {
  signUp,
  logIn,
  logOut,
  getUsers,
  verifyAccount,
} = require("../controllers/userController");

router.get("/", getUsers);
router.get("/:verificationString", verifyAccount);
router.post("/signup", signUp);
router.post("/login", logIn);
router.get("/logout", logOut);

module.exports = router;
