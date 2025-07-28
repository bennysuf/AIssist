const {note} = require("../db/models");
const catchAsync = require("../utils/catchAsync");

const createNote = catchAsync(async (req, res, next) => {
  const body = req.body;

  const newNote = await note.create({
    assistant_id: body.assistant_id,
    noteName: body.noteName,
    noteText: body.noteText,
  });

  return res.status(201).json({
    status: "success",
    data: newNote,
  });
});

module.exports = { createNote };
