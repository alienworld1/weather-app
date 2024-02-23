class loadingDialog {

    static isOpen = false;

    static open() {

        if (loadingDialog.isOpen) return;
        const main = document.querySelector('.main-body');
        
        const loadingScreen = document.createElement('div');
        loadingScreen.classList.add('loading');
        loadingScreen.textContent = 'Fetching weather data...';

        loadingDialog.isOpen = true;
        main.appendChild(loadingScreen);
    }

    static close() {
        const main = document.querySelector('.main-body');
        const loadingScreen = document.querySelector('.loading');

        loadingDialog.isOpen = false;
        main.removeChild(loadingScreen);
    }
}

class ErrorDialog {

    static isOpen = false;

    static open(errorMessage) {

        if (ErrorDialog.isOpen) ErrorDialog.close();

        const main = document.querySelector('.main-body');

        const errorDialog = document.createElement('div');
        errorDialog.classList.add('error');
        errorDialog.textContent = errorMessage;

        ErrorDialog.isOpen = true;

        main.appendChild(errorDialog);
    }

    static close() {
        const main = document.querySelector('.main-body');
        const errorDialog = document.querySelector('.error');

        ErrorDialog.isOpen = false;
        main.removeChild(errorDialog);
    }
}

async function fetchWeatherData(location) {
    loadingDialog.open();
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=7af347fc3b4e4c5fbfb203652242202&q=${location}`);

        if (response.status === 400) {
            throw new Error('Unable to locate the place.');
        }

        const data = await response.json();
        return data.current;

    } catch (error) {
        loadingDialog.close();
        ErrorDialog.open(error);
    }
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
    loadingDialog.close();

    if (ErrorDialog.isOpen) {
        ErrorDialog.close();
    }

    const placeHeader = document.querySelector('.place-name');
    placeHeader.textContent = location;

    const weatherIcon = document.getElementById('icon');
    const conditionText = document.getElementById('condition-display');
    weatherIcon.src = data.condition.icon;
    weatherIcon.alt = data.condition.text;
    conditionText.textContent = data.condition.text;

    const temperatureText = document.getElementById('temperature');
    const feelsLikeText = document.getElementById('feels-like');
    temperatureText.textContent = `Temperature: ${data.temperature} °C`;
    feelsLikeText.textContent = `Feels like ${data.feelsLike} °C`;

    const rainfall = document.getElementById('rainfall');
    rainfall.textContent = `Rainfall: ${data.rainfall} mm`;

    const windSpeed = document.getElementById('wind-speed');
    windSpeed.textContent = `Wind Speed: ${data.windSpeed} kph`;

    const humidity = document.getElementById('humidity');
    humidity.textContent = `Humidity: ${data.humidity}%`;

    const visibility = document.getElementById('visibility');
    visibility.textContent = `Visibility: ${data.visibility} km`;

    const cloud = document.getElementById('cloud');
    cloud.textContent = `Cloud Cover: ${data.cloudCover}%`;    

}

window.addEventListener('load', () => {
    displayWeatherData('Chennai');
});

const searchButton = document.getElementById('search-btn');
const searchBar = document.getElementById('search');

searchButton.addEventListener('click', () => {
    displayWeatherData(searchBar.value || 'London');
});
