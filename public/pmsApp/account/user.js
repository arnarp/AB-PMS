(function () {
    'use strict';

    angular
        .module('pmsApp')
        .factory('user', user);

    user.$inject = ['$resource'];

    /* @ngInject */
    function user($resource) {
        var UserResource = $resource('/api/users/:id', {_id: "@id"});
        UserResource.prototype.isAdmin = function() {
            return this.roles && this.roles.indexOf('admin') > -1;
        }
        return UserResource;
    }
})();