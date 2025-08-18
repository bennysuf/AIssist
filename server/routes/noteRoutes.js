const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  createNote,
  getNoteById,
  updateNote,
  deleteNote,
  getAllNotes,
} = require("../controllers/noteController");
const { authentication } = require("../controllers/authController");

router.route("/").post(authentication, createNote);

router.route("/load_notes").get(authentication, getAllNotes);

router
  .route("/:id")
  .get(authentication, getNoteById)
  .patch(authentication, updateNote)
  .delete(authentication, deleteNote);

module.exports = router;
