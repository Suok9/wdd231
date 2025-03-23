const apiKey = 'dff701d4d8725e1471ae0dabb10f8076'; 
const city = 'Warri,NG'; 
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;


async function getCurrentWeather() {
    try {
        const response = await fetch(weatherUrl);
        const data = await response.json();
        
        document.getElementById('weather-info').innerHTML = `
            <strong>${data.weather[0].description.toUpperCase()}</strong><br>
            Temperature: ${data.main.temp}°C<br>
            Humidity: ${data.main.humidity}%<br>
            Wind Speed: ${data.wind.speed} m/s
        `;
    } catch (error) {
        document.getElementById('weather-info').innerText = "Error loading weather data.";
    }
}


async function getWeatherForecast() {
    try {
        const response = await fetch(forecastUrl);
        const data = await response.json();
        
        let forecastHTML = '';

        
        const forecastDays = {};
        data.list.forEach(entry => {
            const date = entry.dt_txt.split(" ")[0]; 
            if (!forecastDays[date] && Object.keys(forecastDays).length < 3) {
                forecastDays[date] = entry;
                forecastHTML += `
                    <div class="forecast-day">
                        <strong>${new Date(date).toDateString()}</strong><br>
                        ${entry.weather[0].description.toUpperCase()}<br>
                        Temp: ${entry.main.temp}°C
                    </div>
                `;
            }
        });

        document.getElementById('forecast-container').innerHTML = forecastHTML;
    } catch (error) {
        document.getElementById('forecast-container').innerText = "Error loading forecast data.";
    }
}


getCurrentWeather();
getWeatherForecast();