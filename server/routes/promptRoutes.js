const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  createPrompt,
  getPromptById,
  updatePrompt,
  deletePrompt,
  getAllPrompts,
} = require("../controllers/promptController");
const { authentication } = require("../controllers/authController");

router
  .route("/")
  .post(authentication, createPrompt)
  .get(authentication, getAllPrompts);

router
  .route("/:promptId")
  .get(authentication, getPromptById)
  .patch(authentication, updatePrompt)
  .delete(authentication, deletePrompt);

module.exports = router;
