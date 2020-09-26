const express = require("express");
const app = express();

app.get("/", (req, res) => {
  // callback function which is route handler
  res.send("Hello world 2");
});

app.get("/simple_array", (req, res) => {
  // callback function which is route handler
  res.send([1, 2, 3]);
});

app.get("/get_all_pizzas", (req, res) => {
  res.status(200).json({
    // It's a JSON with several objects
    // First one is pizzas
    pizzas: [1, 2, 3],
  });
});

// Try with http://localhost:5000/api/posts/2020/1?sortyBy=Acs
app.get("/api/posts/:year/:month", (req, res) => {
  // res.send(req.params);
  // res.send(req.query);
  res.status(200).json({
    params: req.params,
    query: req.query,
  });
});

// You can set process environment PORT using eith
// export PORT=5000
// or in Windows set PORT=5000
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Listning on port", port);
  // To create a template literal you need to use backticks next to the 1 key and not quote or single quotes
  let browserLink = `http://localhost:${port}/`;
  console.log("Use this link in the broweser " + browserLink);
});
