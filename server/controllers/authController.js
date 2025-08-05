const { user, assistant } = require("../db/models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const expDays = Number(process.env.JWT_EXPIRES_IN_DAYS);

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: `${expDays}d`,
  });
};

const signup = catchAsync(async (req, res, next) => {
  const body = req.body;

  const newUser = await user.create({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    phone: body.phone,
    password: body.password,
    confirmPassword: body.confirmPassword,
  });

  if (!newUser) {
    return next(new AppError("Failed to create user", 400));
  }

  const result = newUser.toJSON();

  delete result.password;

  result.token = generateToken({
    id: result.id,
  });

  return res.status(201).json({
    status: "success",
    message: result,
  });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  const result = await user.findOne({ where: { email } });

  if (!result || !(await bcrypt.compare(password, result.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  const token = generateToken({
    id: result.id,
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // ⚠️ only true on HTTPS
    sameSite: "lax", // 'strict' or 'none' depending on use case
    maxAge: expDays * 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({
    status: "success",
    message: "User logged in successfully",
  });
});

const logout = catchAsync(async (req, res, next) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
  return res.json({ status: "success", message: "Logged out" });
});

const authentication = catchAsync(async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return next(new AppError("Please login to get access", 401));
  }

  let tokenDetail;
  try {
    tokenDetail = jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (err) {
    return next(new AppError("Invalid or expired token", 401));
  }

  const authUser = await user.findOne(
    { where: { id: tokenDetail.id } },
    { include: [{ model: assistant, as: "assistant" }] }
  );

  if (!authUser) {
    return next(new AppError("User no longer exists", 400));
  }

  req.user = authUser;
  return next();
});

module.exports = { signup, login, logout, authentication };
