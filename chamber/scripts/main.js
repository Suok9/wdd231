document.addEventListener("DOMContentLoaded", async function () {
   
    try {
        const response = await fetch("data/members.json");
        const members = await response.json();
        const container = document.getElementById("directory-container");

        function renderMembers(view) {
            container.innerHTML = "";
            members.forEach(member => {
                const div = document.createElement("div");
                div.classList.add(view === "grid" ? "grid-item" : "list-item");
                div.innerHTML = `
                    <img src="${member.image}" alt="${member.name}">
                    <h2>${member.name}</h2>
                    <p>${member.address}</p>
                    <p>${member.phone}</p>
                    <a href="${member.website}" target="_blank">Visit Website</a>
                `;
                container.appendChild(div);
            });
        }

        
        renderMembers("grid");
    } catch (error) {
        console.error("Error loading members:", error);
    }

   
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");

    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("show");
    });

   
    document.getElementById("year").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = document.lastModified;
});




document.addEventListener("DOMContentLoaded", async function () {
    const apiKey = "dff701d4d8725e1471ae0dabb10f8076"; 
    const city = "Warri"; 
    const weatherInfo = document.getElementById("weather-info");
    const forecastContainer = document.getElementById("forecast-container");

   
    async function fetchWeather() {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
            );
            if (!response.ok) throw new Error("Weather data not available");

            const data = await response.json();
            const temperature = data.main.temp;
            const description = data.weather[0].description;
            const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

            weatherInfo.innerHTML = `
                <img src="${icon}" alt="Weather icon">
                <p>${city}: ${temperature}°C, ${description}</p>
            `;
        } catch (error) {
            weatherInfo.textContent = "Unable to fetch weather data.";
        }
    }

    
    async function fetchTodayForecast() {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
            );
            if (!response.ok) throw new Error("Forecast data not available");

            const data = await response.json();
            forecastContainer.innerHTML = ""; 

            
            const today = new Date().toISOString().split("T")[0]; 
            const todayForecast = data.list.find((item) =>
                item.dt_txt.startsWith(today)
            );

            if (todayForecast) {
                const time = todayForecast.dt_txt.split(" ")[1]; 
                const temp = todayForecast.main.temp;
                const desc = todayForecast.weather[0].description;
                const icon = `https://openweathermap.org/img/wn/${todayForecast.weather[0].icon}.png`;

                forecastContainer.innerHTML = `
                    <p><strong>Forecast for Today (${time})</strong></p>
                    <img src="${icon}" alt="Weather icon">
                    <p>${temp}°C, ${desc}</p>
                `;
            } else {
                forecastContainer.innerHTML = "Forecast data unavailable for today.";
            }
        } catch (error) {
            forecastContainer.innerHTML = "Unable to fetch forecast data.";
        }
    }

    
    fetchWeather();
    fetchTodayForecast();
});