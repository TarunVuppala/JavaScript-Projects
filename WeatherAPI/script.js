const URL = "https://api.openweathermap.org/data/2.5/weather?q=";
const apiID = "0093bcf8f4247287e097df0bd7bb3e7e";
const cityInput = document.querySelector("#cityInput");
const searchBtn = document.getElementsByClassName("search-btn")[0];
let data;

const getWindDirection = (degrees) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
};

const toCelcius = (temp) => {
    return Math.round(temp - 273.15); // Convert temperature to Celsius
};

const updateWeatherDetails = (data) => {
    document.getElementById("cityInfo").textContent = `${data.name}, ${data.sys.country}`;

    document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    document.getElementById("weatherIcon").alt = data.weather[0].description;

    const currentDate = new Date(data.dt * 1000);
    document.querySelector('.date .day').textContent = currentDate.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    document.querySelector('.date .time').textContent = currentDate.toLocaleTimeString();

    document.getElementById("currentTemp").textContent = `${toCelcius(data.main.temp_max)}°C`; // Displaying max temperature in Celsius
    document.getElementById("feelsLikeTemp").textContent = `${toCelcius(data.main.feels_like)}°C`;
    document.getElementById("maxTemp").textContent = `${toCelcius(data.main.temp_max)}°C`;

    document.getElementById("windSpeed").textContent = `${data.wind.speed} m/s`;
    document.getElementById("windDirection").textContent = getWindDirection(data.wind.deg);
    document.getElementById("windAngle").textContent = `${data.wind.deg}°`;

    document.getElementById("pressure").textContent = `${data.main.pressure} hPa`;
    document.getElementById("humidity").textContent = `${data.main.humidity}%`;
    document.getElementById("cloudiness").textContent = `${data.weather[0].description}`;

    document.getElementById("weatherDetails").classList.remove("d-none");
    document.getElementById("weatherCards").classList.remove("d-none");

    // Update time based on city's timezone
    getTime(data.timezone);
};

const getWeather = async (city) => {
    let response = await fetch(`${URL}${city}&appid=${apiID}`);
    data = await response.json();

    console.log("API Response:", data);

    if (data.cod === 200) {
        updateWeatherDetails(data);
    } else {
        console.log("City not found:", data.message);
        alert("City not found. Please enter a valid city name.");
    }
};

const getTime = (offset) => {
    let today = new Date();
    let utc = today.getTime() + (today.getTimezoneOffset() * 60000); // Obtain UTC time in milliseconds
    let localTime = utc + (offset * 1000); // Convert UTC time to local time using the offset
    let localDate = new Date(localTime);

    let month = localDate.getMonth();
    let date = localDate.getDate();
    let day = localDate.getDay();
    let h = localDate.getHours();
    let m = localDate.getMinutes();
    let s = localDate.getSeconds();
    let amPm = "AM";
    if (h >= 12) {
        amPm = "PM";
        if (h > 12) {
            h -= 12;
        }
    } else if (h === 0) {
        h = 12; // 12 AM
    }
    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;

    document.querySelector('.date .day').textContent = `${monthsOfYear[month]} ${date} ${daysOfWeek[day]}`;
    document.querySelector('.date .time').textContent = `${h}:${m}:${s} ${amPm}`;
};

let intervalId;

const btnclick=()=>{
    const city = cityInput.value.trim();
    if (city !== "") {
        cityInput.value = "";
        getWeather(city);
        clearInterval(intervalId); // Clear any existing interval
        setTimeout(() => {
            intervalId = setInterval(() => {
                getTime(data.timezone);
            }, 1000);
        }, 1000); // Set timeout before starting interval
    }
}

searchBtn.addEventListener("click", () => {
    btnclick();
});

cityInput.addEventListener("keydown",()=>{
    if (event.key === "Enter") {
        btnclick();
    }
})