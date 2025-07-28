const {prompt} = require("../db/models");
const catchAsync = require("../utils/catchAsync");

const createPrompt = catchAsync(async (req, res, next) => {
  const body = req.body;

  const newPrompt = await prompt.create({
    assistant_id: body.assistant_id,
    promptType: body.promptType,
    promptText: body.promptText,
  });

  return res.status(201).json({
    status: "success",
    data: newPrompt,
  });
});

module.exports = { createPrompt };
