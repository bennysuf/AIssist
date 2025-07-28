const express = require("express");
const router = express.Router();

const { createNote } = require("../controllers/noteController");
const { authentication } = require("../controllers/authController");

router.route("/").post(authentication, createNote);

module.exports = router;
