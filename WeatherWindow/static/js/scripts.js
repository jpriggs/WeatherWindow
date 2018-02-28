var api = "https://fcc-weather-api.glitch.me/api/current?";
var lat;
var lon;
var currentTempUnit = 'C';
var currentCelciusTemp;

$(document).ready(function() {
  $("#load-gif").show();
  $("#temp-button").hide();
  $("#footer").hide();
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var lat = "lat=" + position.coords.latitude;
      var lon = "lon=" + position.coords.longitude;
      getWeather(lat, lon);
    });
  } else {
    var lat = "lat=" + 37.773972;
    var lon = "lon=" + -122.431297;
    getWeather(lat, lon);
  }
});

function getWeather(lat, lon) {
  var url = api + lat + "&" + lon;
  $.ajax({
    url: url,
    method: "GET",
    success: function(data) {
      $("#load-gif").hide();
      $("#city").text(data.name + ", ");
      $("#country").text(data.sys.country);
      $("#temperature").text(Math.round(data.main.temp) + " ºc");
      var weatherIconData = data.weather[0].icon;
      var weatherIcon = getIcon(weatherIconData);
      $("#weather-icon").html(weatherIcon);
      $("#temp-button").text("Change to ºF");
      $("#temp-button").show();
      $("#footer").show();
      $("#temp-button").on("click", function() {
        if ($("#temp-button").text() == "Change to ºF") {
          $("#temperature").text(getFahrenheit(data.main.temp) + " ºF");
        } else {
          $("#temperature").text(Math.round(data.main.temp) + " ºC");
        }
        changeButtonText();
      });
    }
  });
}
function getIcon(weatherType) {
  var weatherType = String(weatherType).toLowerCase();
  var htmlString = "";
  var iconTypeStr = "";
  if (weatherType == 'clouds') {
    iconTypeStr = "wi wi-cloudy";
  } else if (weatherType == 'rain') {
    iconTypeStr = "wi wi-rain";
  } else if (weatherType == 'snow') {
    iconTypeStr = "wi wi-snow";
  } else if (weatherType == 'thunderstorm') {
    iconTypeStr = "wi wi-thunderstorm";
  } else {
    iconTypeStr = "wi wi-day-sunny";
  }
  htmlString = '<i class="' + iconTypeStr + '"></i>';
  return htmlString;
}
function getFahrenheit(tempInC) {
  var currentTemp = tempInC;
  var tempInF;

  tempInF = Math.round((currentTemp * (9 / 5)) + 32);

  return tempInF;
}
function changeButtonText() {
  var currentButtonText = $("#temp-button").text();
  if (currentButtonText == "Change to ºF") {
    currentButtonText = "Change to ºC";
  } else {
    currentButtonText = "Change to ºF";
  }
  return $("#temp-button").text(currentButtonText);
}
