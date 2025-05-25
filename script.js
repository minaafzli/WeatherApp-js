"use strict";
function getWeather() {
  const apiKey = "df0a0e9553dccb8386910b9cb58deba8";
  const city = document.querySelector(".input-city-name").value;
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

  fetch(forecast_url)
    .then((response) => response.json())
    .then((forecastData) => {
      displayHourlyforecast(forecastData.list);
    })
    .catch((error) => {
      console.log("Error fetching forecast data:", error);
      alert("Error fetching forecast data. Please try again.");
    });
}

function displayTime() {
  const now = new Date();
  const dayOfWeek = now.toLocaleString("en-US", { weekday: "long" });
  const month = now.toLocaleString("en-US", { month: "long" });
  const day = now.getDate();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");

  document.querySelector(".date").textContent = `${dayOfWeek}, ${month} ${day}`;
  document.querySelector(
    ".time"
  ).textContent = `${hours}:${minutes}:${seconds}`;
}

setInterval(displayTime, 1000);

function display_weather(data) {
  const name = document.querySelector(".name");
  name.textContent = `${data.name}, ${data.sys.country}`;

  const low = document.querySelector(".min-temp");
  const high = document.querySelector(".max-temp");
  const temp_max = Math.round(data.main.temp_max - 273.15);
  const temp_min = Math.round(data.main.temp_min - 273.15);
  low.textContent = `${temp_min}°C`;
  high.textContent = `${temp_max}°C`;

  const weather_icon = document.querySelector(".weather-icon");
  const temperature = document.querySelector(".Temperature-num");
  const temperature_num = Math.round(data.main.temp - 273.15);
  temperature.textContent = `${temperature_num}°`;
  const icon_code = data.weather[0].icon;
  weather_icon.src = `https://openweathermap.org/img/wn/${icon_code}@4x.png`;

  const humidity = document.querySelector(".avg-humidity");
  humidity.textContent = `${data.main.humidity}%`;

  const weather_description = document.querySelector(".weather-condition");
  weather_description.textContent = data.weather[0].description;

  const windSpeed = document.querySelector(".speed");
  windSpeed.textContent = `${data.wind.speed}`;

  const sunset_num = document.querySelector(".sunset-num");
  const sunrise_num = document.querySelector(".sunrise-num");
  const transform_time = (sun) => {
    const date = new Date(sun * 1000);
    const houre = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${houre}:${minutes}`;
  };
  sunrise_num.textContent = transform_time(data.sys.sunrise);
  sunset_num.textContent = transform_time(data.sys.sunset);
}

function displayHourlyforecast(hourlyData) {
  const hourlyforecastDiv = document.querySelector(".hourly-forecast");
  hourlyforecastDiv.innerHTML = "";
  const nex24hours = hourlyData.slice(0, 8);
  nex24hours.forEach((item) => {
    const dateTime = new Date(item.dt * 1000);
    const hour = dateTime.getHours();
    const temperature = Math.round(item.main.temp - 273.15);
    const icon_code = item.weather[0].icon;
    const weather_icon = `https://openweathermap.org/img/wn/${icon_code}@4x.png`;

    const hourly_item = document.createElement("div");
    hourly_item.classList.add("hourly-item");
    hourly_item.innerHTML = `
      <span>${hour}:00</span>
      <img src="${weather_icon}" alt="Hourly Weather Icon" class='hourly-icon'>
      <span>${temperature}°C</span>
    `;
    hourlyforecastDiv.appendChild(hourly_item);
  });
}

const btn = document.querySelector(".btn");
btn.addEventListener("click", getWeather);
document
  .querySelector(".input-city-name")
  .addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      getWeather();
    }
  });

displayTime();
