const express = require("express");
const router = express.Router();

const { createPrompt } = require("../controllers/promptController");

router.route("/").post(createPrompt);

module.exports = router;
