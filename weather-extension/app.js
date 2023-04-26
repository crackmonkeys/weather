import config from './config.js';

const apiKey = config.apiKey;
const baseURL = 'https://api.openweathermap.org/data/2.5/';

const searchInput = document.getElementById('search-input');


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
  setBackground(data.weather[0].main);
}


function setBackground(condition) {
  const weatherToImage = { 
    'Clear': 'images/clear.jpg',
    'Clouds': 'images/clouds.jpg',
    'Rain': 'images/rain.jpg', 
  };
  const image = weatherToImage[condition];
  document.body.style.backgroundImage = `url('${image}')`;
}

fetchWeatherData('Sydney');