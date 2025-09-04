const { user, assistant, prompt } = require("../db/models");
const AppError = require("../utils/appError");
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
  const userId = req.user.id;

  const { firstName, lastName, email, phone } = body;

  const result = await user.findOne({
    where: { id: userId },
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

  result.firstName = firstName;
  result.lastName = lastName;
  result.email = email;
  result.phone = phone;

  const updatedResult = await result.save();

  // return limited updated user data
  return res.json({
    status: "success",
    data: {
      id: result.id,
      firstName: updatedResult.firstName,
      lastName: updatedResult.lastName,
      email: updatedResult.email,
      phone: updatedResult.phone,
      assistants: result.assistants,
    },
  });
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
