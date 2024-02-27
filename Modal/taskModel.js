const { mongoose } = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Must be Provided Title..!)"],
  },

  description: {
    type: String,
    trim: true,
    required: [true, "A Task must have a description !"],
  },

  due_date: { type: Date },
  label: {
    type: String,
    trim: true,
    default: "Label",
  },

  taskStatus: {
    type: String,
    enum: ["open", "inprogress", "completed"],
    default: "open",
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
