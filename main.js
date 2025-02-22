// OpenWeatherMap API key and base URL
const API_KEY = "81e5d511a9ab4f126d90eed7abba9f1d";
const API_URL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// Selecting essential DOM elements
const searchInput = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherContainer = document.querySelector(".weather");
const errorMessage = document.querySelector(".error");

// Function to fetch and display weather data
async function fetchWeather(city) {
    try {
        const response = await fetch(`${API_URL}${city}&appid=${API_KEY}`);
        
        if (!response.ok) {
            throw new Error("City not found");
        }
        
        const data = await response.json();
        updateWeatherUI(data);
    } catch (error) {
        displayError();
    }
}

// Function to update the weather UI with fetched data
function updateWeatherUI(data) {
    document.querySelector(".city").textContent = data.name;
    document.querySelector(".temp").textContent = `${Math.round(data.main.temp)}°C`;
    document.querySelector(".humidity").textContent = `${data.main.humidity}%`;
    document.querySelector(".wind").textContent = `${data.wind.speed} km/h`;
    
    // Mapping weather conditions to respective icons
    const weatherConditions = {
        "Clouds": "images/clouds.png",
        "Rain": "images/rain.png",
        "Clear": "images/clear.png",
        "Drizzle": "images/drizzle.png",
        "Mist": "images/mist.png",
        "Snow": "images/snow.png"
    };
    
    weatherIcon.src = weatherConditions[data.weather[0].main] || "images/clear.png";
    
    // Display the weather container
    errorMessage.style.display = "none";
    weatherContainer.classList.add("show");
}

// Function to display an error message
function displayError() {
    errorMessage.style.display = "block";
    weatherContainer.classList.remove("show");
}

// Event listener for search button click
searchButton.addEventListener("click", () => {
    const city = searchInput.value.trim();
    if (city) fetchWeather(city);
});

// Event listener for pressing 'Enter' key in the input field
searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        const city = searchInput.value.trim();
        if (city) fetchWeather(city);
    }
});
