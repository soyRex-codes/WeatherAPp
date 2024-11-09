const apiKey = '8c559316c34523d50333c666c31df318'; // Your Weatherstack API key
const apiUrl = 'http://api.weatherstack.com/current'; // Weatherstack API endpoint

const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');

searchButton.addEventListener('click', () => {
    const location = locationInput.value.trim();
    if (location) {
        fetchWeather(location);
    } else {
        alert('Please enter a city name');
    }
});

function fetchWeather(location) {
    const url = `${apiUrl}?access_key=${apiKey}&query=${location}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.success === false) {
                alert('City not found. Please try again.');
                return;
            }
            locationElement.textContent = data.location.name;
            temperatureElement.textContent = `${Math.round(data.current.temperature)}°C`;
            descriptionElement.textContent = data.current.weather_descriptions[0];
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Failed to fetch weather data. Please try again later.');
        });
}