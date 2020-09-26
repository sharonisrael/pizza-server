const express = require("express");
const pizzaApp = express();

// Needed for parsing JSON from request
// It's middleware - when we call pizzaApp we use this middleware
pizzaApp.use(express.json());

const pizzaTypes = require("./pizzaTypes");

pizzaApp.get("/", (req, res) => {
  // callback function which is route handler
  res.send("Hello pizza");
});

// Use http://localhost:5000/api/pizza/100
pizzaApp.get("/api/pizza/:id", (req, res) => {
  console.log("In pizza id:", req.params.id);
  const pizza = pizzaTypes.filter((p) => p.id === parseInt(req.params.id));
  if (pizza.length == 0) {
    res.status(404).send(`Pizza ${req.params.id} not found`);
  } else {
    res.status(200).send(pizza);
  }
});

pizzaApp.get("/api/all_pizzas", (req, res) => {
  res.status(200).json(pizzaTypes);
});

// This is the body in RAW JSON format
// {
//   id: 103,
//   name: 'Haim',
//   image: '/images/pizza_vegetables.jpg',
//   description: 'Pizza with vegetables and special sauce',
//   price: 50
// }
pizzaApp.post("/api/add_pizza", (req, res) => {
  console.log(req.body);
  const pizza = req.body;
  pizzaTypes.push(pizza);
  // return the pizza so client will know the id
  res.send(pizza);
});

module.exports = pizzaApp;
