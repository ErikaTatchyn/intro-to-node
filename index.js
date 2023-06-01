const express = require("express");
const app = express();
const port = 3004;
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/calc.html");
});

app.post("/", (req, res) => {
  const num1 = Number(req.body.num1);
  const num2 = Number(req.body.num2);
  const operation = req.body.operation;
  let result;

  switch (operation) {
    case "add":
      result = num1 + num2;
      break;
    case "minus":
      result = num1 - num2;
      break;
    case "multiply":
      result = num1 * num2;
      break;
    case "divide":
      result = num1 / num2;
      break;
    default:
      result = "Invalid operation";
  }

  res.send("Result is " + result);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
