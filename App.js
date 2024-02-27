const express = require("express");
const cors = require("cors");
const taskRouter = require("./Routers/taskRouter");
const { searchTask } = require("./Controller/taskController");
const app = express();

app.use(express.json());
// App.use(cookieParser());
app.use((req, res, next) => {
  res.header("Content-Type", "application/json");
  next();
});
app.use(cors());
app.use("/api/tasks", taskRouter);

app.use("*", (req, res) => {
  res.status(404).json({ message: "URL not found in the server" });
});

module.exports = app;
