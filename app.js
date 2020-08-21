const express = require("express");

const https = require("https");

const app = express();

const bodyParser = require("body-parser");

app.use(express.json({ limit: "3mb" }));
app.use(express.static(__dirname + "/public/css"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname+"/public"));

app.get("/public", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/api", function (req, res) {
  console.log("i have a request");
  console.log(req.body);
  const loc = req.body.location;
  const lat = Math.round(req.body.lat);
  const lon = Math.round(req.body.long);
  console.log(lat);
  /**var city = req.body.cityName;
 function firstCapitalLetter(string){
  return string.charAt(0).toUpperCase() + string.slice(1);*/

  const appKey = "abcdc47ea1fd1b2ebc0184c52e2afd19";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=" +
    appKey +
    "&units=metric";
  console.log(url);
  https.get(url, function (response) {
    console.log(response.statusCode);
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);

      const temp = weatherData.main.temp;

      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      console.log(temp);

      const apiLocation = "<h1> The location is: " + loc + "</h2>";
      const apiTemperature = "<h2> The temperature is: " + temp + "</h2>";
      const apiWeather = "<h2> The weather is: " + weatherDescription + "</h2>";
      const apiImage = "<img src=" + imageUrl + ">";

      const Weather = new Object();
      Weather.location = apiLocation;
      Weather.temperature = apiTemperature;
      Weather.weather = apiWeather;
      Weather.image = apiImage;

      var myString = JSON.stringify(Weather);

      
      app.get('/api2', (req, res) => res.send(myString))
    });
  });
});

app.listen(3000, function () {
  console.log("Server is running in port 3000.");
});
