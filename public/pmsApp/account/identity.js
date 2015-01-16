(function () {
    'use strict';

    angular
        .module('pmsApp')
        .factory('identity', identity);

    identity.$inject = ['$window', 'user'];

    /* @ngInject */
    function identity($window, user) {
        var currentUser;
        if(!!$window.bootstrappedUserObject) {
            currentUser = new user();
            angular.extend(currentUser, $window.bootstrappedUserObject);
        }
        var service = {
            currentUser: currentUser,
            isAuthenticated: isAuthenticated,
            isAuthorized: isAuthorized
        };

        return service;

        ////////////////
        function isAuthenticated() {
            return !!service.currentUser;
        }

        function isAuthorized(role) {
            return !!service.currentUser && service.currentUser.roles.indexOf(role) > -1
        }

    }
})();