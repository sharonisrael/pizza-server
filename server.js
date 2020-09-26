// Cannot use import so I'm using require with export module
//const app = require("./api/courses_api_express");
const app = require("./api/pizzas_api_express");

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
