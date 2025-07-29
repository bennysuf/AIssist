const express = require("express");
const router = express.Router();

const {
  createAssistant,
  getAllAssistants,
  getAssistantById,
  updateAssistant,
  deleteAssistant,
} = require("../controllers/assistantController");
const { authentication } = require("../controllers/authController");

router
  .route("/")
  .post(authentication, createAssistant)
  .get(authentication, getAllAssistants);

router
  .route("/:id")
  .get(authentication, getAssistantById)
  .patch(authentication, updateAssistant)
  .delete(authentication, deleteAssistant);

const promptRoutes = require("./promptRoutes");
router.use("/:assistantId/prompt", promptRoutes);

const noteRoutes = require("./noteRoutes");
router.use("/:assistantId/note", noteRoutes);

module.exports = router;
