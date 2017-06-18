define([], function() {
    var coords = {};

    function findLocation(resolve) {
        if (!navigator.geolocation){
            coords = false;
            resolve();

            return;
        }

        function success(position) {
            coords = position.coords;

            resolve();
        }

        function error() {
            coords = false;

            resolve();
        }

        navigator.geolocation.getCurrentPosition(success, error);
    }

    return {
        init: function() {
            return new Promise(function(resolve, reject) {
                findLocation(resolve);
            });
        },
        coords: function() {
            return coords;
        }
    };
});