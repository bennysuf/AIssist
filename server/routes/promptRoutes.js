const express = require("express");
const router = express.Router();

const { createPrompt } = require("../controllers/promptController");
const { authentication } = require("../controllers/authController");

router.route("/").post(authentication, createPrompt);

module.exports = router;
