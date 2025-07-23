const assistant = require("../db/models/assistant");
const catchAsync = require("../utils/catchAsync");

const createAssistant = catchAsync(async (req, res, next) => {
  const body = req.body;

  const newAssistant = await assistant.create({
    user_id: body.user_id,
    apiKey: body.assistantType,
    role: body.role,
    companyName: body.companyName,
  });

  return res.status(201).json({
    status: "success",
    data: newAssistant,
  });
});

module.exports = { createAssistant };
