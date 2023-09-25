const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const noticesRouter = require("./routes/api/notices");
const authRouter = require("./routes/api/auth");
const petsRouter = require("./routes/api/pets");
const newsRouter = require("./routes/api/news");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/users", authRouter);
app.use("/api/notices", noticesRouter);
app.use("/api/pets", petsRouter);
app.use("/api/news", newsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message } = err;
  res.status(status).json({ message });
});

module.exports = app;
