const { signup, login, logout } = require("../controllers/authController");

const router = require("express").Router();

router.route("/signup").post(signup);

router.route("/login").post(login)

router.route("/logout").post(logout)

module.exports = router;
