const apiKey = "c8b61dd674f9e6e05e9b9f07ff9b9665";


const searchHistoryListEl = document.getElementById('search-history-list');
const searchHistoryContainerEl = document.getElementById('search-history-container');

function updateSearchHistoryHTML(){
  var searchHistoryListJson = localStorage.getItem('search-history');
  if (searchHistoryListJson == null){
    return;
  }

  var searchHistoryList = JSON.parse(searchHistoryListJson);
  searchHistoryList.forEach((historyItem) => {
    addCityToSearchHistoryHTML(historyItem.cityName);
  })
}

function addCityToSearchHistoryHTML(cityName){
  searchHistoryContainerEl.style.display = 'block';
  const historyItemDiv = document.createElement('div');
  historyItemDiv.classList.add('search-history-item');
  historyItemDiv.innerHTML = `
    <button type='button'>${cityName}</button>
  `;
  searchHistoryListEl.appendChild(historyItemDiv);
}

function getSearchHistory(){
  var searchHistoryListJson = localStorage.getItem('search-history');
  if (searchHistoryListJson == null){
    return [];
  }
  var searchHistoryList = JSON.parse(searchHistoryListJson);
  return searchHistoryList;
}

function addCityToSearchHistory(cityName){
  const historyItemToSave = {
    cityName: cityName
  };
  var currentSearchHistory = getSearchHistory();
  currentSearchHistory.push(historyItemToSave);
  localStorage.setItem('search-history', JSON.stringify(currentSearchHistory));

  addCityToSearchHistoryHTML(cityName);
}





// get search history from local storage and update the html
updateSearchHistoryHTML();


document.getElementById('city-form').addEventListener('submit', function (event) {
  event.preventDefault();
  const cityName = document.getElementById('Input1').value;
  if(cityName == ''){
    return;
  }
  addCityToSearchHistory(cityName);
  getGeocodingUrl(cityName);
});

function getGeocodingUrl(cityName) {
  const geocodingUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`;
  fetch(geocodingUrl)
    .then(response => response.json())
    .then(data => {
      if (data.length > 0) {
        const { lat, lon } = data[0];
        console.log(`coordinates for ${cityName}: Latitude - ${lat}, Longitude - ${lon}`);
        getCurrentWeather(cityName);
        getWeatherForcast(lat, lon, cityName);
        //trynna call the getcurrentweather function.
        //may be i should do the throw error thing.
      } else {
        console.error("No data found for this specfied city.");
      }
    })
    .catch(error => console.error('Error fetching the data:', error));
}

function getCurrentWeather(cityName) {
  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;
  fetch(currentWeatherUrl)
    .then(response => response.json())
    .then(data => {
      console.log('currentWeather:', data);

      displayCurrentWeather(data, cityName);
    })
    .catch(error => console.error('Error fetching the weather data:', error));
}


function displayCurrentWeather(data, cityName) {
  const currentWeatherEL = document.getElementById('weather-result');
  currentWeatherEL.innerHTML = `
            <p><strong> ${cityName}<strong></p>
            <p><strong>Date:</strong> ${new Date(data.dt * 1000).toLocaleDateString()}</p>
            <p><img src= "https://openweathermap.org/img/wn/${data.weather[0].icon}.png"/></p>
            <p><strong>Temperature:</strong> ${data.main.temp} °F</p>
            <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
            <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
        `;
            

};
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
    forecastEl.classList.add('forcastcard');
    
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























