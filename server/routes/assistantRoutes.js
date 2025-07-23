const express = require("express");
const router = express.Router();

const { createAssistant } = require("../controllers/assistantController");

router.route("/").post(createAssistant);

module.exports = router;
