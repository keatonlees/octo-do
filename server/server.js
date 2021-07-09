const path = require("path");
const axios = require("axios");
const express = require("express");
const db = require("./models/db.js");
const { query } = require("./models/db.js");

const app = express();
const PORT = process.env.PORT || 5000;
const buildPath = path.join(__dirname, "..", "build");
app.use(express.static(buildPath));

// test api call
app.get("/test", async (req, res) => {
  try {
    res.send("It's working!");
  } catch (error) {
    res.status(400).send("Error");
  }
});

// add user to database
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

app.post("/addDefaultTimes/:uid", (req, res) => {
  const userUID = req.params.uid;
  const defaultStart = 7;
  const defaultEnd = 11;
  const query =
    "INSERT INTO index_list (start_time, end_time, user_id) VALUES (?, ?, (SELECT id FROM user_list WHERE user_uid = ?))";
  const values = [defaultStart, defaultEnd, userUID];

  db.query(query, values, (err, result) => {
    if (err) {
      console.log(">>> ERROR AT /addDefaultTimes");
      console.log(err);
      res.send(400).send("Error while trying to add default times for user");
      return;
    }
    res.send("Default times added!");
  });
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

// get daily tasks from time
app.get("/dailyTasksFromTime/:user/:time", (req, res) => {
  const userUID = req.params.user;
  const timeSlot = req.params.time;
  const query =
    "SELECT task_list.* FROM daily_list JOIN task_list ON task_list.id = daily_list.task_id WHERE daily_list.user_id = (SELECT id FROM user_list WHERE user_uid = ?) AND daily_list.time_id = (SELECT id FROM time_list WHERE time_slot = ?)";
  const values = [userUID, timeSlot];

  db.query(query, values, (err, result) => {
    if (err) {
      console.log(">>> ERROR AT /dailyTasksFromTime");
      console.log(err);
      res.send(400).send("Error while trying to get daily tasks");
      return;
    }
    res.send(result);
  });
});

app.get("/dailyTimes/:uid", (req, res) => {
  const userUID = req.params.uid;
  const query =
    "SELECT * FROM index_list WHERE user_id = (SELECT id FROM user_list WHERE user_uid = ?)";

  db.query(query, userUID, (err, result) => {
    if (err) {
      console.log(">>> ERROR AT /dailyTimes");
      console.log(err);
      res.send(400).send("Error while trying to get daily times");
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
    "INSERT INTO task_list (task_name, task_date, task_time, user_id) VALUES (?,?,?,(SELECT id FROM user_list WHERE user_uid = ?))";
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

// add to daily list
app.post("/addToDaily/:user/:id/:time", async (req, res) => {
  const userUID = req.params.user;
  const taskID = req.params.id;
  const timeSlot = req.params.time;
  const query =
    "INSERT INTO daily_list (task_id, time_id, user_id) VALUES (?, (SELECT id FROM time_list WHERE time_slot = ?), (SELECT id FROM user_list WHERE user_uid = ?))";
  const values = [taskID, timeSlot, userUID];

  db.query(query, values, (err, result) => {
    if (err) {
      console.log(">>> ERROR AT /addToDaily");
      console.log(err);
      // res.send(400).send("Error while trying to add task to daily list");
      return;
    }
    res.send("Task added to daily list");
  });
});

// delete task
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

// delete all daily tasks for user
app.delete("/resetAll/:user", async (req, res) => {
  const userUID = req.params.user;
  const query =
    "DELETE FROM daily_list WHERE user_id = (SELECT id FROM user_list WHERE user_uid = ?)";

  db.query(query, userUID, (err, result) => {
    if (err) {
      console.log(">>> ERROR AT /resetAll");
      console.log(err);
      res.send(400).send("Error while trying to reset all daily tasks");
      return;
    }
    res.send("Reset all daily tasks");
  });
});

// delete specific daily task for user
app.delete("/reset/:user/:id/:time", async (req, res) => {
  const userUID = req.params.user;
  const taskID = req.params.id;
  const timeSlot = req.params.time;
  const query =
    "DELETE FROM daily_list WHERE user_id = (SELECT id FROM user_list WHERE user_uid = ?) AND task_id = ? AND time_id = (SELECT id FROM time_list WHERE time_slot = ?)";
  const values = [userUID, taskID, timeSlot];

  db.query(query, values, (err, result) => {
    if (err) {
      console.log(">>> ERROR AT /reset");
      console.log(err);
      res.send(400).send("Error while trying to reset a daily task");
      return;
    }
    res.send("Reset daily task");
  });
});

// update task
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

app.put("/updateDailyTimes/:user/:start/:end", (req, res) => {
  const userUID = req.params.user;
  const startTime = req.params.start;
  const endTime = req.params.end;
  const query =
    "UPDATE index_list SET start_time = ?, end_time = ? WHERE user_id = (SELECT id FROM user_list WHERE user_uid = ?)";
  const values = [startTime, endTime, userUID];

  db.query(query, values, (err, result) => {
    if (err) {
      console.log(">>> ERROR AT /updateDailyTimes");
      console.log(err);
      res.send(400).send("Error while updating daily times");
      return;
    }
    res.send("Daily times updated successfully");
  });
});

// catch all
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "build", "index.html"));
});
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}!`);
});
