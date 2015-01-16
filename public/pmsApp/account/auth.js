(function () {
    'use strict';

    angular
        .module('pmsApp')
        .factory('auth', auth);

    auth.$inject = ['$http', '$q', 'identity', 'user'];

    /* @ngInject */
    function auth($http, $q, identity, user) {
        var service = {
            authenticate: auth,
            logout: logout,
            authorizeCurrentUserForRoute: authorizeCurrentUserForRoute
        };

        return service;

        ////////////////

        function auth(username, password) {
            var dfd = $q.defer();
            $http.post('/login', {username:username, password:password})
                .then(function(response){
                    if(response.data.success) {
                        var usr = new user();
                        angular.extend(usr, response.data.user);
                        identity.currentUser = usr;
                        dfd.resolve(true);
                    } else {
                        dfd.resolve(false);
                    }
                });
            return dfd.promise;
        }

        function logout() {
            var dfd = $q.defer();
            $http.post('/logout', {logout: true})
                .then(function() {
                    identity.currentUser = undefined;
                    dfd.resolve(true);
                });
            return dfd.promise;
        }

        function authorizeCurrentUserForRoute(role) {
            if(identity.isAuthorized(role)) {
                return true;
            } else {
                return $q.reject('Not authorized');
            }
        }
    }
})();