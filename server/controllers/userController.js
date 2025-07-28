const {user} = require("../db/models");
const catchAsync = require("../utils/catchAsync");

const getUser = catchAsync(async (req, res, next) => {
  const body = req.body;
});

const getUsers = catchAsync(async (req, res, next) => {
  const body = req.body;
});

// const createUser = catchAsync(async (req, res, next) => {
//   const body = req.body;

//   const newUser = await user.create({
//     firstName: body.firstName,
//     lastName: body.lastName,
//     email: body.email,
//     phone: body.phone,

//   })
// });

const updateUser = catchAsync(async (req, res, next) => {
  const body = req.body;
});

const deleteUser = catchAsync(async (req, res, next) => {
  const body = req.body;
});

module.exports = {
  getUsers,
  getUser,
  // createUser,
  updateUser,
  deleteUser,
};
