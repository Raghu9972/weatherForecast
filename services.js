// SERVICE
weatherApp.service('cityService', function () {
    this.city = "Bangalore, IN";
});

weatherApp.service('weatherService', ['$resource', function ($resource) {
    this.getWeather = function (city, days) {
        // http://api.openweathermap.org/data/2.5/forecast?q=London,uk&APPID=15efb2fb717febc51663415f77131342&cnt=2
        var weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast?APPID=15efb2fb717febc51663415f77131342", {
            callback: "JSON_CALLBACK"
        }, {
            get: {
                method: "JSONP"
            }
        });
        return weatherAPI.get({
            q: city,
            cnt: days
        });
    }
}]);