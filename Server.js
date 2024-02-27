const mongoose = require("mongoose");
const dotenv = require("dotenv");

const DB = "mongodb+srv://taskProject:1234567890@task.5doedsw.mongodb.net/";

mongoose.connect(DB).then(() => console.log("DB connection successful!"));

const server = require("./App.js").listen(3000, () =>
  console.log("Server is running...!")
);

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("DATABASE CONNECTION REJECTED !");
  server.close(() => process.exit(1));
});

process.on("uncatchExceptation", (err) => {
  console.log(err.name, err.message);
  console.log("DATABASE CONNECTION REJECTED... !");
  process.exit(1);
});
