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

weatherApp.controller('forecastController', ['$scope', 'cityService', 'weatherService', '$routeParams', function ($scope, cityService, weatherService, $routeParams) {
    $scope.city = cityService.city || '';
    $scope.days = $routeParams.days || '2';

    $scope.weatherResult = weatherService.getWeather($scope.city, $scope.days);

    $scope.temperatureKelvinToCelsius = function(k) {
        return (k-273).toFixed(2);
    }
}]);
