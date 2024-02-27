const fs = require("fs");
const Task = require("../Modal/taskModel.js");
const mongoose = require("mongoose");
const DB = "mongodb+srv://taskProject:1234567890@task.5doedsw.mongodb.net/";
mongoose.connect(DB).then(() => console.log("DB1 connection successful!"));

// READ JSON FILE
const tasks = JSON.parse(
  fs.readFileSync(`${__dirname}/Sample-data.json`, "utf-8")
);

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Task.create(tasks);
    console.log("Data successfully loaded!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Task.deleteMany();
    console.log("Data successfully deleted!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
