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
    // IT's a JSON with several objects
    // FIrst one is pizzas
    pizzas: [1, 2, 3],
  });
});

const port = 3000;
app.listen(port, () => {
  console.log("Listning on port", port);
});
