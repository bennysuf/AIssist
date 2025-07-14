const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const { PORT, URL } = process.env;

app.use(cors(URL + PORT));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

// app.get("")

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
