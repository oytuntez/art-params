define(['params/location'], function(Location) {
    var coldLimit = 60,
        forecast;

    function getForecast() {
        var coords = Location.coords();
        var url = 'http://api.openweathermap.org/data/2.5/weather?APPID=b4c2681232923bf30248ff32173c3273' +
            '&lat='+coords.latitude+'&lon='+coords.longitude+'' +
            '&units=imperial';

        return new Promise(function(resolve, reject) {
            getJSON(url, function(status, response) {
                forecast = response;
                resolve();
            });
        });
    }

    return {
        init: function() {
            return getForecast();
        },

        isCold: function() {
            return (forecast.main.temp > coldLimit) ? "no" : "yes";
        }
    };
});