const apiKey = 'dcc19b53defe34d79cef65739470e737';
const weatherContainer = document.querySelector('.weather-container');
const cityInput = document.getElementById('city-input');
const getWeatherBtn = document.getElementById('get-weather-btn');
const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const weatherDescription = document.getElementById('weather-description');
const icon = document.getElementById('icon'); // New icon element

getWeatherBtn.addEventListener('click', () => {
    const city = cityInput.value;
    if (city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
            .then(response => response.json())
            .then(data => {
                console.log(data); // Log the data for debugging
                const temp = data.main.temp;
                const weather = data.weather[0].description;
                updateWeatherInfo(city, temp, weather);
                updateBackground(weather);
                updateIcon(weather); // New function to update icon
            })
            .catch(error => console.error('Error fetching weather data:', error));
    } else {
        alert('Please enter a city name.');
    }
});

function updateWeatherInfo(city, temp, weather) {
    cityName.textContent = city;
    temperature.textContent = `Temperature: ${temp}°C`;
    weatherDescription.textContent = `Weather: ${weather}`;
}

function updateBackground(weather) {
    if (weather.includes('clear')) {
        document.body.style.backgroundColor = '#87CEEB'; // Clear sky
    } else if (weather.includes('clouds')) {
        document.body.style.backgroundColor = '#B0C4DE'; // Cloudy
    } else if (weather.includes('rain')) {
        document.body.style.backgroundColor = '#778899'; // Rainy
    } else if (weather.includes('snow')) {
        document.body.style.backgroundColor = '#F0FFFF'; // Snowy
    } else {
        document.body.style.backgroundColor = '#FFD700'; // Default
    }
}

function updateIcon(weather) {
    icon.innerHTML = ''; // Clear any existing icon
    if (weather.includes('clear')) {
        icon.className = 'sun';
        icon.innerHTML = '☀️'; // Sun icon
    } else if (weather.includes('clouds')) {
        icon.className = 'cloud';
        icon.innerHTML = '☁️'; // Cloud icon
    } else if (weather.includes('rain')) {
        icon.className = 'rain';
        icon.innerHTML = '💧'; // Rain icon
    } else if (weather.includes('snow')) {
        icon.className = 'snow';
        icon.innerHTML = '❄️'; // Snow icon
    } else {
        icon.className = '';
        icon.innerHTML = ''; // Default
    }
}
