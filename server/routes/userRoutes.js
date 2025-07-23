const express = require("express");
const router = express.Router();
const {
  getUser,
  createUser,
  getUsers,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

// ! dynamic route of /:id needs to be last, any req to user/* will be read as param var
// ! page reads top to bottom

router.route("/").get(getUsers)
// .post(createUser);

router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
