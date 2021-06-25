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

app.post("/addTask/:user/:name/:date/:time", async (req, res) => {
  const userUID = req.params.user;
  const taskName = req.params.name;
  const taskDate = req.params.date;
  const taskTime = req.params.time;
  const query =
    "INSERT INTO task_list (task_name, task_date, task_time, user_id) VALUES (?,?,?, (SELECT id FROM user_list WHERE user_uid = ?))";
  const values = [taskName, taskDate, taskTime, userUID];

  try {
    db.query(query, values);
    res.send("User added to database");
  } catch (error) {
    res.send(400).send("Error while trying to add task to database");
  }
});

app.get("/allTasks/:user", async (req, res) => {
  const userUID = req.params.user;
  const query =
    "SELECT * FROM task_list WHERE user_id = (SELECT id FROM user_list WHERE user_uid = ?)";

  db.query(query, userUID, (err, result) => {
    if (err) {
      console.log(">>> ERROR AT /getAllTasks");
      console.log(err);
      res.send(400).send("Error while trying to add task to database");
      return;
    }
    res.send(result);
  });
});

// catch all for on refresh
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "build", "index.html"));
});
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}!`);
});

// app.get("/jobs", async (req, res) => {
//   try {
//     let { description = "", full_time, location = "", page = 1 } = req.query;

//     description = description ? encodeURIComponent(description) : "";
//     location = location ? encodeURIComponent(location) : "";
//     full_time = full_time === "true" ? "&full_time=true" : "";
//     if (page) {
//       page = parseInt(page);
//       page = isNaN(page) ? "" : `&page=${page}`;
//     }
//     const query = `https://jobs.github.com/positions.json?description=${description}&location=${location}${full_time}${page}`;
//     const result = await axios.get(query);
//     res.send(result.data);
//   } catch (error) {
//     res.status(400).send("Error while getting list of jobs.Try again later.");
//   }
// });
