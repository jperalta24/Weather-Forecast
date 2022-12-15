// ****Global Variables*****\\
let weatherAPIkey = "4ac77901699e70e15fcbbfca21acc34c";
let city ="";
let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=4ac77901699e70e15fcbbfca21acc34c";

// find all elements where I need to insert weather data
let searchButton = $("#searchButton");
let searchInput = $("#searchCity");
let searchHistory = $("#cityHistory");
let currentCity = $("#currentCity");
let currentWeather =$("#currentWeatherInfo");
let temp = $(".cityTemp");
let wind = $(".cityWind");
let humidity = $(".cityHumidity");

let searchCity = ()=>{
let city = searchInput.val();
console.log(city);

getCity();
}

 let getCity = ()=>{
fetch(queryURL)
.then(function (response) {
     return response.json();
 })
 .then(function(data) {
     console.log(data);
 })

 }



// adds event listener for search button
searchButton.click(searchCity);


