const { user, assistant, prompt } = require("../db/models");
const catchAsync = require("../utils/catchAsync");

const getUser = catchAsync(async (req, res, next) => {
  const result = await user.findOne({
    where: { id: req.user.id },
    attributes: { exclude: ["password"] },
    include: [
      {
        model: assistant,
        as: "assistants",
        attributes: { exclude: ["createdAt", "updatedAt", "user_id"] },
        include: [
          {
            model: prompt,
            as: "prompts",
            attributes: { exclude: ["createdAt", "updatedAt", "assistant_id"] },
          },
        ],
      },
    ],
  });

  if (!result) {
    return next(new AppError("User not found or access denied", 403));
  }

  return res.json({
    status: "success",
    data: result,
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
    return next(new AppError("User not found or access denied", 403));
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
