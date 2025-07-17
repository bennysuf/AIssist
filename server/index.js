const express = require("express");
const cors = require("cors");
require("dotenv").config();
const catchAsync = require("./utils/catchAsync");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

const app = express();
const { PORT, URL } = process.env;

app.use(cors(URL + PORT));
app.use(express.json());

const userRoutes = require("./routes/userRoutes");
app.use("/users", userRoutes);

const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);

// catchall to throw error
app.use(
  catchAsync(async (req, res, next) => {
    throw new AppError(`Can't find ${req.originalUrl} on this server`, 404);
  })
);

app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
