const router = require("express").Router();

const { signUp, logIn, logOut } = require("../controllers/userController");

router.post("/signup", signUp);
router.post("/login", logIn);
router.get("/logout", logOut);

module.exports = router;
