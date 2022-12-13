let weatherAPIkey = "4ac77901699e70e15fcbbfca21acc34c";
let city = "Seattle";
let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=4ac77901699e70e15fcbbfca21acc34c";




    fetch(queryURL)
       .then(function (response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
        })
    