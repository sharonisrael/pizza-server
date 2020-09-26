const express = require("express");
const pizzaApp = express();

// Can be dev which is concise: GET /api/all_pizzas 304 2.676 ms - -
// Or combined which is elaborated: ::ffff:127.0.0.1 - - [26/Sep/2020:21:17:35 +0000] "GET /api/all_pizzas HTTP/1.1"
const morgan = require("morgan");
pizzaApp.use(morgan("dev"));

// Needed for parsing JSON from request
// It's middleware - when we call pizzaApp we use this middleware
pizzaApp.use(express.json());

const pizzaTypes = require("./pizzaTypes");

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

pizzaApp.get("/", (req, res) => {
  // callback function which is route handler
  res.send("Hello pizza");
});

pizzaApp.get("/api/all_pizzas", (req, res) => {
  res.status(200).json(pizzaTypes);
});

// Use http://localhost:5000/api/pizza/100
pizzaApp.get("/api/pizza/:id", (req, res) => {
  console.log("In pizza id:", req.params.id);
  // Can be either with find (object) or filter (array)
  // const pizza = pizzaTypes.find((p) => p.id === parseInt(req.params.id));
  // if (!pizza) {
  const pizza = pizzaTypes.filter((p) => p.id === parseInt(req.params.id));
  if (pizza.length == 0) {
    res.status(404).send(`Pizza ${req.params.id} not found`);
  } else {
    res.status(200).send(pizza);
  }
});

// This is the body in RAW JSON format
// Make sure in postman you use {..} and not [{..}]
// Good
//{"id":101,"name":"H1","image":"/images/pizza_vegetables.jpg","description":"Pizza with vegetables and special sauce","price":50}
// Bad
// [{"id":101,"name":"H1","image":"/images/pizza_vegetables.jpg","description":"Pizza with vegetables and special sauce","price":50}]
// {
//   id: 103,
//   name: 'Haim',
//   image: '/images/pizza_vegetables.jpg',
//   description: 'Pizza with vegetables and special sauce',
//   price: 50
// }
pizzaApp.post("/api/add_pizza", (req, res) => {
  const pizza = req.body;
  pizzaTypes.push(pizza);
  console.log(pizzaTypes);
  // return the pizza so client will know the id
  res.send(pizza);
});

// Make sure in postman you use {..} and not [{..}]
// Good
//{"id":101,"name":"H1","image":"/images/pizza_vegetables.jpg","description":"Pizza with vegetables and special sauce","price":50}
// Bad
// [{"id":101,"name":"H1","image":"/images/pizza_vegetables.jpg","description":"Pizza with vegetables and special sauce","price":50}]
pizzaApp.put("/api/update_pizza_name/:id", (req, res) => {
  console.log("BODY", req.body);
  let pizza = pizzaTypes.find((p) => p.id === parseInt(req.params.id));
  if (!pizza) {
    res.status(404).send(`Pizza ${req.params.id} not found`);
  } else {
    console.log(req.body.name);
    pizza.name = req.body.name;
    console.log(pizzaTypes);
    // return the pizza so client will know the id
    res.send(pizza);
  }
});

// Use http://localhost:5000/api/delete_pizza/100
pizzaApp.delete("/api/delete_pizza/:id", (req, res) => {
  console.log("In pizza id:", req.params.id);
  // const pizza = pizzaTypes.filter((p) => p.id === parseInt(req.params.id));
  // if (pizza.length == 0) {
  const pizza = pizzaTypes.find((p) => p.id === parseInt(req.params.id));
  if (!pizza) {
    res.status(404).send(`Pizza ${req.params.id} not found`);
  } else {
    pizzaIndex = pizzaTypes.indexOf(pizza);
    pizzaTypes.splice(pizzaIndex, 1);
    res.status(200).send(pizza);
  }
});

module.exports = pizzaApp;
