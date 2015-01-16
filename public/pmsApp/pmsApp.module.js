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
            var routeRoleChecks = {
                admin: {
                    auth: function(auth) {
                        return auth.authorizeCurrentUserForRoute('admin');
                    }
                }
            }

            $locationProvider.html5Mode(true);
            $routeProvider
                .when('/', {templateUrl: '/partials/main/main', controller: 'Main', controllerAs: 'vm'})
                .when('/admin/users', {
                    templateUrl: '/partials/admin/user-list',
                    controller: 'UserList',
                    controllerAs: 'vm',
                    resolve: routeRoleChecks.admin
                })
        });

    angular
        .module('pmsApp')
        .run(function($rootScope, $location) {
            $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection){
                if(rejection === 'Not authorized') {
                    $location.path('/');
                }
            })
        });
})();