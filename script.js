"use strict;";
function getWeather() {
  const apiKey = "df0a0e9553dccb8386910b9cb58deba8";
  const city = document.querySelector(".city").value;
  if (!city) {
    alert("please Enter a city");
    return;
  }

  const current_Weather_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const forecast_url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

  fetch(current_Weather_url)
    .then((response) => response.json())
    .then((data) => {
      display_weather(data);
    })
    .catch((error) => {
      console.log("error fetching current weather data:", error);
      alert("error fetching current weather data. please try again.");
    });
}

function display_weather(data) {
  const temperature = document.querySelector(".Temperature-num");
  const weather_icon = document.querySelector(".weather-icon");
  const humidity = document.querySelector(".avg-humidity");
  const weather = document.querySelector(".weather");
  const weather_description = document.querySelector(".weather-condition");
  const max_min_temp = document.querySelector(".max-min-temp");

  const temp_max = Math.round(data.main.temp_max - 273.15);
  const temp_min = Math.round(data.main.temp_min - 273.15);
  max_min_temp.textContent = `${temp_max}/${temp_min} °C`;
  const temperature_num = Math.round(data.main.temp - 273.15);
  const icon_code = data.weather[0].icon;
  weather_icon.src = `https://openweathermap.org/img/wn/${icon_code}@4x.png`;
  weather_description.textContent = data.weather[0].description;
  const humidity_num = data.main.humidity;
  humidity.textContent = `${humidity_num}%`;
  temperature.textContent = `${temperature_num}°`;
  console.log(data);
}
