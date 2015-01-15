(function () {
    'use strict';

    angular
        .module('pmsApp', [
            'ngResource',
            'ngRoute'
        ]);

    angular
        .module('pmsApp')
        .config(function($routeProvider, $locationProvider){
            $locationProvider.html5Mode(true);
            $routeProvider
                .when('/', {templateUrl: '/partials/main', controller: 'mainController'})
        });

    angular
        .module('pmsApp')
        .controller('mainController', function($scope){
            $scope.myVar = "Hello Angular";
        });
})();