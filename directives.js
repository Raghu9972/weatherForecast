// DIRECTIVE

weatherApp.directive('weatherReportSlot', function() {
    return {
        restrict: 'E',
        templateUrl: 'directives/template.htm',
        replace: true,
        scope: {
            weatherDay: "=",
            temp: '&',
            dateFormat: '@'
        }
    }
});