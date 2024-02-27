const task = require("../Modal/taskModel");

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith(4) ? "Faild..!" : "Error !";
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

class APIFeatures {
  constructor(query, queryString) {
    (this.query = query), (this.queryString = queryString);
  }
  filter() {
    if (this.queryString.label) {
      const sortBy = this.queryString.label.split(",");
      this.query = this.query.find({ label: { $in: sortBy } });
    }

    if (this.queryString.taskStatus) {
      const sortBy = this.queryString.taskStatus.split(",");
      this.query = this.query.find({ taskStatus: { $in: sortBy } });
    }
    return this;
  }
  search() {
    if (this.queryString.title) {
      const sortBy = this.queryString.title;

      this.query = this.query.find({
        title: {
          $regex: new RegExp(sortBy),
          $options: "i",
        },
      });
    }
    return this;
  }
}
//==========================================================================

exports.getAllTasks = async (req, res) => {
  const features = new APIFeatures(task.find(), req.query).filter().search();

  const Task = await features.query;

  res.status(200).json({ status: "Success", results: Task.length, data: Task });
};

//==========================================================================

exports.getOneTask = async (req, res, next) => {
  const Task = await task.findById(req.params.id);

  if (!Task) {
    return next(new AppError("No document found in this ID..!", 404));
  }

  res
    .status(200)
    .json({ status: "Success", message: "Data for single Task", data: Task });
};

//===========================================================================

exports.createTask = async (req, res) => {
  const newTask = await task.create(req.body);

  res.status(201).json({
    status: "Success",
    message: "Task Created successfully ",
    data: newTask,
  });
};

//=========================================================

exports.updateTask = async (req, res, next) => {
  const Task = await task.findByIdAndUpdate(req.params.id, req.body);

  if (!Task) {
    return next(new AppError("No document found in this ID..!", 404));
  }

  res.status(201).json({
    status: "Success",
    data: Task,
  });
};

//=====================================================================

exports.deleteTask = async (req, res, next) => {
  const Task = await task.findByIdAndDelete(req.params.id);

  if (!Task) {
    return next(new AppError("No document found in this ID..!", 404));
  }

  res.status(204).json({
    status: "Success",
    data: null,
  });
};

//========================================================================
// exports.searchTask = async (req, res) => {
//   try {
//     let data = await task.find({
//       title: { $regex: req.params.key },
//     });

//     console.log(req.params.key);

//     if (!data) {
//       res.status(404).json({
//         status: "Not Found",
//         message: "Search result not found",
//       });
//     }

//     res.status(201).json({
//       status: "Success",
//       data,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       status: "Error",
//       message: "Internal server error",
//     });
//   }
// };
//=====================================================================
exports.filterTask = async (req, res) => {
  try {
    const statuses = req.params.status.split(",");
    const data = await task.find({
      taskStatus: { $in: statuses }, // Using $in operator to match any of the statuses in the array
    });

    res.status(201).json({
      status: "Success",
      length: data.length,
      data,
    });
  } catch (err) {
    console.log(err);
  }
};
