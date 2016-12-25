/**
 * Created by chewy on 12/25/16.
 */
var API_KEY = "fb2a58cc7edd041cbab1595ddb20574a";
var cel = false;
var w;

function displayTemp(num,c) {
    if (c) {
        return Math.round((num -32)*(5/9))+" &degC";
    } else {
        return Math.round(num)+ " &degF";
    }
}

function setBackground(weather) {
    if (weather=="clear sky") {
        document.body.style.backgroundImage = "url('https://dl.dropboxusercontent.com/s/7a99hi9poz6yj7a/clear_skies.jpg?dl=0')";
    } else if (weather=="fog") {
        document.body.style.backgroundImage="url('https://dl.dropboxusercontent.com/s/hles7j7p2dzbsgr/fog.jpg?dl=0')";
    } else if (weather.includes("clouds")) {
        document.body.style.backgroundImage="url('https://dl.dropboxusercontent.com/s/cpmrzhm6yrljiaw/broken_clouds.jpg?dl=0')";
    } else if (weather=="few clouds") {
        document.body.style.backgroundImage="url('https://dl.dropboxusercontent.com/s/jv0npmdrutw7t37/cloudy.jpg?dl=0')";
    } else if (weather=="mist") {
        document.body.style.backgroundImage="url('https://dl.dropboxusercontent.com/s/oo47px7032q7ng1/Mist.jpg?dl=0')";
    } else if (weather.includes("rain")) {
        document.body.style.backgroundImage="url('https://dl.dropboxusercontent.com/s/37ta7plk7frwlw6/rain.jpg?dl=0')";
    } else if (weather=="snow") {
        document.body.style.backgroundImage="url('https://dl.dropboxusercontent.com/s/fmlu3f9ipc13hmc/snow.jpg?dl=0')";
    } else if (weather.includes("thunderstorm")) {
        document.body.style.backgroundImage="url('https://dl.dropboxusercontent.com/s/ejgdpvjsr3mbeok/thunderstorm.jpg?dl=0')";
    }
}

function render(w,cel) {
    var currentLoc = w.name;
    var currentCountry = w.sys.country;
    var currentWeather = w.weather[0].description;
    var currentTemp = displayTemp(w.main.temp,cel);
    var icon = "http://openweathermap.org/img/w/"+w.weather[0].icon+".png";

    $('#location').html(currentLoc+","+currentCountry);
    $('#temp').html(currentTemp);
    $('#weatherDescription').html(currentWeather);

    $('#weatherDescription').append('<img id="icon" src="'+icon+'"/>');
    setBackground(currentWeather);
}

$(function() {
    var loc;
    //gets current location
    $.getJSON("http://ipinfo.io", function(response) {
        loc = response.loc.split(",");
        //console.log(loc);

        // makes call to open weather
        $.getJSON("http://api.openweathermap.org/data/2.5/weather?units=imperial&lat="+loc[0]+"&lon="+loc[1]+"&APPID="+API_KEY, function(apiW){
            //w = apiW;
            //calls data pulled
            render(apiW,cel);

            $('#toggle').click(function() {
                cel = !cel;
                render(apiW,cel);
            })
        })
    })
});