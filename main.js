var latitude;
var longitude;
var city;
var icon;
var description;
var temperature;
var toggleButton = document.getElementById("toggle");
var tempCheck = "c";

function weather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            latitude =position.coords.latitude ;
            longitude =position.coords.longitude ;
            getWeather(latitude, longitude);
        });
    } else {
        alert("err...geolocation disabled!");
    }
}

weather(); // to get the geolocation

function getWeather(latitude, longitude) {
    var xmlHTTP = new XMLHttpRequest();
    var url = 'https://fcc-weather-api.glitch.me/api/current?lat='+latitude+'&lon='+longitude;
    xmlHTTP.open('GET', url, true);
    xmlHTTP.send();
    xmlHTTP.onload = function() {
        if (xmlHTTP.status === 200) {
            var recieved = xmlHTTP.response;
            recieved = JSON.parse(recieved);

            var city = recieved.name + ', ' + recieved.sys.country;
            var cityHTML = '<h2>'+city+'</h2>';
            document.getElementById("city").innerHTML = cityHTML;


            icon = recieved.weather[0].icon;
            var image = '<img src='+icon+' width="50px" height="50px"/>';
            document.getElementById("icon").innerHTML = image;


            description = recieved.weather[0].main + ', ' + recieved.weather[0].description;
            var descriptionHTML = '<p>'+description+'</p>';
            document.getElementById("description").innerHTML = descriptionHTML;

            temperature = recieved.main.temp;
            var temperatureHTML = '<p>'+temperature+' &deg;C</p>';
            document.getElementById("temp").innerHTML = temperatureHTML;

            toggle.addEventListener("click", function() {
                if (tempCheck === "c") {
                    tempCheck = "f";
                    temperature = ((9 * recieved.main.temp) / 5) + 32;
                    temperature = temperature.toFixed(2);
                    var temperatureHTML = '<p>'+temperature+' &deg;F</p>';
                    document.getElementById("temp").innerHTML = temperatureHTML;
                } else {
                    tempCheck = "c";
                    temperature = (5 * (temperature - 32)) / 9;
                    temperature = temperature.toFixed(2);
                    var temperatureHTML = '<p>'+temperature+' &deg;C</p>';
                    document.getElementById("temp").innerHTML = temperatureHTML;
                }
            });

        } else {
            alert("err...api error!");
        }
    }
}
