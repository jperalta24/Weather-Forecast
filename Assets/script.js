// ****Global Variables*****\\
let weatherAPIkey = "4ac77901699e70e15fcbbfca21acc34c";
let city = "";
// find all elements where I need to insert weather data
let searchButton = $("#searchButton");
let searchInput = $("#searchCity");
let searchHistory = $("#cityHistory");
let currentCity = $("#currentCity");
let currentWeather = $("#currentWeatherInfo");
let temp = $(".cityTemp");
let wind = $(".cityWind");
let humidity = $(".cityHumidity");
let fiveDayEl = document.querySelector('#forecast-container');
let forecastTitle = document.querySelector('#forecastTitle');
let currentDate = document.querySelector('#cityDate')
let cityIcon = document.querySelector('#cityIcon');

let searchCity = () => {
    let city = searchInput.val()
    // units=imperial parameter will give us fahrenheit 
    let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=4ac77901699e70e15fcbbfca21acc34c";
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            currentCity.text(data.name);
            currentDate.textContent = dayjs().format('MMM D, YYYY');
            cityIcon.setAttribute('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
        
            writeWeather(data);
            let longitude = data.coord.lon;
            let latitude = data.coord.lat;
            let fiveDayUrl = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&units=imperial&appid=4ac77901699e70e15fcbbfca21acc34c'
            //    function that gets the 5 day forecast
            fetch(fiveDayUrl)
                .then(function (response) {
                    return response.json();
                })
                // pass data as parameter to the writeForecast function
                .then(function (data) {

                    writeForecast(data);
                })
                
        })
}

//  adds temp, wind, and humidity data to current searched city
function writeWeather(data) {
    temp.text('Temp: ' + data.main.temp + '\u00B0 F');
    wind.text('Wind: ' + data.wind.speed + 'MPH');
    humidity.text('Humidity: ' + data.main.humidity + '%');
}

function writeForecast(data) {
    console.log(data)
    fiveDayEl.textContent = '';
    forecastTitle.textContent = "5 Day Forecast:";
    //set variable to store data.list
    let forecast = data.list;
    for (i = 7; i < 8 * 5; i += 8) {
        let dailyForecast = forecast[i];
        console.log(dailyForecast)

        // dynamically create card elements for 5 day forecast
        let forecastCard = document.createElement('div');
        //    adds classes to forecast card div
        forecastCard.classList = 'card bg-info text-white';

        // date element
        let forecastDate = document.createElement('div');
        forecastDate.classList = 'card-header text-white';
        forecastDate.textContent = dayjs(dailyForecast.dt_txt).format('MMM D, YYYY');
        // append forecast date to forecast card div
        forecastCard.appendChild(forecastDate);

        let forecastIcon = document.createElement('img');
        forecastIcon.classList = 'card-body text-center';
        forecastIcon.setAttribute('src', `https://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}@2x.png`);
        // appends forecast icon to forecast card div
        forecastCard.appendChild(forecastIcon);

        // add temp 
        let forecastTemp = document.createElement('div');
        forecastTemp.classList = 'card-body text-center';
        forecastTemp.textContent = 'Temp: ' + dailyForecast.main.temp + '\u00B0 F';
        forecastCard.appendChild(forecastTemp);
        // appends forecast temp to forecast card div

        // add wind 
        let forecastWind = document.createElement('div');
        forecastWind.classList = 'card-body text-center';
        forecastWind.textContent ='Wind :' + dailyForecast.wind.speed + 'MPH';
        forecastCard.appendChild(forecastWind);
        // appends forecast wind to forecast card div
        
        // add humidity 
        let forecastHumidity = document.createElement('div');
        forecastHumidity.classList = 'card-body text-center';
        forecastHumidity.textContent = 'Humidity :' + dailyForecast.main.humidity + '%';
        forecastCard.appendChild(forecastHumidity);
        // appends forecast humidity to forecast card div

        fiveDayEl.appendChild(forecastCard);
    }
}







// adds event listener for search button
searchButton.click(searchCity)



