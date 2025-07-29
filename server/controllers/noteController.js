const { note, assistant } = require("../db/models");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const createNote = catchAsync(async (req, res, next) => {
  const body = req.body;
  const assistantId = req.params.assistantId;

  const newNote = await note.create({
    assistant_id: assistantId,
    noteName: body.noteName,
    noteText: body.noteText,
  });

  return res.status(201).json({
    status: "success",
    data: newNote,
  });
});
const getAllNotes = catchAsync(async (req, res, next) => {
  console.log("made to note req")
  const result = await note.findAll(
    // {
    // include: [{ model: assistant, as: "assistant" }],
  // }
);

  console.log("result for note", result)

  return res.json({
    status: "success",
    data: result,
  });
});

const getNoteById = catchAsync(async (req, res, next) => {
  const { assistantId, noteId } = req.params;

  const result = await note.findOne({
    where: {
      id: noteId,
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
    return next(new AppError("Note not found or access denied", 403));
  }

  return res.json({
    status: "success",
    data: result,
  });
});

const updateNote = catchAsync(async (req, res, next) => {
  const { assistantId, noteId } = req.params;
  const body = req.body;

  const result = await note.findOne({
    where: {
      id: noteId,
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
    return next(new AppError("Note not found or access denied", 403));
  }

  result.noteName = body.noteName;
  result.noteText = body.noteText;

  const updatedResult = await result.save();

  return res.json({
    status: "success",
    data: updatedResult,
  });
});

const deleteNote = catchAsync(async (req, res, next) => {
  const { assistantId, noteId } = req.params;

  const result = await note.findOne({
    where: {
      id: noteId,
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
    return next(new AppError("Note not found or access denied", 403));
  }

  await result.destroy();

  return res.json({
    status: "success",
    message: "Record deleted successfully",
  });
});

module.exports = {
  createNote,
  getAllNotes,
  getNoteById,
  updateNote,
  deleteNote,
};
