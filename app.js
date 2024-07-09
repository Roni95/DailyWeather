const apiKey = '0ff52a1aa74a48b480595451240807'; // Replace with your WeatherAPI key

document.addEventListener('DOMContentLoaded', () => {
  getWeather('Dhaka');
});

async function getWeather(city = null) {
  const cityInput = document.getElementById('city').value;
  const weatherDiv = document.getElementById('weather');
  const errorDiv = document.getElementById('error');

  weatherDiv.innerHTML = '';
  errorDiv.innerHTML = '';

  const cityName = city ? city : cityInput;

  if (!cityName) {
    errorDiv.textContent = 'Please enter a city name';
    return;
  }

  try {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=5`);
    if (!response.ok) {
      throw new Error('City not found');
    }
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    errorDiv.textContent = error.message;
  }
}

function displayWeather(data) {
  const weatherDiv = document.getElementById('weather');
  const location = data.location.name;
  const current = data.current;
  const forecast = data.forecast.forecastday;

  const currentWeather = `
        <h2 style="text-align:center;">Location: ${location} , ${data.location.country}</h2>
        
        <h3 style="text-align:center;">Current Weather</h3>
        <h4 style="text-align:center;">Last Updated Time: ${current.last_updated} </h4>
        <div style="display:flex; justify-content: center; gap: 20px; align-items: center;">
        <img src="${current.condition.icon}" alt="${current.condition.text}">
        <p><b>${current.condition.text}</b></p>
        </div>

        <div class="current-weather-container">

        <section class="current-weather">
            <h3>Temperature</h3>
            <p>Temp: ${current.temp_c} °C / ${current.temp_f} °F</p>
            <p>Humidity: ${current.humidity} %</p>
            <p>Time: ${current.is_day?"Day":"Night"}</p>
        </section>
        
        <section class="current-weather">
            <h3>Wind</h3>
            <p>Speed: ${current.wind_mph} mph / ${current.wind_kph} kph</p>
            <p>Degree: ${current.wind_degree} </p>
            <p>Direction: ${current.wind_dir} </p>
        </section>

        <section class="current-weather">
            <h3>Pressure</h3>
            <p>Pressure in mb: ${current.pressure_mb} mb</p>
            <p>Pressure in in: ${current.pressure_in} in</p>
            <p>Precip: ${current.precip_mm} mm </p>
        </section>

        <section class="current-weather">
            <h3>Feels</h3>
            <p>Feelslike: ${current.feelslike_c}°C/${current.feelslike_f}F</p>
            <p>Windchill: ${current.windchill_c}°C/${current.windchill_f}F</p>
            <p>HeatIndex: ${current.heatindex_c}°C/${current.heatindex_f}F</p>
            
        </section>

        </div>
    `;
  

  let forecastWeather = '<h3>5-Day Forecast</h3><div class="forecast-container">';
  forecast.forEach(day => {
    forecastWeather += `
            <div class="forecast-day">
                <p><strong>${day.date}</strong></p>
                <img src="${day.day.condition.icon}" alt="${day.day.condition.text}">
                <p>${day.day.condition.text}</p>
                <p>Max Temp: ${day.day.maxtemp_c} °C</p>
                <p>Min Temp: ${day.day.mintemp_c} °C</p>
            </div>
        `;
  });
  forecastWeather += '</div>';

  weatherDiv.innerHTML = currentWeather + forecastWeather;
}