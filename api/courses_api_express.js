const express = require("express");
const simpleApp = express();

const courses = [
  { id: 1, name: "A" },
  { id: 2, name: "B" },
  { id: 3, name: "C" },
];

// Middleware for CROS
pizzaApp.use((req, res, next) => {
  // We want in the begnining to add the CROS message
  // Accept all connections
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-retquested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, GET, DELETE");
    res.status(200).json({});
  }
  next();
});

simpleApp.get("/", (req, res) => {
  // callback function which is route handler
  res.send("Hello world 2");
});

simpleApp.get("/api/course/:id", (req, res) => {
  console.log("In course id:", req.params.id);
  const course = courses.filter((c) => c.id === parseInt(req.params.id));
  res.send(course);
});

simpleApp.get("/simple_array", (req, res) => {
  // callback function which is route handler
  res.send([1, 2, 3]);
});

simpleApp.get("/get_all_courses", (req, res) => {
  res.status(200).json({
    // It's a JSON with several objects
    // First one is courses
    courses: [1, 2, 3],
  });
});

// Try with http://localhost:5000/api/posts/2020/1?sortyBy=Acs
simpleApp.get("/api/posts/:year/:month", (req, res) => {
  // res.send(req.params);
  // res.send(req.query);
  res.status(200).json({
    params: req.params,
    query: req.query,
  });
});

module.exports = simpleApp;
