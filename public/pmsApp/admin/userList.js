(function () {
    'use strict';

    angular
        .module('pmsApp')
        .controller('UserList', UserList);

    UserList.$inject = ['user'];

    /* @ngInject */
    function UserList(user) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.users = user.query();

        activate();

        ////////////////

        function activate() {
        }
    }
})();