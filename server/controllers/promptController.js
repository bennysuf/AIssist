const { prompt, assistant } = require("../db/models");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const createPrompt = catchAsync(async (req, res, next) => {
  const body = req.body;
  const assistantId = req.params.assistantId;

  const newPrompt = await prompt.create({
    assistant_id: assistantId,
    promptType: body.promptType,
    promptText: body.promptText,
  });

  return res.status(201).json({
    status: "success",
    data: newPrompt,
  });
});

const getAllPrompts = catchAsync(async (req, res, next) => {
  const result = await prompt.findAll({
    include: [{ model: assistant, as: "assistant" }],
  });

  return res.json({
    status: "success",
    data: result,
  });
});

const getPromptById = catchAsync(async (req, res, next) => {
  const { assistantId, promptId } = req.params;

  const result = await prompt.findOne({
    where: {
      id: promptId,
      assistant_id: assistantId,
    },
    include: {
      model: assistant,
      as: "assistant",
      where: {
        user_id: req.user.id,
      },
    },
  });

  if (!result) {
    return next(new AppError("Prompt not found or access denied", 403));
  }

  return res.json({
    status: "success",
    data: result,
  });
});

const updatePrompt = catchAsync(async (req, res, next) => {
  const { assistantId, promptId } = req.params;
  const body = req.body;

  const result = await prompt.findOne({
    where: {
      id: promptId,
      assistant_id: assistantId,
    },
    include: {
      model: assistant,
      as: "assistant",
      where: {
        user_id: req.user.id,
      },
    },
  });

  if (!result) {
    return next(new AppError("Prompt not found or access denied", 403));
  }

  result.promptText = body.promptText;
  result.promptType = body.promptType;

  const updatedResult = await result.save();

  return res.json({
    status: "success",
    data: updatedResult,
  });
});

const deletePrompt = catchAsync(async (req, res, next) => {
  const { assistantId, promptId } = req.params;

  const result = await prompt.findOne({
    where: {
      id: promptId,
      assistant_id: assistantId,
    },
    include: {
      model: assistant,
      as: "assistant",
      where: {
        user_id: req.user.id,
      },
    },
  });

  if (!result) {
    return next(new AppError("Prompt not found or access denied", 403));
  }

  await result.destroy();

  return res.json({
    status: "success",
    message: "Record deleted successfully",
  });
});

module.exports = {
  createPrompt,
  getAllPrompts,
  getPromptById,
  updatePrompt,
  deletePrompt,
};
