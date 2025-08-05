const { user, assistant } = require("../db/models");
const catchAsync = require("../utils/catchAsync");

const getUser = catchAsync(async (req, res, next) => {
  const { firstName, lastName, email, phone, id } = req.user;
  return res.json({
    status: "success",
    data: { firstName, lastName, email, phone, id },
  });
});

const getUsers = catchAsync(async (req, res, next) => {
  const result = await user.findAll({
    include: [{ model: assistant, as: "assistants" }],
  });

  return res.json({
    status: "success",
    data: result,
  });
});

const getUserById = catchAsync(async (req, res, next) => {
  const result = await user.findOne({
    where: { id: req.params.userId },
    include: [{ model: assistant, as: "assistants" }],
  });

  if (!result) {
    return next(new AppError("Assistant not found or access denied", 403));
  }

  return res.json({
    status: "success",
    data: result,
  });
});

const updateUser = catchAsync(async (req, res, next) => {
  const body = req.body;
});

const deleteUser = catchAsync(async (req, res, next) => {
  const body = req.body;
});

module.exports = {
  getUsers,
  getUser,
  getUserById,
  updateUser,
  deleteUser,
};
