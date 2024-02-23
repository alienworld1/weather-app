async function fetchWeatherData(location = 'Paris') {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=7af347fc3b4e4c5fbfb203652242202&q=${location}`)

    const data = await response.json();
    return data.current;
}

async function filterWeatherData(location) {
    const weather = await fetchWeatherData(location);
    const requiredData = {
        condition: weather.condition,
        temperature: weather.temp_c,
    };
    return requiredData;
}

window.addEventListener('load', async () => {
    const data = await filterWeatherData('Paris');
    console.log(data);
})