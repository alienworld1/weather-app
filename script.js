async function fetchWeatherData(location) {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=7af347fc3b4e4c5fbfb203652242202&q=${location}`)

    const data = await response.json();
    return data.current;
}

async function filterWeatherData(location) {
    const weather = await fetchWeatherData(location);
    return {
        condition: weather.condition,
        temperature: weather.temp_c,
        rainfall: weather.precip_mm,
        windSpeed: weather.wind_kph,
        humidity: weather.humidity,
        visibility: weather.vis_km,
        feelsLike: weather.feelslike_c,
        cloudCover: weather.cloud,
    };
}

async function displayWeatherData(location) {
    const data = await filterWeatherData(location);
    console.log(data);
}

window.addEventListener('load', () => {
    displayWeatherData('Chennai');
});

const searchButton = document.getElementById('search-btn');
const searchBar = document.getElementById('search');

searchButton.addEventListener('click', () => {
    displayWeatherData(searchBar.value || 'London');
});