document.addEventListener('DOMContentLoaded', function() {
    var button = document.getElementById('city-input-btn');
    button.addEventListener('click', function() {
        var cityInput = document.getElementById('city-input').value;
        weatherFn(cityInput);
    });
});

async function weatherFn(cName) {
    const url = 'https://api.openweathermap.org/data/2.5/weather';
    const apiKey = '144643af40ee42d200a44b1149b1e5a7';
    const units = 'metric';
    const temp = `${url}?q=${cName}&appid=${apiKey}&units=${units}`;

    try {
        const response = await fetch(temp);
        const data = await response.json();

        if (response.ok) {
            weatherShowFn(data);
        } else {
            alert('City not found. Please try again.');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function formatDateTime(timestamp) {
    // Create a new JavaScript Date object based on the timestamp
    var date = new Date(timestamp * 1000);

    // Format date and time components
    var day = date.getDate();
    var month = date.toLocaleString('default', { month: 'long' });
    var year = date.getFullYear();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    // Add leading zero if needed
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    // Construct the formatted date and time string
    var formattedDateTime = `${month} ${day} ${year}, ${hours}:${minutes}:${seconds}`;

    return formattedDateTime;
}

function weatherShowFn(data) {
    var cityName = document.getElementById('city-name');
    var date = document.getElementById('date');
    var temperature = document.getElementById('temperature');
    var description = document.getElementById('description');
    var windSpeed = document.getElementById('wind-speed');
    var weatherIcon = document.getElementById('weather-icon');

    cityName.textContent = data.name;
    date.textContent = formatDateTime(data.dt); // Format date using custom function
    temperature.innerHTML = `${data.main.temp}°C`;
    description.textContent = data.weather[0].description;
    windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;

    // Set weather icon based on weather condition code
    var iconCode = data.weather[0].icon;
    var iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;
    weatherIcon.src = iconUrl;

    // Fade in weather info
    var weatherInfo = document.getElementById('weather-info');
    weatherInfo.style.display = 'block';  // assuming it's initially hidden
}
