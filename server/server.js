const path = require("path");
const axios = require("axios");
const express = require("express");
const db = require("./models/db.js");

const app = express();
const PORT = process.env.PORT || 5000;
const buildPath = path.join(__dirname, "..", "build");
app.use(express.static(buildPath));

// test api call to ensure Axios/Nodejs/Express is working
app.get("/test", async (req, res) => {
  try {
    res.send("It's working!");
  } catch (error) {
    res.status(400).send("Error while getting info");
  }
});

// add user to database on sign up
app.post("/addUser/:name/:uid", async (req, res) => {
  const userName = req.params.name;
  const userUID = req.params.uid;
  const query = "INSERT INTO user_list (user_name, user_uid) VALUES (?,?)";
  const values = [userName, userUID];

  try {
    db.query(query, values);
    res.send("User added to database!");
  } catch (error) {
    res.send(400).send("Error while trying to add user to database");
  }
});

// get tasks for specific user
app.get("/allTasks/:user", async (req, res) => {
  const userUID = req.params.user;
  const query =
    "SELECT * FROM task_list WHERE user_id = (SELECT id FROM user_list WHERE user_uid = ?)";

  db.query(query, userUID, (err, result) => {
    if (err) {
      console.log(">>> ERROR AT /allTasks");
      console.log(err);
      res.send(400).send("Error while trying get all tasks from database");
      return;
    }
    res.send(result);
  });
});

// get a task from id
app.get("/task/:user/:id", (req, res) => {
  const userUID = req.params.user;
  const taskID = req.params.id;
  const query =
    "SELECT * FROM task_list WHERE user_id = (SELECT id FROM user_list WHERE user_uid = ?) AND id = ?";
  const values = [userUID, taskID];

  db.query(query, values, (err, result) => {
    if (err) {
      console.log(">>> ERROR AT /task");
      console.log(err);
      res.send(400).send("Error while trying get a task from database");
      return;
    }
    res.send(result);
  });
});

// add task
app.post("/addTask/:user/:name/:date/:time", async (req, res) => {
  const userUID = req.params.user;
  const taskName = req.params.name;
  const taskDate = req.params.date;
  const taskTime = req.params.time;
  const query =
    "INSERT INTO task_list (task_name, task_date, task_time, user_id) VALUES (?,?,?, (SELECT id FROM user_list WHERE user_uid = ?))";
  const values = [taskName, taskDate, taskTime, userUID];

  db.query(query, values, (err, result) => {
    if (err) {
      console.log(">>> ERROR AT /addTask");
      console.log(err);
      res.send(400).send("Error while trying to add task to database");
      return;
    }
    res.send("Task added to database");
  });
});

app.delete("/deleteTask/:user/:id", async (req, res) => {
  const userUID = req.params.user;
  const taskID = req.params.id;
  const query =
    "DELETE FROM task_list WHERE user_id = (SELECT id FROM user_list WHERE user_uid = ?) AND id = ?";
  const values = [userUID, taskID];

  db.query(query, values, (err, result) => {
    if (err) {
      console.log(">>> ERROR AT /deleteTask");
      console.log(err);
      res.send(400).send("Error while trying to delete task from database");
      return;
    }
    res.send("Task deleted successfully");
  });
});

app.put("/updateTask/:user/:id/:name/:date/:time", async (req, res) => {
  const userUID = req.params.user;
  const taskID = req.params.id;
  const taskName = req.params.name;
  const taskDate = req.params.date;
  const taskTime = req.params.time;
  const query =
    "UPDATE task_list SET task_name = ?, task_date = ?, task_time = ? WHERE user_id = (SELECT id FROM user_list WHERE user_uid = ?) AND id = ?";
  const values = [taskName, taskDate, taskTime, userUID, taskID];

  db.query(query, values, (err, result) => {
    if (err) {
      console.log(">>> ERROR AT /updateTask");
      console.log(err);
      res.send(400).send("Error while trying to update task");
      return;
    }
    res.send("Task updated successfully!");
  });
});

// catch all for on refresh
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "build", "index.html"));
});
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}!`);
});
