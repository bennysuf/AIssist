const express = require("express");
const router = express.Router();

const { createNote } = require("../controllers/noteController");

router.route("/").post(createNote);

module.exports = router;
