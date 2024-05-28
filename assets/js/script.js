const apiKey = "c8b61dd674f9e6e05e9b9f07ff9b9665";

document.getElementById('city-form').addEventListener('submit', function (event) {
  event.preventDefault();
  const cityName = document.getElementById('Input1').value;
  getGeocodingUrl(cityName);
});

function  getGeocodingUrl(cityName) {
  const geocoding = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`;
  fetch(geocoding)
    .then(response => response.json())
    .then(data => {
      if (data.length > 0) {
        const { lat, lon } = data[0];
        console.log(`coordinates for ${cityName}: Latitude - ${lat}, Longitude - ${lon}`);
        getWeatherForcast(lat, lon, cityName);
      } else {
        console.error("No data found for this specfied city.");
      }
    })
    .catch(error => console.error('Error fetching the data:', error));
}
function getWeatherForcast(lat, lon, cityName) {
      const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

      fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
          console.log('5 Day Weather Forecast:', data);
          displayWeatherForecast(data, cityName);
        })
        .catch(error => console.error('Error fetching the weather data:', error));
    }
function displayWeatherForecast(data, cityName) {
      const forcastResultEl = document.getElementById('forcast-results');
     
      forcastResultEl.innerHTML = "";
      const next5DaysForecast = data.list.filter(forecast => forecast.dt_txt.includes('12:00:00'));
                                                              


      next5DaysForecast.forEach((forecast) => {
        const forecastEl = document.createElement('div');
        forecastEl.classList.add('forcastcards');
        forecastEl.innerHTML = `
            <p><strong>Date:</strong> ${forecast.dt_txt.split(" ")[0]}</p>
            <p><img src= "https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png"/></p>
            <p><strong>Temperature:</strong> ${forecast.main.temp} °F</p>
            <p><strong>Humidity:</strong> ${forecast.main.humidity}%</p>
            <p><strong>Wind Speed:</strong> ${forecast.wind.speed} m/s</p>

        `;
        forcastResultEl.appendChild(forecastEl);
      });
    }












