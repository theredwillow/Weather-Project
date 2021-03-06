"use strict";

searchButton.addEventListener('click', searchWeather);

var weatherData;
function searchWeather() {
    weatherBox.style.display = 'none';
    var cityName = searchCity.value;
    if (cityName.trim().length == 0) {
        return alert('Please enter a City Name');
    }
    if (typeof apiKey == 'undefined') {
        return alert("Please add your personal openweathermap API key to a file called api.js in this project's folder");
    }
    loadingText.style.display = 'block';
    var http = new XMLHttpRequest();
    var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=metric&appid=' + apiKey;
    var method = 'GET';

    http.open(method, url);
    http.onreadystatechange = function() {
        if (http.readyState == XMLHttpRequest.DONE && http.status === 200) {
            var data = JSON.parse(http.responseText);
            weatherData = new Weather(cityName, data.weather[0].description.toUpperCase());
            weatherData.temperature = data.main.temp;
        } else if (http.readyState === XMLHttpRequest.DONE) {
            alert('Something went wrong!');
        }
    };
    http.send();
}
