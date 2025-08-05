const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
require("dotenv").config();
const catchAsync = require("./utils/catchAsync");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

const app = express();
const { CLIENT_PORT, URL, SERVER_PORT } = process.env;

app.use(cookieParser());
app.use(express.json());

app.use(cors({
  origin: `${URL}${CLIENT_PORT}`,
  credentials: true,
}));

const userRoutes = require("./routes/userRoutes");
app.use("/me", userRoutes);

const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);

const assistantRoutes = require("./routes/assistantRoutes");
app.use("/assistant", assistantRoutes);

// catchall to throw error
app.use(
  catchAsync(async (req, res, next) => {
    throw new AppError(`Can't find ${req.originalUrl} on this server`, 404);
  })
);

app.use(globalErrorHandler);

app.listen(SERVER_PORT, () => {
  console.log(`Server running on port ${SERVER_PORT}`);
});
