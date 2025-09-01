const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  createNote,
  getNoteById,
  updateNote,
  deleteNote,
  getAllNotes,
  markAllRead,
} = require("../controllers/noteController");
const { authentication } = require("../controllers/authController");

router.route("/").post(authentication, createNote);

router.route("/load_notes").get(authentication, getAllNotes);

router.route("/mark_all_read").patch(authentication, markAllRead);

router
  .route("/:noteId")
  .get(authentication, getNoteById)
  .patch(authentication, updateNote)
  .delete(authentication, deleteNote);

module.exports = router;
