define(['params/location', 'vendor/suncalc'], function(Location, Sun) {
    var date = new Date();
    var sunTimes,
        isNight;

    return {
        init: function() {
            return true;
        },

        isNight: function() {
            if(typeof(isNight) === 'string') {
                return isNight;
            }

            var position = Location.coords();
            if(!position) {
                return "";
            }
            sunTimes = Sun.getTimes(new Date(), position.altitude, position.longitude);

            isNight = date > sunTimes.night ? "yes" : "no";

            return isNight;
        }
    };
});