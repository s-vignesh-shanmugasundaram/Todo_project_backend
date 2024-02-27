const express = require("express");
const taskController = require("../Controller/taskController.js");

const router = express.Router();

router
  .route("/")
  .get(taskController.getAllTasks)
  .post(taskController.createTask);
// router.route("/search/:key").get(taskController.searchTask);
router.route("/filter/:status").get(taskController.filterTask);
router
  .route("/:id")
  .get(taskController.getOneTask)
  .patch(taskController.updateTask)
  .delete(taskController.deleteTask);

module.exports = router;
