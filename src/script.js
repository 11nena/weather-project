//js date homework

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

console.log(date);
console.log(dateSelector);

// js api homework
function showTemperature(response) {
    let divTemperature = document.querySelector("#temperature")
    let temperature = Math.round(response.data.main.temp);

    divTemperature.innerHTML = `${temperature}`;
    console.log(response)
}

function retrievePlace(event) {
    event.preventDefault();
    let apiKey = "6cc7179aae3be83895e44fc50c0ec1da";
    let cityInput = document.querySelector("#search-input");
    let showCity = document.querySelector("#city");
    //console.log(cityInput.value);

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}`

    showCity.innerHTML = `${cityInput.value}`;

    axios.get(`${url}`).then(showTemperature);
    //console.log(url);
}

let searchForm = document.querySelector("#form-control");
searchForm.addEventListener("submit", retrievePlace);

//current weather

function showWeather(response) {
    let tempSelect = document.querySelector("#temperature");
    let currentTemperature = Math.round(response.data.main.temp);
    //console.log(currentTemperature);

    tempSelect.innerHTML = `${currentTemperature}`;

    let placeSelect = document.querySelector("#city");
    //console.log(response);
    let currentPlace = response.data.name;
    placeSelect.innerHTML = `${currentPlace}`

}

function retrievePosition(position) {
    let apiKey = "6cc7179aae3be83895e44fc50c0ec1da";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    axios.get(url).then(showWeather);
}

function showCurrentWeather(event) {
    event.preventDefault();

    navigator.geolocation.getCurrentPosition(retrievePosition);
}

let currentWeatherButton = document.querySelector("#current-weather");
currentWeatherButton.addEventListener("click", showCurrentWeather);







