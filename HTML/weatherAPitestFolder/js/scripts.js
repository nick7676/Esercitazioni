const apiKey = "f422c8a39f114b8bb16153715252205";
let cittaRecenti = JSON.parse(localStorage.getItem("recentCities")) || [];
let currentSection = "current";

document.addEventListener('DOMContentLoaded', function () {
    const inputCitta = document.getElementById("cityInput");
    const inputCittaForecast = document.getElementById("cityInputForecast");

    inputCitta.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            getWeather();
        }
    });

    inputCittaForecast.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            getForecast();
        }
    });

    inputCitta.value = "Genoa";
    getWeather();
    displayRecentCities();


    document.getElementById("toggleSidebar").addEventListener("click", () => {
        document.getElementById("sidebar").classList.add("show");
        document.getElementById("toggleSidebar").style.visibility = "hidden";
    });

    document.getElementById("toggleSidebarForecast").addEventListener("click", () => {
        document.getElementById("sidebar").classList.add("show");
        document.getElementById("toggleSidebarForecast").style.visibility = "hidden";
    });

    document.getElementById("closeSidebar").addEventListener("click", () => {
        document.getElementById("sidebar").classList.remove("show");
        if (currentSection === "current") {
            document.getElementById("toggleSidebar").style.visibility = "visible";
        } else {
            document.getElementById("toggleSidebarForecast").style.visibility = "visible";
        }
    });
});

function switchToCurrentWeather() {
    currentSection = "current";
    document.getElementById("currentWeatherSection").classList.add("active");
    document.getElementById("forecastSection").classList.remove("active");
    document.getElementById("navHome").classList.add("active");
    document.getElementById("navForecast").classList.remove("active");
}

function switchToForecast() {
    currentSection = "forecast";
    document.getElementById("currentWeatherSection").classList.remove("active");
    document.getElementById("forecastSection").classList.add("active");
    document.getElementById("navHome").classList.remove("active");
    document.getElementById("navForecast").classList.add("active");
    
    const currentCity = document.getElementById("cityInput").value;
    if (currentCity) {
        document.getElementById("cityInputForecast").value = currentCity;
    }
}

function updateRecentCities(city, temp, emoji) {
    cittaRecenti = cittaRecenti.filter(item => item.city.toLowerCase() !== city.toLowerCase());

    cittaRecenti.unshift({
        city: city,
        temp: temp,
        emoji: emoji
    });

    if (cittaRecenti.length > 5) {
        cittaRecenti.pop();
    }

    localStorage.setItem("recentCities", JSON.stringify(cittaRecenti));
    displayRecentCities();
}

function displayRecentCities() {
    const list = document.getElementById("sidebarList");
    if (!list) return;

    list.innerHTML = "";

    if (cittaRecenti.length === 0) {
        list.innerHTML = "<li class='list-group-item'>Nessuna città recente.</li>";
        return;
    }

    cittaRecenti.forEach(item => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center sidebar-city-item";
        li.innerHTML = `<span>${item.emoji} <strong>${item.city}</strong></span> <span>${item.temp}°C</span>`;
        
        li.addEventListener("click", () => {
            const activeInput = currentSection === "current" ? 
                document.getElementById("cityInput") : 
                document.getElementById("cityInputForecast");
            
            activeInput.value = item.city;
            
            if (currentSection === "current") {
                getWeather();
            } else {
                getForecast();
            }

            document.getElementById("sidebar").classList.remove("show");
            if (currentSection === "current") {
                document.getElementById("toggleSidebar").style.visibility = "visible";
            } else {
                document.getElementById("toggleSidebarForecast").style.visibility = "visible";
            }
        });
        
        list.appendChild(li);
    });
}

function getTemperatureColor(temp) {
    if (temp <= 0) return '#74b9ff';
    if (temp <= 10) return '#00b894';
    if (temp <= 20) return '#fdcb6e';
    if (temp <= 30) return '#fd79a8';
    return '#e17055';
}

function getThermometerHeight(temp) {
    const minTemp = -20;
    const maxTemp = 50;
    const percentage = Math.max(0, Math.min(100, ((temp - minTemp) / (maxTemp - minTemp)) * 100));
    return percentage;
}

function getWeatherEmoji(condition, cloud) {
    const lowCondition = condition.toLowerCase();

    if (lowCondition.includes('parzialmente nuvoloso') && cloud > 15 && cloud < 40) return '🌤️';
    if (lowCondition.includes('sole') || lowCondition.includes('sereno')) return '☀️';
    if (lowCondition.includes('nuvoloso') || lowCondition.includes('nuvole')) return '☁️';
    if (lowCondition.includes('pioggia') || lowCondition.includes('piovoso')) return '🌧️';
    if (lowCondition.includes('neve')) return '❄️';
    if (lowCondition.includes('temporale')) return '⛈️';
    if (lowCondition.includes('nebbia')) return '🌫️';

    return '☀️';
}

function getDayName(dateString) {
    const days = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];
    const date = new Date(dateString);
    return days[date.getDay()];
}

function getWeather() {
    const city = document.getElementById("cityInput").value.trim();

    if (!city) {
        showError("Per favore inserisci il nome di una città", "weatherResult");
        return;
    }

    showLoading("weatherResult");

    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&lang=it`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Città non trovata o errore di connessione");
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Errore API:', error);
            showError(`Errore: ${error.message}`, "weatherResult");
        });
}

function getForecast() {
    const city = document.getElementById("cityInputForecast").value.trim();

    if (!city) {
        showError("Per favore inserisci il nome di una città", "forecastResult");
        return;
    }

    showLoading("forecastResult");

    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7&lang=it`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Città non trovata o errore di connessione");
            }
            return response.json();
        })
        .then(data => {
            displayForecast(data);
        })
        .catch(error => {
            console.error('Errore API:', error);
            showError(`Errore: ${error.message}`, "forecastResult");
        });
}

function showLoading(elementId) {
    const element = document.getElementById(elementId);
    element.innerHTML = `
        <div class="loading">
            Cercando informazioni meteo...
        </div>
    `;
}

function showError(message, elementId) {
    const element = document.getElementById(elementId);
    element.innerHTML = `
        <div class="error-message">
            ❌ ${message}
        </div>
    `;
}

function displayWeather(data) {
    const temp = Math.round(data.current.temp_c);
    const humidity = data.current.humidity;
    const condition = data.current.condition.text;
    const conditionIcon = "https:" + data.current.condition.icon;
    const wind = Math.round(data.current.wind_kph);
    const feelsLike = Math.round(data.current.feelslike_c);
    const visibility = data.current.vis_km;
    const pressure = data.current.pressure_mb;
    const uvIndex = data.current.uv;

    const thermometerColor = getTemperatureColor(temp);
    const thermometerHeight = getThermometerHeight(temp);
    const weatherEmoji = getWeatherEmoji(condition);

    const weatherResult = document.getElementById("weatherResult");

    if (data.location.name.toLowerCase() !== "genoa") {
        updateRecentCities(data.location.name, temp, weatherEmoji);
    }

    weatherResult.innerHTML = `
        <div class="weather-display" style="display: block;">
            <div class="weather-header">
                <div class="city-name">
                    📍 ${data.location.name}, ${data.location.country}
                </div>
                <p class="text-muted">Aggiornato: ${new Date().toLocaleTimeString('it-IT')}</p>
            </div>

            <div class="weather-main">
                <div class="temperature-section">
                    <div class="main-temp">
                        ${temp}°C
                        <div class="mini-thermometer">
                            <div class="graduations"></div>
                            <div class="temperature-fill" 
                                 style="height: ${thermometerHeight}%; background: linear-gradient(${thermometerColor}, ${thermometerColor}90);"></div>
                        </div>
                    </div>
                </div>

                <div class="text-center">
                    <img src="${conditionIcon}" alt="${condition}" class="weather-icon">
                    <div>
                        <strong style="font-size: 1.2rem;">${weatherEmoji} ${condition}</strong>
                    </div>
                </div>
            </div>

            <div class="weather-details">
                <div class="detail-card">
                    <div class="detail-value">🌡️ ${feelsLike}°C</div>
                    <div class="detail-label">Percepita</div>
                </div>
                
                <div class="detail-card">
                    <div class="detail-value">💧 ${humidity}%</div>
                    <div class="detail-label">Umidità</div>
                </div>
                
                <div class="detail-card">
                    <div class="detail-value">💨 ${wind} km/h</div>
                    <div class="detail-label">Vento</div>
                </div>
                
                <div class="detail-card">
                    <div class="detail-value">👁️ ${visibility} km</div>
                    <div class="detail-label">Visibilità</div>
                </div>
                
                <div class="detail-card">
                    <div class="detail-value">⏲️ ${pressure} mb</div>
                    <div class="detail-label">Pressione</div>
                </div>
                
                <div class="detail-card">
                    <div class="detail-value">☀️ ${uvIndex}</div>
                    <div class="detail-label">Indice UV</div>
                </div>
            </div>
        </div>
    `;
}

function displayForecast(data) {
    const forecastResult = document.getElementById("forecastResult");
    
    let forecastHTML = `
        <div class="weather-display" style="display: block;">
            <div class="weather-header">
                <div class="city-name">
                    📍 ${data.location.name}, ${data.location.country}
                </div>
                <p class="text-muted">Previsioni per i prossimi 7 giorni</p>
            </div>
            
            <div class="forecast-container">
    `;

    data.forecast.forecastday.forEach((day, index) => {
        const date = new Date(day.date);
        const dayName = index === 0 ? 'Oggi' : getDayName(day.date);
        const dateStr = date.toLocaleDateString('it-IT', { day: 'numeric', month: 'short' });
        
        const maxTemp = Math.round(day.day.maxtemp_c);
        const minTemp = Math.round(day.day.mintemp_c);
        const condition = day.day.condition.text;
        const conditionIcon = "https:" + day.day.condition.icon;
        const weatherEmoji = getWeatherEmoji(condition);
        const humidity = day.day.avghumidity;
        const windSpeed = Math.round(day.day.maxwind_kph);
        const rainChance = day.day.daily_chance_of_rain;

        forecastHTML += `
            <div class="forecast-day-card">
                <div class="forecast-day-header">
                    <div class="day-name">${dayName}</div>
                    <div class="day-date">${dateStr}</div>
                </div>
                
                <div class="forecast-day-main">
                    <div class="forecast-icon-section">
                        <img src="${conditionIcon}" alt="${condition}" class="forecast-weather-icon">
                        <div class="forecast-condition">${weatherEmoji} ${condition}</div>
                    </div>
                    
                    <div class="forecast-temp-section">
                        <div class="forecast-temps">
                            <span class="max-temp">${maxTemp}°</span>
                            <span class="min-temp">${minTemp}°</span>
                        </div>
                        <div class="temp-bar">
                            <div class="temp-range" style="background: linear-gradient(90deg, ${getTemperatureColor(minTemp)}, ${getTemperatureColor(maxTemp)});"></div>
                        </div>
                    </div>
                </div>
                
                <div class="forecast-details">
                    <div class="forecast-detail">
                        <span class="detail-icon">💧</span>
                        <span>${humidity}%</span>
                    </div>
                    <div class="forecast-detail">
                        <span class="detail-icon">💨</span>
                        <span>${windSpeed} km/h</span>
                    </div>
                    <div class="forecast-detail">
                        <span class="detail-icon">🌧️</span>
                        <span>${rainChance}%</span>
                    </div>
                </div>
            </div>
        `;
    });

    forecastHTML += `
            </div>
        </div>
    `;

    forecastResult.innerHTML = forecastHTML;
}