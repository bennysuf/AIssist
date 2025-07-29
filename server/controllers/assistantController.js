const { assistant, user } = require("../db/models/");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const createAssistant = catchAsync(async (req, res, next) => {
  const body = req.body;
  const userId = req.user.id;

  const newAssistant = await assistant.create({
    user_id: userId,
    apiKey: body.apiKey,
    role: body.role,
    companyName: body.companyName,
  });

  return res.status(201).json({
    status: "success",
    data: newAssistant,
  });
});

const getAllAssistants = catchAsync(async (req, res, next) => {
  const result = await assistant.findAll({
    include: [
      { model: user, as: "user", attributes: ["firstName", "lastName"] },
    ],
  });

  return res.json({
    status: "success",
    data: result,
  });
});

const getAssistantById = catchAsync(async (req, res, next) => {
  const assistant_id = req.params.id;
  const userId = req.user.id;

  const result = await assistant.findOne(
    { where: { id: assistant_id, user_id: userId } },
    {
      include: [
        {
          model: user,
          as: "user",
          // attributes: ["firstName", "lastName"]
        },
      ],
    }
  );

  if (!result) {
    return next(new AppError("Assistant not found or access denied", 403));
  }

  return res.json({
    status: "success",
    data: result,
  });
});

const updateAssistant = catchAsync(async (req, res, next) => {
  const body = req.body;
  const userId = req.user.id;
  const assistant_id = req.params.id;

  const result = await assistant.findOne({
    where: { id: assistant_id },
    user_id: userId,
  });

  if (!result) {
    return next(new AppError("Assistant not found or access denied", 403));
  }

  result.apiKey = body.apiKey;
  result.role = body.role;
  result.companyName = body.companyName;

  const updatedResult = await result.save();

  return res.json({
    status: "success",
    data: updatedResult,
  });
});

const deleteAssistant = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const assistant_id = req.params.id;

  const result = await assistant.findOne({
    where: { id: assistant_id },
    user_id: userId,
  });

  if (!result) {
    return next(new AppError("Assistant not found or access denied", 403));
  }

  await result.destroy();

  return res.json({
    status: "success",
    message: "Record deleted successfully",
  });
});

module.exports = {
  createAssistant,
  getAllAssistants,
  getAssistantById,
  updateAssistant,
  deleteAssistant,
};
