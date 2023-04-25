import config from './config.js';

const apiKey = config.apiKey;
const baseURL = 'https://api.openweathermap.org/data/2.5/';

const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const metricCheckbox = document.getElementById('metric-checkbox');

console.log('apiKey:', apiKey);

// Fetch weather data
async function fetchWeatherData(location, units = 'metric') {
  try {
    const response = await fetch(
      `${baseURL}weather?q=${location}&units=${units}&appid=${apiKey}`
    );

    if (response.ok) {
      const data = await response.json();
      displayCurrentWeather(data);
    } else {
      console.error('Error fetching weather data:', response.status);
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

// Display current weather data
function displayCurrentWeather(data) {
  document.querySelector('.location').textContent = `${data.name}, ${data.sys.country}`;
  document.querySelector('.conditions').textContent = data.weather[0].main;
  document.querySelector('.temp').textContent = `${(data.main.temp)}°`;
  document.querySelector('.weather-icon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
  document.querySelector('.weather-icon').alt = data.weather[0].description;
}

// Search location
function searchLocation() {
  const location = searchInput.value;
  if (location) {
    const units =  'metric';
    fetchWeatherData(location, units);
  }
}



// Event listeners
searchButton.addEventListener('click', searchLocation);


// Initialize with a default location
fetchWeatherData('Sydney');
