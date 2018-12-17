// MODULE definition
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

// ROUTES
weatherApp.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/pages/home.htm',
            controller: 'homeController'
        })

        .when('/forecast', {
            templateUrl: '/pages/forecast.htm',
            controller: 'forecastController'
        })

        .when('/forecast/:days', {
            templateUrl: '/pages/forecast.htm',
            controller: 'forecastController'
        })
});

// SERVICE
weatherApp.service('cityService', function () {
    this.city = "Bangalore, IN";
});

// CONTROLLERS
weatherApp.controller('homeController', ['$scope', 'cityService', function ($scope, cityService) {
    $scope.city = cityService.city;
    $scope.$watch('city', function () {
        cityService.city = $scope.city;
    })
}]);

weatherApp.controller('forecastController', ['$scope', 'cityService', '$resource', '$routeParams', function ($scope, cityService, $resource, $routeParams) {
    $scope.city = cityService.city || '';
    $scope.days = $routeParams.days || 2;

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

    console.log($scope.weatherResult);
}]);

