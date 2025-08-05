const express = require("express");
const router = express.Router();
const {
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  getUserById,
} = require("../controllers/userController");
const { authentication } = require("../controllers/authController");

// ! dynamic route of /:id needs to be last, any req to user/* will be read as param var
// ! page reads top to bottom

router.route("/").get(authentication, getUser);

router.route("/all").get(authentication, getUsers);

router
  .route("/:userId")
  .get(authentication, getUserById)
  .put(authentication, updateUser)
  .delete(authentication, deleteUser);

module.exports = router;
