const { Op } = require("sequelize");
const { note, assistant } = require("../db/models");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const createNote = catchAsync(async (req, res, next) => {
  const body = req.body;

  const newNote = await note.create({
    assistant_id: body.assistantId,
    callerName: body.callerName,
    noteText: body.noteText,
    noteSummery: body.noteSummery,
    markedRead: body.markedRead,
  });

  return res.status(201).json({
    status: "success",
    data: newNote,
  });
});

const getAllNotes = catchAsync(async (req, res, next) => {
  const { filter, limit, noteId, createdAt, assistantId } = req.query;

  const where = {
    assistant_id: assistantId,
  };

  // Filter by read/unread
  if (filter === "read") {
    where.markedRead = true;
  } else if (filter === "unread") {
    where.markedRead = false;
  }

  // Pagination filter
  if (createdAt && noteId) {
    where[Op.or] = [
      {
        createdAt: { [Op.lt]: createdAt },
      },
      {
        //if 2 notes are created at the same time, order by id
        createdAt: createdAt,
        id: { [Op.lt]: noteId },
      },
    ];
  }

  const result = await note.findAll({
    where,
    order: [
      ["createdAt", "DESC"],
      ["id", "DESC"], // tie-breaker
    ],
    limit: parseInt(limit, 10),
    // include: [{ model: assistant, as: "assistant" }],
  });

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
