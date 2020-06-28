let now = new Date();
let dateSelector = document.querySelector("#date");

let hour = now.getHours();
let minute = now.getMinutes();

let days = ["Sun", "Mon", "Tue", "Wen", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];

let date = now.getDate();

let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
];
let month = months[now.getMonth()];

let year = now.getFullYear();

dateSelector.innerHTML = `${hour}:${minute} ${day} ${date} ${month} ${year}`;

function formatHours(timestamp) {
    let date = new Date(timestamp);
    let hour = date.getHours();
    if (hour < 10) {
        hour = `0${hour}`;
    }

    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    return `${hour}:${minutes}`
}

function showTemperature(response) {
    console.log(response);
    let tempElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let description = document.querySelector("#description");
    let cloudsElement = document.querySelector("#clouds");
    let humiElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let weatherIcon = document.querySelector("#weather-icon");

    tempElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = response.data.name;
    description.innerHTML = response.data.weather[0].description;
    cloudsElement.innerHTML = response.data.clouds.all;
    humiElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = response.data.wind.speed;
    weatherIcon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)


}

function showForecast(response) {
    console.log(response);
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = null;
    let forecast = null;

    for (let index = 0; index < 6; index++) {
        let forecast = response.data.list[index];
        console.log(forecast)
        forecastElement.innerHTML +=
            `<div class="col-2">
                            <h4>${formatHours(forecast.dt * 1000)}</h4>
                            <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="weather icon" width="60" class="forecast-icon">
                            <div class="forecast-temperature">
                                <strong>${Math.round(forecast.main.temp_max)}°</strong>${Math.round(forecast.main.temp_min)}°
                            </div>
                        </div>`;
    }
}


function retrieveCity(city) {
    let apiKey = "6cc7179aae3be83895e44fc50c0ec1da";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

    axios.get(`${url}`).then(showTemperature);

    url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
    axios.get(`${url}`).then(showForecast);

}

function handleSubmit(event) {
    event.preventDefault();
    let cityInput = document.querySelector("#search-input");
    retrieveCity(cityInput.value);
}

let searchForm = document.querySelector("#form-control");
searchForm.addEventListener("submit", handleSubmit);


let currentWeatherButton = document.querySelector("#current-weather");
currentWeatherButton.addEventListener("click", showCurrentWeather);


retrieveCity("Paris");

// cities navigation weather
function showLondonWeather(event) {
    event.preventDefault()
    retrieveCity("London");
}

let linkLondon = document.querySelector("#nav-London-link");
linkLondon.addEventListener("click", showLondonWeather);


function showParisWeather(event) {
    event.preventDefault()
    retrieveCity("Paris");
}

let linkParis = document.querySelector("#nav-Paris-link");
linkParis.addEventListener("click", showParisWeather);

function showBerlinWeather(event) {
    event.preventDefault()
    retrieveCity("Berlin");
}

let linkBerlin = document.querySelector("#nav-Berlin-link");
linkBerlin.addEventListener("click", showBerlinWeather);


function showSanFranciscoWeather(event) {
    event.preventDefault()
    retrieveCity("San Francisco");
}

let linkSanFrancisco = document.querySelector("#nav-SanFrancisco-link");
linkSanFrancisco.addEventListener("click", showSanFranciscoWeather);



//local weather

function retrievePosition(position) {
    let apiKey = "6cc7179aae3be83895e44fc50c0ec1da";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    axios.get(url).then(showTemperature);
}

function showCurrentWeather(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(retrievePosition);
}










