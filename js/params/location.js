define([], function() {
    var location,
        coords;

    function findLocation(resolve) {
        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumWait: 10000,     // max wait time for desired accuracy
            maximumAge: 0,          // disable cache
            desiredAccuracy: 1,    // meters
            fallbackToIP: true,     // fallback to IP if Geolocation fails or rejected
            addressLookup: true,    // requires Google API key if true
            timezone: true         // requires Google API key if true
        };

        geolocator.locate(options, function (err, response) {
            if(err) {
                resolve();

                return console.error(err);
            }

            resolve();
            location = response;
            coords = response.coords;
        });
    }

    function configLocator() {
        geolocator.config({
            language: "en",
            google: {
                version: "3",
                key: "AIzaSyBGfkKCztxeIThq8vPk9nRjsuI2jXz-sXk"
            }
        });
    }

    return {
        init: function() {
            return new Promise(function(resolve, reject) {
                configLocator();
                findLocation(resolve);
            });
        },
        coords: function() {
            return coords;
        },
        city: function(line) {
            var answer = location.address.city;

            if(typeof line === 'string') {
                return line.replaceAll('{answer}', answer);
            }

            return answer;
        }
    };
});