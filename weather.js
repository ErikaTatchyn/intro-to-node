const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = 3005;
const https = require("https");
const cityName = req.body.city;
const apiKey = "1dfb89b10fb8cdf205b81e730f9f88d3";
const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/weather-data", function (req, res) {
  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data);

      res.write(
        `<p>The temperature in ${cityName} is: ${weatherData.main.temp}°C</p>`
      );

      res.write(
        `<h2>The weather is currently: ${weatherData.weather[0].description}</h2>`
      );

      const weatherIcon = weatherData.weather[0].icon;
      res.write(
        `<img src="http://openweathermap.org/img/w/${weatherIcon}.png" alt="Weather Icon" />`
      );

      res.send();
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
