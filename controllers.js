// CONTROLLERS
weatherApp.controller('homeController', ['$scope', '$location', 'cityService', function ($scope, $location, cityService) {
    $scope.city = cityService.city;
    $scope.$watch('city', function () {
        cityService.city = $scope.city;
    });

    $scope.submit = function() {
        $location.path('/forecast')
    }
}]);

weatherApp.controller('forecastController', ['$scope', 'cityService', '$resource', '$routeParams', function ($scope, cityService, $resource, $routeParams) {
    $scope.city = cityService.city || '';
    $scope.days = $routeParams.days || '2';

    // http://api.openweathermap.org/data/2.5/forecast?q=London,uk&APPID=15efb2fb717febc51663415f77131342&cnt=2
    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast?APPID=15efb2fb717febc51663415f77131342", {
        callback: "JSON_CALLBACK"
    }, {
        get: {
            method: "JSONP"
        }
    });

    $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: $scope.days });

    $scope.temperatureKelvinToCelsius = function(k) {
        return (k-273).toFixed(2);
    }
}]);
